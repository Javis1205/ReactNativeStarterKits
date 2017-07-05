import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,
  Container, Header, Title, Content, Button, Grid, Row, Col,
  Card, CardItem, Text, Thumbnail, Left, Right, Body
} from 'native-base'
import { TouchableOpacity, Image } from 'react-native'
import Geocoder from 'react-native-geocoder'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import { API_BASE } from '~/store/constants/api'
// import * as accountSelectors from '~/store/selectors/account'
import moment from 'moment'
import CacheableImage from '~/ui/components/CacheableImage'
import RegitButton from '~/ui/elements/RegitButton'
import Icon from '~/ui/elements/Icon'
import PopupPhotoView from '~/ui/components/PopupPhotoView'
import styles from './styles'

const Background = ({feed, children, parent}) => {
  if (feed.images && feed.images.length) {
    let imgEventUri = API_BASE + '/i/0x0/' + feed.images[0].image.url
    const eventImg = {uri: imgEventUri}
    return ( 
      <TouchableOpacity cardBody onPress={() => parent.refs.popupPhotoView.setImage(imgEventUri)}>
        <ImageP
          resizeMode="cover"
          indicator={Progress.Circle}
          indicatorProps={{
            size: 30,
            borderWidth: 0,
            color: 'black',
            unfilledColor: '#ccc',
            indeterminate: false
          }}
          style={styles.image}
          source={eventImg}>
          {children}
        </ImageP>
      </TouchableOpacity>
    )
  }

  return (
    <View cardBody style={{height: 75, backgroundColor: '#32333C'}}>
      {children}
    </View>
  )
}


export default class extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      location: ''
    }
  }

  render() {
    const {feed} = this.props
    let starAvatar = null
    fbAvatar = feed.celebrity.avatar
    starAvatar = {uri: fbAvatar}    
    
    let updateTime = moment(feed.upd_date).format("HH:mm")
    let updateDate = moment(feed.upd_date).format("DD/MM/YY")
    let fromTime = moment(feed.start_time).format("HH:mm")
    let toTime = moment(feed.finish_time).format("HH:mm")
    let date = moment(feed.finish_time).format("DD/MM/YY")
    return (
        <View style={styles.container}>
          <PopupPhotoView ref='popupPhotoView' />
          <View style={styles.avatarContainer}>
            <View style={{
              flexDirection: 'row',
              justifyContent:'space-between',
              padding: 8,
              width: '100%',
            }}>
              <View style={{flexDirection: 'row'}}>
                <Image style={styles.avatar} source={starAvatar} />
                <View style={{
                  marginLeft: 8,
                  height: 30,
                  alignSelf: 'center',
                  justifyContent: 'space-around'
                }}>
                  <Text
                    onLongPress={this.props.onUserPress}
                    style={styles.starNameText}>{feed.celebrity.username}</Text>
                  <Text note style={{...styles.timeText, color: 'gray'}}>{updateTime + '   ' + updateDate}</Text>
                </View>
              </View>
            </View>
          </View>
          <Background parent={this} feed={feed}>
            <View style={{backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', height: 75, position: 'absolute', bottom: 0}}>
              <View style={{
              backgroundColor: 'transparent',
              borderColor: '#ccc',
              justifyContent:'flex-start',
              flexDirection: 'row',
              width: '100%',
              alignItems: 'flex-start',
              height: '100%',
              marginLeft: 5
            }}>
                <View style={{flexDirection: 'column'}}>
                  <View row style={{ justifyContent:'space-between'}}>
                    <Text style={styles.bigText}>{feed.title}</Text>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <View row style={{marginTop: 4,}}>
                      <View style={{width: 20, alignItems: 'center'}}>
                        <Icon name='location' style={{color: 'white', fontSize: 16}}/>
                      </View>
                      <Text numberOfLines={2} note style={styles.detailText}>{feed.location}</Text>
                    </View>
                    <View row style={{marginTop: 4, marginLeft: 0}}>
                      <View style={{width: 20, alignItems: 'center'}}>
                        <Icon name='calendar' style={{color: 'white', fontSize: 16}}/>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text note style={{...styles.timeText}}>{fromTime + ' - ' + toTime}</Text>
                        <IconAwesome name='calendar' style={{color: 'white', fontSize: 16, marginLeft: 10}}/>
                        <Text note style={{...styles.timeText, alignSelf: 'center', marginLeft: 2}}>{date}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Background>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: 40}}>
            <Button style={styles.socialButton}>
              <View style={{justifyContent: 'center', width: 30}}>
                <Icon name='favorite-border' style={styles.icon}/>
              </View>
              <View style={{width: '20%', justifyContent: 'center', overflow: 'visible'}}>
                <Text style={styles.socialText}>2K</Text>
              </View>
            </Button>
            <Button
              onPress={() => console.log("OK")}
              style={styles.socialButton}>
              <View style={{justifyContent: 'center', width: 30}}>
                <Icon name='comment' style={styles.icon}/>
              </View>
              <View style={{width: '20%', justifyContent: 'center', overflow: 'visible'}}>
                <Text style={styles.socialText}>50</Text>
              </View>
            </Button>
            <Button style={styles.socialButton}>
              <View style={{justifyContent: 'center', width: 30}}>
                <Icon name='share' style={styles.icon}/>
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.socialText}>3K</Text>
              </View>
            </Button>
          </View>
       </View>
    )
  }
}