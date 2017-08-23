import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,
  Container, Header, Title, Content, Button, Grid, Row, Col,
  Card, CardItem, Text, Thumbnail, Left, Right, Body, Spinner
} from 'native-base'
import { TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import Geocoder from 'react-native-geocoder'
import IconAwesome from 'react-native-vector-icons/FontAwesome'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import { API_BASE } from '~/store/constants/api'
import * as accountSelectors from '~/store/selectors/account'
import * as commonActions from '~/store/actions/common'
import * as campaignActions from '~/store/actions/campaign'
import * as authSelectors from '~/store/selectors/auth'
import * as accountActions from '~/store/actions/account'
import * as campaignSelectors from '~/store/selectors/campaign'
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

@connect(state=>({
  profile: accountSelectors.getProfile(state),
  token: authSelectors.getToken(state),
  noData: campaignSelectors.getNoData(state)
}), {...commonActions, ...campaignActions, ...accountActions})
export default class extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      location: '',
      followRefreshing: false
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      like_count: nextProps.feed.like_count,
      is_liked: nextProps.feed.is_liked
    })
  }
  
  componentWillMount() {
    this.setState({
      like_count: this.props.feed.like_count,
      is_liked: this.props.feed.is_liked
    })
  }
  
  onPressEdit(data) {
    this.props.chooseACampaign(data)
    this.props.forwardTo('event/update')
  }
  
  onPressProfile() {
    const {feed, homePage, forwardTo} = this.props
    if (homePage) {
      forwardTo('userProfile',{userId: feed.celebrity.id})
    }
  }
  
  onPressFollow(data) {
    this.setState({
      followRefreshing: true
    })
    this.props.followCeleb(this.props.token, data.celebrity.id, (error, data) => {
      this.setState({
        followRefreshing: false
      }, () => {
        this.props.onPressFollow()
      })
    })
  }
  
  onPressLike(event) {
    this.props.likeCampaign(this.props.token, event.id, (error, data) => {
      console.log(data)
      this.setState({
        like_count: data.like_count,
        is_liked: (data.action == 'liked')
      })
      this.props.onPressLike && this.props.onPressLike(event, data.like_count)
    })
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
    
    let followText = (this.state.followRefreshing) ? <Spinner color={'black'} size="small"/> : <IconAwesome style={{fontSize: 18, color: 'black'}} name="star" />
    
    let editButton = (this.props.profile.id == feed.celebrity.id) ? <Button
                                                                      onPress={this.onPressEdit.bind(this, feed)}
                                                                      transparent>
                                                                      <Icon style={{fontSize: 18, color: 'black'}} name="create" />
                                                                    </Button>
                                                                  : (this.props.noData) ? <Button
                                                                                            onPress={this.onPressFollow.bind(this, feed)}
                                                                                            transparent>
                                                                                            {followText}
                                                                                          </Button> : <View/>
    
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
                <TouchableWithoutFeedback onPress={this.onPressProfile.bind(this)}>
                  <Image style={styles.avatar} source={starAvatar} />
                </TouchableWithoutFeedback>
                <View style={{
                  marginLeft: 8,
                  height: 30,
                  alignSelf: 'center',
                  justifyContent: 'space-around'
                }}>
                  <Text
                    onLongPress={this.props.onUserPress}
                    style={styles.starNameText}>{feed.celebrity.full_name}</Text>
                  <Text note style={{...styles.timeText, color: 'gray'}}>{updateTime + '   ' + updateDate}</Text>
                </View>
              </View>
              {editButton}
            </View>
          </View>
          <Background parent={this} feed={feed}>
            <View style={{backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', height: 75, position: 'absolute', bottom: 0}}>
              <View style={styles.innerBackground}>
                <View style={{flexDirection: 'column'}}>
                  <View row style={{ justifyContent:'space-between'}}>
                    <Text style={styles.bigText}>{feed.title}</Text>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <View row style={{marginTop: 4,}}>
                      <View style={{width: 20, alignItems: 'center'}}>
                        <Icon name='location' style={{color: 'white', fontSize: 16}}/>
                      </View>
                      <Text numberOfLines={2} note style={{...styles.detailText, marginLeft: 5}}>{feed.location}</Text>
                    </View>
                    <View row style={{marginTop: 4, marginLeft: 0}}>
                      <View style={{width: 20, alignItems: 'center'}}>
                        <Icon name='calendar' style={{color: 'white', fontSize: 16}}/>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text note style={{...styles.timeText, marginLeft: 5}}>{fromTime + ' - ' + toTime}</Text>
                        <IconAwesome name='calendar' style={{color: 'white', fontSize: 16, marginLeft: 10}}/>
                        <Text note style={{...styles.timeText, alignSelf: 'center', marginLeft: 5}}>{date}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Background>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%', height: 40}}>
            <Button
              onPress={this.onPressLike.bind(this, feed)}
              style={styles.socialButton}>
              <View style={{justifyContent: 'center', width: 30}}>
                <Icon name={(this.state.is_liked) ? 'favorite' : 'favorite-border'} style={styles.icon}/>
              </View>
              <View style={{width: '20%', justifyContent: 'center', overflow: 'visible'}}>
                <Text style={styles.socialText}>{this.state.like_count}</Text>
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