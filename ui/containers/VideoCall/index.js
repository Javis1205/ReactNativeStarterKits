import React, { Component } from 'react'
import { Platform } from 'react-native'
import {
  AppRegistry,
  StyleSheet,    
  ListView,
} from 'react-native'

import { connect } from 'react-redux'

import {
  Text, View, Input, Button, Container, Header, Left, Right, Body, Title
} from 'native-base'

import io from 'socket.io-client'

import {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStreamTrack,
  getUserMedia,
} from 'react-native-webrtc';

import Content from '~/ui/components/Content'
import Icon from '~/ui/elements/Icon'

import * as accountSelectors from '~/store/selectors/account'
import * as commonActions from '~/store/actions/common'

import styles from './styles'

let socket = null;
let container;
const configuration = {"iceServers": [{
  "url": "stun:stun.l.google.com:19302",
  // 'url': 'stun:global.stun.twilio.com:3478?transport=udp',
}]};

// contain all pc connected to channel, current is 2
const pcPeers = {};
let localStream;

function getLocalStream(isFront, callback) {

  let videoSourceId;

  // on android, you don't have to specify sourceId manually, just use facingMode
  // uncomment it if you want to specify
  if (Platform.OS === 'ios') {
    MediaStreamTrack.getSources(sourceInfos => {
      console.log("sourceInfos: ", sourceInfos);

      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
          videoSourceId = sourceInfo.id;
        }
      }
    });
  }
  getUserMedia({
    // audio: true,
    video: {
      mandatory: {
        minWidth: 640, // Provide your own width, height and frame rate here
        minHeight: 360,
        minFrameRate: 30,
      },
      facingMode: (isFront ? "user" : "environment"),
      optional: (videoSourceId ? [{sourceId: videoSourceId}] : []),
    }
  }, function (stream) {
    // console.log('getUserMedia success', stream);
    callback(stream);
  }, logError);
}

function join(roomID) {
  socket.emit('join', roomID, function(socketIds){
    console.log('join', socketIds);
    for (const i in socketIds) {
      const socketId = socketIds[i];
      createPC(socketId, true);
    }
  });
}

function createPC(socketId, isOffer) {
  const pc = new RTCPeerConnection(configuration);
  pcPeers[socketId] = pc;

  pc.onicecandidate = function (event) {
    console.log('onicecandidate', event.candidate);
    if (event.candidate) {
      socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
    }
  };

  function createOffer() {
    pc.createOffer(function(desc) {
      console.log('createOffer', desc);
      pc.setLocalDescription(desc, function () {
        console.log('setLocalDescription', pc.localDescription);
        socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
      }, logError);
    }, logError);
  }

  pc.onnegotiationneeded = function () {
    console.log('onnegotiationneeded');
    if (isOffer) {
      createOffer();
    }
  }

  pc.oniceconnectionstatechange = function(event) {
    console.log('oniceconnectionstatechange', event.target.iceConnectionState);
    if (event.target.iceConnectionState === 'completed') {
      setTimeout(() => {
        getStats();
      }, 1000);
    }
    if (event.target.iceConnectionState === 'connected') {
      createDataChannel();
    }
  };
  pc.onsignalingstatechange = function(event) {
    console.log('onsignalingstatechange', event.target.signalingState);
  };

  pc.onaddstream = function (event) {
    console.log('onaddstream', event.stream);    
    container.setState({ 
      info: 'Connected to tupt!',
      remoteViewSrc: event.stream.toURL() 
    })
  }

  pc.onremovestream = function (event) {
    console.log('onremovestream', event.stream);
  }

  pc.addStream(localStream);

  function createDataChannel() {
    if (pc.textDataChannel) {
      return;
    }
    const dataChannel = pc.createDataChannel("text");

    dataChannel.onerror = function (error) {
      console.log("dataChannel.onerror", error);
    };

    dataChannel.onmessage = function (event) {
      console.log("dataChannel.onmessage:", event.data);
      // container.receiveTextData({user: socketId, message: event.data});
      // that is tupt :D
      container.receiveTextData({
        user: 'tupt', 
        message: event.data
      });
    };

    dataChannel.onopen = function () {
      console.log('dataChannel.onopen');
      container.setState({textRoomConnected: true});
    };

    dataChannel.onclose = function () {
      console.log("dataChannel.onclose");
    };

    pc.textDataChannel = dataChannel;
  }
  return pc;
}

function exchange(data) {
  const fromId = data.from;
  let pc;
  if (fromId in pcPeers) {
    pc = pcPeers[fromId];
  } else {
    pc = createPC(fromId, false);
  }

  if (data.sdp) {
    console.log('exchange sdp', data);
    pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
      if (pc.remoteDescription.type == "offer")
        pc.createAnswer(function(desc) {
          console.log('createAnswer', desc);
          pc.setLocalDescription(desc, function () {
            console.log('setLocalDescription', pc.localDescription);
            socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
          }, logError);
        }, logError);
    }, logError);
  } else {
    console.log('exchange candidate', data);
    pc.addIceCandidate(new RTCIceCandidate(data.candidate));
  }
}

function leave(socketId) {
  console.log('leave', socketId);
  const pc = pcPeers[socketId];
  if (pc && pc.close) {
    pc.close();
    delete pcPeers[socketId];
  }

  container.setState({ 
    remoteViewSrc: null,
    info: 'Disconnected', 
});  
}

function logError(error) {
  console.log("logError", error);
}

function mapHash(hash, func) {
  const array = [];
  for (const key in hash) {
    const obj = hash[key];
    array.push(func(obj, key));
  }
  return array;
}

function getStats() {
  const pc = pcPeers[Object.keys(pcPeers)[0]];
  if (pc.getRemoteStreams()[0] && pc.getRemoteStreams()[0].getAudioTracks()[0]) {
    const track = pc.getRemoteStreams()[0].getAudioTracks()[0];
    console.log('track', track);
    pc.getStats(track, function(report) {
      console.log('getStats report', report);
    }, logError);
  }
}

@connect(state=>({
  fanProfile: accountSelectors.getFanProfile(state)
}), {...commonActions})

export default class extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
    this.state = {            
        info: 'Initializing',
        status: 'init',
        roomID: 'tupt',
        isFront: true,
        selfViewSrc: null,
        remoteViewSrc: null,
        textRoomConnected: false,
        textRoomData: [],
        textRoomValue: '',      
    }
  }
  
  componentWillFocus() {
    const userId = this.props.route.params.id
    this.setState({
      roomID: userId
    }, () => {
      container = this;
      socket = io.connect('https://react-native-webrtc.herokuapp.com', {transports: ['websocket']});
      socket.on('exchange', (data)=>{
        exchange(data);
      });
      socket.on('leave', (socketId)=>{
        leave(socketId);
      });
  
      socket.on('connect', (data) => {
        console.log('connect');
        getLocalStream(true, (stream) => {
          localStream = stream;
          this.setState({selfViewSrc: stream.toURL()});
          this.setState({status: 'ready', info: 'Connect tupt'}, () => {this._press()});
        });
      });
    })
  }
  
  componentDidMount() {
    this.componentWillFocus()
  }

  _press = (event) =>{    
    if(this.state.status === 'connect'){
      this.setState({status: 'ready', info: 'Connect tupt'});
      for(let socketId in pcPeers){        
        leave(socketId)
        delete pcPeers[socketId];
      }      
    } else {
      this.setState({status: 'connect', info: 'Connecting'});
      join(this.state.roomID);
    }
  }

  _switchVideoType=()=>{
    const isFront = !this.state.isFront;
    this.setState({isFront});
    getLocalStream(isFront, (stream) => {
      if (localStream) {
        for (const id in pcPeers) {
          const pc = pcPeers[id];
          pc && pc.removeStream(localStream);
        }
        localStream.release();
      }
      localStream = stream;
      this.setState({selfViewSrc: stream.toURL()});

      for (const id in pcPeers) {
        const pc = pcPeers[id];
        pc && pc.addStream(localStream);
      }
    });
  }

  receiveTextData(data) {
    const textRoomData = this.state.textRoomData.slice();
    textRoomData.push(data);
    this.setState({textRoomData, textRoomValue: ''});
  }

  _textRoomPress=()=> {
    if (!this.state.textRoomValue) {
      return
    }
    const textRoomData = this.state.textRoomData.slice();
    textRoomData.push({user: 'Me', message: this.state.textRoomValue});
    for (const key in pcPeers) {
      const pc = pcPeers[key];
      pc.textDataChannel.send(this.state.textRoomValue);
    }
    this.setState({textRoomData, textRoomValue: ''});
  }

  _renderTextRoom() {
    return (
      <View style={styles.listViewContainer}>
        <ListView
          style={{flex:2}}
          enableEmptySections={true}
          dataSource={this.ds.cloneWithRows(this.state.textRoomData)}
          renderRow={rowData => <Text>{`${rowData.user}: ${rowData.message}`}</Text>}
          />
        <Input
          style={{flex:1, paddingTop:0,paddingBottom:0, height: 30, borderColor: 'gray', borderWidth: 1}}
          onChangeText={value => this.setState({textRoomValue: value})}
          value={this.state.textRoomValue}
        />
        <Button style={{height:30}}
          onPress={this._textRoomPress}>
          <Text>Send</Text>
        </Button>
      </View>
    );
  }
  
  _leftClick = (e) => {
    const { goBack } = this.props
    this._press()
    goBack()
  }
  
  renderHeaderBack(title) {
    const left = (
      <Button transparent onPress={this._leftClick}>
        <Icon name="keyboard-arrow-left" />
      </Button>
    )
    const center = (
      <Title full>{title}</Title>
    )
    return this.renderHeader(left, center)
  }
  
  renderHeader(left, center, right, props) {
    let rightStyle = null
    if (right) {
      rightStyle = {flex: 0.5}
    } else {
      rightStyle = {}
    }
    
    return (
      <Header noShadow style={styles.container}>
        <Left style={{flex: 0.5}}>{left}</Left>
        <Body style={{flex: 1,}}>{center}</Body>
        <Right style={rightStyle}>{right}</Right>
      </Header>
    )
  }

  render() {
    return (
      <Container>
        {this.renderHeaderBack(this.props.fanProfile.full_name || 'Facetime')}
        {this.state.remoteViewSrc && 
          <RTCView streamURL={this.state.remoteViewSrc} objectFit="cover" style={styles.remoteView}/>
        }

        <View style={styles.content}>      

          <View style={{
            flexDirection: 'row', 
            width: '100%', 
            paddingHorizontal: 20, 
            alignSelf: 'center', 
            alignItems: 'center',
            justifyContent:'space-between'
          }}>                        

            {
              // <Text style={styles.welcome}>
              //   {this.state.info}            
              // </Text>   
            }


            <Button transparent rounded bordered info noPadder style={styles.actionButton}
              onPress={this._switchVideoType}>
              <Icon large name="switch-camera" />
            </Button>

            {this.state.selfViewSrc && 
              <RTCView streamURL={this.state.selfViewSrc} style={styles.selfView}/>
            }

            <Button transparent rounded bordered info noPadder style={styles.actionButton}
              onPress={this._press}>
              <Icon large name={this.state.status === 'ready' ? 'videocam' : 'videocam-off'} />
            </Button>          
                         
          </View>
           
        
          
        
        </View>     
        {   
        // <Content>          
        //   {this.state.textRoomConnected && this._renderTextRoom()} 
        // </Content>
      }

      </Container>
    );
  }
}