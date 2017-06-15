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

import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'
import * as campaignActions from '~/store/actions/campaign'

@connect(state=>({
  token: authSelectors.getToken(state)
}), {...commonActions, ...campaignActions})

export default class UserProfile extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      refreshing: true,
      viewRef: null,
      isCeleb: true,
      events: []
    }
  }
  
  componentDidMount() {
    this.componentWillFocus()
  }
  
  componentWillFocus(){
    this.setState({
      refreshing: true
    })
    this.props.getUserCampaign(this.props.token, this.props.route.params.userId, 1, 10, (error, data) => {
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
          <Button style={styles.followButton}>
            <Text>Follow</Text>
          </Button>
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
    if (this.state.isCeleb) {
      avatarContainer = this.renderAvatarContainerCeleb()
    } else {
      avatarContainer = this.renderAvatarContainerFan()
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
            <Text full style={{color: 'white', alignSelf: 'center'}}>{this.state.events[0].celebrity.username}</Text>
          </Body>
          <Left/>
        </Header>
        <Content>
          <ProfileHeader user={this.state.events[0].celebrity}>
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