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
import EventHeader from '~/ui/components/EventHeader'

const imgAvatar = "https://static.wonderfulunion.net/groundctrl/clients/taylorswift/media/13/06/large.9y7nxie1qli9.jpg"
const imgCover = "http://images.huffingtonpost.com/2015-07-13-1436808696-2294090-taylorswiftredtouropener650430.jpg"

var data = []
for(let i = 0; i < 5; i++) {
  data.push({
    starName: "Taylor Swift",
    eventName: "Country Super Show",
    time: "19:00 - 22:00",
    date: "22/04/2017",
    location: "LA - USA",
    numberOfLikes: "2K",
    numberOfShares: "3K",
    starAvatar: imgAvatar
  })
}

export default class UserProfile extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      refreshing: false,
      viewRef: null
    }
  }
  
  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }
  
  render() {
    const starAvatar = {uri: imgAvatar}
    const coverImg = {uri: imgCover}
    return(
      <Container>
        <Content>
          <ProfileHeader>
            <EventHeader/>
          </ProfileHeader>
          <View style={{alignItems: 'center'}}>
            <Grid>
              <Row style={styles.rowContainer}>
                <Text style={styles.eventText}>{'Event ' + 'Sing My Song'}</Text>
              </Row>
              <View style={styles.rowContainer}>
                <Icon name='calendar' style={styles.iconContent}/>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.detailEventText}>{'19:00 - 22:00' + ' ' + '22/04/2017'}</Text>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <Icon name='room' style={styles.iconContent}/>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.detailEventText}>{'LA - USA'}</Text>
                </View>
              </View>
              <Row style={styles.rowContainer}>
                <Col style={{justifyContent: 'center', width: 30}}>
                  <Icon name='favorite-border' style={styles.iconContent}/>
                </Col>
                <Col style={{width: '20%', justifyContent: 'center'}}>
                  <Text style={styles.detailEventText}>{'2K'}</Text>
                </Col>
                <Col style={{justifyContent: 'center', width: 30}}>
                  <Icon name='share' style={styles.iconContent}/>
                </Col>
                <Col style={{justifyContent: 'center'}}>
                  <Text style={styles.detailEventText}>{'3K'}</Text>
                </Col>
              </Row>
            </Grid>
          </View>
        </Content>
      </Container>
    )
  }
}