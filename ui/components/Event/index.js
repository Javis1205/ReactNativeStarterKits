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

const Background = ({feed, children}) => {
  if (feed.images && feed.images.length) {
    let imgEventUri = API_BASE + '/i/0x0/' + feed.images[0].image.url
    const eventImg = {uri: imgEventUri}
    return ( 
      <View cardBody>
        <Image
          style={styles.image}
          source={eventImg}>
          {children}
        </Image>
      </View>
    )
  }

  return (
    <View cardBody style={{height: 80, backgroundColor: '#32333C'}}>
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
          <Background feed={feed}>
            <View style={{backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', height: 80, position: 'absolute', bottom: 0}}>
              <View style={{
              padding: 8,
              backgroundColor: 'transparent',
              borderColor: '#ccc',
              justifyContent:'space-between',
              flexDirection: 'row',
              width: '100%',
            }}>
                <View style={{flexDirection: 'column'}}>
                  <View row style={{ justifyContent:'space-between'}}>
                    <Text style={styles.bigText}>{feed.title}</Text>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <View row style={{marginTop: 4,}}>
                      <Icon name='location' style={{marginRight: 4, color: 'white', fontSize: 16}}/>
                      <Text numberOfLines={2} note style={styles.detailText}>{feed.location}</Text>
                    </View>
                    <View row style={{marginTop: 4, marginLeft: 0}}>
                      <Icon name='calendar' style={{marginRight: 4, color: 'white', fontSize: 16}}/>
                      <View style={{flexDirection: 'row'}}>
                        <Text note style={{...styles.timeText}}>{fromTime + ' - ' + toTime}</Text>
                        <Text note style={{...styles.timeText, alignSelf: 'center', marginLeft: 10}}>{date}</Text>
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