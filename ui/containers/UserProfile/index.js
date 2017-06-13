/**
 * Created by vjtc0n on 6/8/17.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {findNodeHandle} from 'react-native'
import { View,
  Container, Header, Title, Content, Button, Grid, Row, Col, List, ListItem,
  Card, CardItem, Text, Thumbnail, Left, Right, Body
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

var data = []
for(let i = 0; i < 5; i++) {
  data.push({
    "id": "832e0f0b-67e2-4937-a92d-9c6a4ac6714d",
    "celebrity": {
      "id": "d0c31260-d04d-4ba0-b561-62dbe12e7922",
      "email": "sliver_wolf_94@yahoo.com.vn",
      "username": "PhạmGiaKhánh",
      "avatar": "https://graph.facebook.com/608942672529336/picture?type=large",
      "ins_date": "2017-06-11T10:34:17.000Z",
      "upd_date": "2017-06-12T03:43:47.000Z"
    },
    "code": "mybG7YmQ1o",
    "location": "39.7050736,-105.9115364",
    "title": "Hello World",
    "content": "Hello World",
    "ins_date": "2017-06-12T04:02:20.000Z",
    "upd_date": "2017-06-12T04:02:20.000Z",
    "images": [
      {
        "id": "ec1dd6e4-1ea4-491a-80d4-00320012cab3",
        "sort": 1,
        "image": {
          "id": "4eb6a00f-1611-4ee5-be10-dde29a1405b3",
          "url": "8c32950a-3715-43fe-943f-a14290619ab7.png",
          "title": "Screen Shot 2017-06-08 at 4.01.35 PM.png",
          "description": "Screen Shot 2017-06-08 at 4.01.35 PM.png",
          "ins_date": "2017-06-12T04:01:41.000Z"
        }
      }
    ]
  })
}

@connect(state=>({
  
}), {...commonActions})

export default class UserProfile extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      refreshing: false,
      viewRef: null,
      isCeleb: true
    }
  }
  
  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }
  
  _onUserPress() {
    //this.props.forwardTo('userProfile')
  }
  
  _onCreateEventPress() {
    this.props.forwardTo('event/create')
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
    let avatarContainer = null
    if (this.state.isCeleb) {
      avatarContainer = this.renderAvatarContainerCeleb()
    } else {
      avatarContainer = this.renderAvatarContainerFan()
    }
    
    return(
      <Container>
        <Content>
          <ProfileHeader>
            {avatarContainer}
          </ProfileHeader>
          <List
            renderRow={this.renderRow.bind(this)}
            dataArray={data}/>
        </Content>
      </Container>
    )
  }
}