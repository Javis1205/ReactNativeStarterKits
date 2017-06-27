/**
 * Created by vjtc0n on 6/8/17.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {findNodeHandle, TouchableWithoutFeedback} from 'react-native'
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

import Preload from '~/ui/containers/Preload'

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
      refreshing: false,
      viewRef: null,
      isCeleb: true,
      events: [
        {
          celebrity: {}
        }
      ],
      isOwner: false,
      isFollowed: false,
      celebrity: {},
      followLoading: false,
      loadingMore: false,      
    }

    this.page = 1
    this.hasMore = true
  }
  
  componentDidMount() {
    this.componentWillFocus()
  }

  componentWillBlur(){
    this.setState({
      refreshing: true,
      isOwner: false,
      isFollowed: false
    })
  }
  
  componentWillFocus(){    
    this.props.getUserCampaign(this.props.token, this.props.route.params.userId, 1, 10, (error, data) => {
      if (this.props.profile.id == this.props.route.params.userId) {
        this.setState({
          isOwner: true
        })
      } else {
        // Should be Fixed soon
        let isFollowed = data.celebrity.is_followed
        if (isFollowed) {
          this.setState({
            isFollowed: true
          })
        }
      }
      this.setState({
        events: data.results,
        celebrity: data.celebrity,
      }, () => {
        console.log("refreshing")
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
    this.setState({
      followLoading: true
    })
    this.props.followCeleb(this.props.token, this.props.route.params.userId, () => {
      this.setState({
        followLoading: false
      }, () => {
        this.setState({
          isFollowed: true
        })
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
  
  onPressTopFan() {
    this.props.forwardTo('listTopFan/' + this.props.route.params.userId)
  }
  
  onPressEvent() {
    this.componentWillFocus()
  }
  
  _onEndReached() {
    if (!this.hasMore || this.state.loadingMore) {
      return;
    }
    
    this.setState({
      loadingMore: true      
    })

      
    this.props.getUserCampaign(this.props.token, this.props.route.params.userId, this.page, 10, (error, data) => {
      this.setState({
        events: this.state.events.concat(data.results),
        celebrity: data.celebrity,        
        loadingMore: false,        
      })
      if(!data.results || data.results.length === 0){
        this.hasMore = false
      }
      this.page++
    })
    
  }
  
  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <View style={{marginBottom:8}}>
        <Event feed={rowData} onUserPress={this._onUserPress.bind(this)}/>
      </View>
    )
  }
  
  renderAvatarContainerFan() {
    let followButton = null
    let iconFollow = (this.state.followLoading) ? <Spinner size="small" color={"white"}/> : <Text small style={styles.followTextButton}>Follow</Text>
    if (this.state.isFollowed) {
      followButton = <Button
                      small transparent light rounded bordered
                      onPress={this.onPressUnFollow.bind(this)}
                      style={styles.unfollowButton}>
                      <Text small>Following</Text>
                    </Button>
    } else {
      followButton = <Button
                      small transparent light rounded bordered
                      onPress={this.onPressFollow.bind(this)}
                      style={styles.followButton}>
                    {iconFollow}
                    </Button>
    }

    return (
      <View style={{
        marginTop: -170,
      }}>
        <View row style={{justifyContent: 'space-between'}}>
            <Button transparent style={{
              flexDirection: 'row', 
              justifyContent: 'center'
            }}>
              <Icon name='heart' style={styles.icon}/>
              <View style={styles.textContainer}>
                <Text style={styles.detailText}>8888 LP</Text>
              </View>
            </Button>

            <Button
              transparent
              onPress={this.onPressTopFan.bind(this)}
              style={{
                flexDirection: 'row', 
                justifyContent: 'center'
              }}>
              <Icon name='fan' style={styles.icon}/>
              <View style={styles.textContainer}>
                <Text style={styles.detailText}>{this.state.celebrity.fan_count}</Text>
              </View>
            </Button>
        </View>
        <View row style={{justifyContent: 'center', marginTop: 20}}>
          {followButton}
        </View>
      </View>
    )
  }
  
  renderAvatarContainerCeleb() {
    return (
      <Grid>
        <Row>
          <Col>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={styles.textContainer}>
                <Text style={styles.detailText}>8888</Text>
                <Text style={styles.detailText}>LP</Text>
              </View>
            </View>
          </Col>
          <Col>
            <TouchableWithoutFeedback
              onPress={this.onPressTopFan.bind(this)}
              style={{flexDirection: 'row', justifyContent: 'center', ...styles.fanButton}}>
              <View style={styles.textContainer}>
                <Text style={styles.detailText}>{this.state.celebrity.fan_count}</Text>
                <Text style={styles.detailText}>Fans</Text>
              </View>
            </TouchableWithoutFeedback>
          </Col>
          <Col>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={styles.textContainer}>
                <Text style={styles.detailText}>8888</Text>
                <Text style={styles.detailText}>Followings</Text>
              </View>
            </View>
          </Col>
        </Row>
        <Row style={{paddingBottom: 10}}>
          <Col>
            <Button
              onPress={this.onPressEvent.bind(this)}
              style={styles.eventButton}>
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

  renderContent(){
    if (this.state.refreshing) {
      return (
        <Preload message=""/>
      )
    }

    let avatarContainer = null
    if (this.state.isOwner) {
      avatarContainer = this.renderAvatarContainerCeleb()
    } else {
      avatarContainer = this.renderAvatarContainerFan()
    }
    // let username = null
    let avatar = null
    if (this.state.events[0]) {
      // username = this.state.celebrity.username
      avatar = this.state.celebrity
    } else {
      // username = this.state.celebrity.username || ''
      avatar = {
        avatar: this.state.celebrity.avatar || '',
        cover: this.state.celebrity.cover_picture || COVER_IMAGE
      }
    }

    return (
      <View style={{flex: 1, backgroundColor: '#ccc'}} padder>
        <List
          renderHeader={() => {
              return(
                <View style={{marginBottom: 10}}>
                  <ProfileHeader user={avatar}>
                    {avatarContainer}
                  </ProfileHeader>
                </View>
              )
            }
          }
          renderFooter={() => {
              return(
                <View>
                  {this.state.loadingMore && <Spinner color='#fff' />}
                </View>
              )
            }
          }
          style={{flex: 1}}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={80}
          removeClippedSubviews={false}
          renderRow={this.renderRow.bind(this)}
          dataArray={this.state.events}/>
      </View>
    )
  }
  
  render() {
    
    const username = this.state.refreshing ? 'Loading...' : this.state.celebrity.username
    
    return(
      <Container style={{
        backgroundColor: '#ccc',
        borderColor: '#555',
        borderTopWidth: 0.5,
      }}>
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

        {this.renderContent()}
      </Container>
    )
  }
}