import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,
  Container, Header, Title, Content, Button, Grid, Row, Col,
  Card, CardItem, Text, Thumbnail, Left, Right, Body
} from 'native-base'
import { Image } from 'react-native'
import Geocoder from 'react-native-geocoder'
import { API_BASE } from '~/store/constants/api'
// import * as accountSelectors from '~/store/selectors/account'
import moment from 'moment'
import CacheableImage from '~/ui/components/CacheableImage'
import RegitButton from '~/ui/elements/RegitButton'
import Icon from '~/ui/elements/Icon'
import styles from './styles'


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
    let eventImgContainer = null
    if (feed.images.length != 0) {
      let imgEventUri = API_BASE + '/i/0x0/' + feed.images[0].image.url
      const eventImg = {uri: imgEventUri}
      eventImgContainer = <View cardBody>
                            <CacheableImage
                              resizeMode="stretch"
                              style={styles.image}
                              source={eventImg} />
                          </View>
    }
    
    let fromTime = moment(feed.start_time).format("HH:mm")
    let toTime = moment(feed.finish_time).format("HH:mm")
    let date = moment(feed.finish_time).format("DD/MM/YY")
    
    return (
        <View style={styles.container}>

        
          
          <View bordered style={styles.avatarContainer}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 90}}>
                <Image style={styles.avatar} source={starAvatar} />
              </View>
              <View>
                <View style={{...styles.rowContainer, height: 25}}>
                  <Text
                    onLongPress={this.props.onUserPress}
                    style={styles.starNameText}>{feed.celebrity.username}</Text>
                </View>
                <View style={{...styles.rowContainer, height: 20}}>
                  <Text style={styles.detailText}>{'Created an event: ' + feed.title}</Text>
                </View>
                <View style={styles.rowContainer}>
                  <View style={{justifyContent: 'center', width: 22}}>
                    <Icon name='calendar' style={styles.icon}/>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.detailText}>{fromTime + ' - ' + toTime + '   ' + date}</Text>
                  </View>
                </View>
                <View style={styles.rowContainer}>
                  <View style={{justifyContent: 'center', width: 22}}>
                    <Icon name='room' style={styles.icon}/>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.detailText}>{feed.location}</Text>
                  </View>
                </View>
                <View style={styles.rowContainer}>
                  <View style={{justifyContent: 'center', width: 22}}>
                    <Icon name='favorite-border' style={styles.icon}/>
                  </View>
                  <View style={{width: '20%', justifyContent: 'center'}}>
                    <Text style={styles.detailText}>2K</Text>
                  </View>
                  <View style={{justifyContent: 'center', width: 22}}>
                    <Icon name='share' style={styles.icon}/>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.detailText}>3K</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {eventImgContainer}
       </View>
    )
  }
}