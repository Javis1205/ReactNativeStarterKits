/**
 * Created by vjtc0n on 6/8/17.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {findNodeHandle, Image, TouchableOpacity} from 'react-native'
import { View,
  Container, Header, Title, Content, Button, Grid, Row, Col, List, ListItem,
  Card, CardItem, Text, Thumbnail, Left, Right, Body, Spinner
} from 'native-base'
import { API_BASE } from '~/store/constants/api'
import moment from 'moment'
import { BlurView } from 'react-native-blur'
import CacheableImage from '~/ui/components/CacheableImage'
import IconNB from '~/ui/elements/Icon'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import Event from '~/ui/components/Event'
import ProfileHeader from '~/ui/components/ProfileHeader'
import EventHeader from '~/ui/components/EventHeader'

import Preload from '~/ui/containers/Preload'

import { urlEncode } from '~/store/api/common'

import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'
import * as campaignActions from '~/store/actions/campaign'
import * as accountSelectors from '~/store/selectors/account'


@connect(state=>({
  token: authSelectors.getToken(state),
  profile: accountSelectors.getProfile(state)
}), { ...commonActions, ...campaignActions })

export default class UserProfile extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      refreshing: true,
      viewRef: null,
      event: {},
      celebrity: {},
      isOwner: false
    }
  }
  
  componentDidMount() {
    this.componentWillFocus()
  }
  
  componentWillFocus(){
    this.props.getDetailedCampaign(this.props.token, this.props.route.params.id, (error, data) => {
      if (this.props.profile.id == data.celebrity.id) {
        this.setState({
          isOwner: true
        })
      }
      this.setState({
        event: data,
        celebrity: data.celebrity
      }, () => {
        this.setState({
          refreshing: false
        })
      })
    })
  }

  componentWillBlur(){
    this.setState({
      refreshing: true,
      isOwner: false,
      isFollowed: false
    })
  }
  
  onPressBack() {
    this.props.goBack()
  }
  
  onPressEdit() {
    this.props.chooseACampaign(this.state.event)
    this.props.forwardTo('event/update')
  }
  
  _onUserPress(userId) {
    this.props.forwardTo('userProfile', {userId})
  }

  renderContent(){
    if (this.state.refreshing) {
      return (
        <Preload message=""/>
      )
    }


    
    let eventImgContainer = null
    if (this.state.event.images.length != 0) {
      let imgEventUri = API_BASE + '/i/0x0/' + this.state.event.images[0].image.url
      const eventImg = {uri: imgEventUri}
      eventImgContainer = <View cardBody>
        <Image
          resizeMode="center"
          style={styles.image}
          source={eventImg} />
      </View>
    }
    let fromTime = moment(this.state.event.start_time).format("HH:mm")
    let toTime = moment(this.state.event.finish_time).format("HH:mm")
    let date = moment(this.state.event.finish_time).format("DD/MM/YYYY")
    console.log(this.state.celebrity)
    return (
      <Content>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 20}}>
          <TouchableOpacity
            onPress={this._onUserPress.bind(this, this.state.celebrity.id)}
            style={{paddingLeft: 10, flexDirection: 'column', maxWidth: 120}}>
            <Image source={{uri: this.state.celebrity.avatar}} style={styles.avatar} />
            <Text style={styles.celebName}>{this.state.celebrity.full_name}</Text>
          </TouchableOpacity>
          <View style={{borderColor: '#777', paddingBottom: 8, margin: 8}}>
            <Text style={styles.eventText}>{this.state.event.title}</Text>
            <View style={{marginTop: 5}} row>
              <View style={{width: 20, alignItems: 'center'}}>
                <IconNB name='location' style={styles.iconContent}/>
              </View>
              <Text style={styles.detailEventText}>{this.state.event.location}</Text>
            </View>
            <View style={{marginTop: 5}} row>
              <View style={{width: 20, alignItems: 'center'}}>
                <IconNB name='calendar' style={styles.iconContent}/>
              </View>
              <Text style={styles.detailEventText}>{ fromTime + ' - ' + toTime}</Text>
              <Icon name='calendar' style={{...styles.iconContent, marginLeft: 10}}/>
              <Text style={styles.detailEventText}>{date}</Text>
            </View>
          </View>
        </View>
        {eventImgContainer}
        <View style={styles.socialInnerContainer}>
          <Button style={{...styles.socialButton}}>
            <View style={{justifyContent: 'center', width: 30}}>
              <IconNB name='favorite-border' style={styles.icon}/>
            </View>
            <View style={{width: '20%', justifyContent: 'center', overflow: 'visible'}}>
              <Text style={styles.socialText}>2K</Text>
            </View>
          </Button>
          <Button
            onPress={() => console.log("OK")}
            style={{...styles.socialButton, borderRightWidth: 1, borderRightColor: 'black', borderLeftWidth: 1, borderLeftColor: 'black'}}>
            <View style={{justifyContent: 'center', width: 30}}>
              <IconNB name='comment' style={styles.icon}/>
            </View>
            <View style={{width: '20%', justifyContent: 'center', overflow: 'visible'}}>
              <Text style={styles.socialText}>50</Text>
            </View>
          </Button>
          <Button style={styles.socialButton}>
            <View style={{justifyContent: 'center', width: 30}}>
              <IconNB name='share' style={styles.icon}/>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Text style={styles.socialText}>3K</Text>
            </View>
          </Button>
        </View>
      </Content>
    )

  }

  render() {

    let editButton = null
    if (this.state.isOwner) {
      editButton = <Button
                    onPress={this.onPressEdit.bind(this)}
                    transparent>
                    <IconNB style={{fontSize: 18}} name="create" />
                  </Button>
    } else {
      editButton = <View/>
    }
    
    return(
      <Container>
        <Header noShadow style={{borderBottomWidth: 0}}>
          <Left>
            <Button
              onPress={this.onPressBack.bind(this)}
              transparent>
              <IconNB name="keyboard-arrow-left" />
            </Button>
          </Left>
          <Body>
            <Text full style={{color: 'white', alignSelf: 'center'}}>
              Event Detail
            </Text>
          </Body>
          <Left style={{alignItems: 'flex-end'}}>
            {editButton}
          </Left>
        </Header>

        {this.renderContent()}

      </Container>
    )
  }
}