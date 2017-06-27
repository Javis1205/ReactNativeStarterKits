/**
 * Created by vjtc0n on 6/8/17.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {findNodeHandle} from 'react-native'
import { View,
  Container, Header, Title, Content, Button, Grid, Row, Col, List, ListItem,
  Card, CardItem, Text, Thumbnail, Left, Right, Body, Spinner
} from 'native-base'
import { API_BASE } from '~/store/constants/api'
import moment from 'moment'
import { BlurView } from 'react-native-blur'
import CacheableImage from '~/ui/components/CacheableImage'
import Icon from '~/ui/elements/Icon'
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
        <CacheableImage
          resizeMode="stretch"
          style={styles.image}
          source={eventImg} />
      </View>
    }
    let fromTime = moment(this.state.event.start_time).format("HH:mm")
    let toTime = moment(this.state.event.finish_time).format("HH:mm")
    let date = moment(this.state.event.finish_time).format("DD/MM/YYYY")

    return (
      <Content>

          <ProfileHeader user={this.state.celebrity}>
            <EventHeader user={this.state.celebrity}/>
          </ProfileHeader>
              
              
          <View row style={{            
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#ccc',
            borderColor: '#777',
            borderBottomWidth: 0.5,
            padding: 8,
          }}>
            <View row>
              <Icon name='calendar' style={styles.iconContent}/>              
              <Text style={styles.detailEventText}>{ fromTime + ' - ' + toTime + ' ' + date}</Text>              
            </View>
            
            <View row>
              <View row>
                <Icon name='favorite-border' style={styles.iconContent}/>
                <Text style={styles.detailEventText}>{'2K'}</Text>
              </View>
              <View row style={{
                marginLeft: 8,
              }}>
                <Icon name='share' style={styles.iconContent}/>
                <Text style={styles.detailEventText}>{'3K'}</Text>
              </View>
            </View>
          </View>

          <View style={{
            borderColor: '#777',
            borderBottomWidth: 0.5,
            paddingBottom: 8,
            margin: 8,            
          }}>
            <Text style={styles.eventText}>{'Event ' + this.state.event.title}</Text>
            <View row>
                <Icon name='location' style={styles.iconContent}/>                    
                <Text style={styles.detailEventText}>{this.state.event.location}</Text>                    
            </View>
          </View>

          {eventImgContainer}

      </Content>
    )

  }

  render() {

    let editButton = null
    if (this.state.isOwner) {
      editButton = <Button
                    onPress={this.onPressEdit.bind(this)}
                    transparent>
                    <Icon style={{fontSize: 18}} name="create" />
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
              <Icon name="keyboard-arrow-left" />
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