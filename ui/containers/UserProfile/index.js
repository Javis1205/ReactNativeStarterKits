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
import { API_BASE, COVER_IMAGE } from '~/store/constants/api'
import moment from 'moment'
import { BlurView } from 'react-native-blur'
import CacheableImage from '~/ui/components/CacheableImage'
import Icon from '~/ui/elements/Icon'
import styles from './styles'
import Event from '~/ui/components/Event'
import ProfileHeader from '~/ui/components/ProfileHeader'

import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'
import * as campaignActions from '~/store/actions/campaign'
import * as accountSelectors from '~/store/selectors/account'
import * as accountActions from '~/store/actions/account'

@connect(state=>({
  token: authSelectors.getToken(state),
  profile: accountSelectors.getProfile(state)
}), {...commonActions, ...campaignActions, ...accountActions})

export default class UserProfile extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      refreshing: true,
      viewRef: null,
      isCeleb: true,
      events: [
        {
          celebrity: {}
        }
      ],
      isOwner: false,
      isFollowed: false
    }
  }
  
  componentDidMount() {
    this.componentWillFocus()
  }
  
  componentWillFocus(){
    this.setState({
      refreshing: true,
      isOwner: false,
      isFollowed: false
    })
    this.props.getUserCampaign(this.props.token, this.props.route.params.userId, 1, 10, (error, data) => {
      if (this.props.profile.id == this.props.route.params.userId) {
        this.setState({
          isOwner: true
        })
      } else {
        // Should be Fixed soon
        let isFollowed = false
        if (isFollowed) {
          this.setState({
            isFollowed: true
          })
        }
      }
      this.setState({
        events: data.results
      }, () => {
        this.setState({
          refreshing: false
        })
      })
    })
  }
  
  _onUserPress() {
    //this.props.forwardTo('userProfile')
  }
  
  _onCreateEventPress() {
    this.props.forwardTo('event/create')
  }
  
  onPressBack() {
    this.props.goBack()
  }
  
  onPressFollow() {
    this.props.followCeleb(this.props.token, this.props.route.params.userId, () => {
      this.setState({
        isFollowed: true
      })
    })
  }
  
  onPressUnFollow() {
    this.props.unfollowCeleb(this.props.token, this.props.route.params.userId, () => {
      this.setState({
        isFollowed: false
      })
    })
  }
  
  renderRow(rowData, sectionID, rowID, highlightRow) {
    return(
      <ListItem style={styles.listItemContainer}>
        <Grid>
          <Col style={styles.dateContainer}>
            <Text style={styles.dateText}>22</Text>
            <Text style={styles.dateText}>Apr</Text>
          </Col>
          <Col>
            <Event feed={rowData} onUserPress={this._onUserPress.bind(this)}/>
          </Col>
        </Grid>
      </ListItem>
    )
  }
  
  renderAvatarContainerFan() {
    let followButton = null
    if (this.state.isFollowed) {
      followButton = <Button
                      onPress={this.onPressUnFollow.bind(this)}
                      style={styles.unfollowButton}>
                      <Text>Following</Text>
                    </Button>
    } else {
      followButton = <Button
                      onPress={this.onPressFollow.bind(this)}
                      style={styles.followButton}>
                      <Text style={styles.followTextButton}>Follow</Text>
                    </Button>
    }
    return (
      <Grid>
        <Row>
          <Col>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Icon name='favorite-border' style={styles.icon}/>
              <View style={styles.textContainer}>
                <Text style={styles.detailText}>8888 LP</Text>
              </View>
            </View>
          </Col>
          <Col>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Icon name='account-circle' style={styles.icon}/>
              <View style={styles.textContainer}>
                <Text style={styles.detailText}>8888 Fans</Text>
              </View>
            </View>
          </Col>
        </Row>
        <Row style={{justifyContent: 'center'}}>
          {followButton}
        </Row>
      </Grid>
    )
  }
  
  renderAvatarContainerCeleb() {
    return (
      <Grid>
        <Row>
          <Col>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Icon name='favorite-border' style={styles.icon}/>
              <View style={styles.textContainer}>
                <Text style={styles.detailText}>8888 LP</Text>
              </View>
            </View>
          </Col>
          <Col>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Icon name='account-circle' style={styles.icon}/>
              <View style={styles.textContainer}>
                <Text style={styles.detailText}>8888 Fans</Text>
              </View>
            </View>
          </Col>
          <Col style={{width: '45%'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Icon name='star' style={styles.icon}/>
              <View style={styles.textContainer}>
                <Text style={styles.detailText}>8888 Followings</Text>
              </View>
            </View>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button style={styles.eventButton}>
              <Icon name="calendar"/>
              <Text>Event</Text>
            </Button>
          </Col>
          <Col style={{width: 10}}/>
          <Col>
            <Button
              onPress={this._onCreateEventPress.bind(this)}
              style={styles.postButton}>
              <Text>Post</Text>
              <Icon name="create"/>
            </Button>
          </Col>
        </Row>
      </Grid>
    )
  }
  
  render() {
    if (this.state.refreshing) {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner color={"black"}/>
        </View>
      )
    }
    let avatarContainer = null
    if (this.state.isOwner) {
      avatarContainer = this.renderAvatarContainerCeleb()
    } else {
      avatarContainer = this.renderAvatarContainerFan()
    }
    
    let username = null
    let avatar = null
    let cover = null
    if (this.state.events[0]) {
      username = this.state.events[0].celebrity.username
      avatar = this.state.events[0].celebrity
    } else {
      username = 'User'
      avatar = {
        avatar: 'http://images.huffingtonpost.com/2015-07-13-1436808696-2294090-taylorswiftredtouropener650430.jpg',
        cover: COVER_IMAGE
      }
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
            <Text full style={{color: 'white', alignSelf: 'center'}}>{username}</Text>
          </Body>
          <Left/>
        </Header>
        <Content>
          <ProfileHeader user={avatar}>
            {avatarContainer}
          </ProfileHeader>
          <List
            renderRow={this.renderRow.bind(this)}
            dataArray={this.state.events}/>
        </Content>
      </Container>
    )
  }
}