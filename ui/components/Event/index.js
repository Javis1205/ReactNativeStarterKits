import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,
  Container, Header, Title, Content, Button, Grid, Row, Col,
  Card, CardItem, Text, Thumbnail, Left, Right, Body, 
} from 'native-base'
import { API_BASE } from '~/store/constants/api'
// import * as accountSelectors from '~/store/selectors/account'
import moment from 'moment'
import CacheableImage from '~/ui/components/CacheableImage'
import RegitButton from '~/ui/elements/RegitButton'
import Icon from '~/ui/elements/Icon'
import styles from './styles'


export default class extends Component {

  render() {
    const {feed} = this.props
    const starAvatar = {uri: feed.starAvatar}
    let eventImgContainer = null
    if (typeof feed.eventImg != 'undefined') {
      const eventImg = {uri: feed.eventImg}
      eventImgContainer = <View cardBody>
                            <CacheableImage style={styles.image} source={eventImg} />
                          </View>
    }
  
    return (      
        <View style={styles.container}>
          
          <View bordered style={styles.avatarContainer}>
            <Grid>
              <Col style={{width: 90}}>
                <CacheableImage style={styles.avatar} source={starAvatar} />
              </Col>
              <Col>
                <Row style={{...styles.rowContainer, height: 25}}>
                  <Text
                    onLongPress={this.props.onUserPress}
                    style={styles.starNameText}>{feed.starName}</Text>
                </Row>
                <Row style={styles.rowContainer}>
                  <Text style={styles.detailText}>{'Create an event: ' + feed.eventName}</Text>
                </Row>
                <Row style={styles.rowContainer}>
                  <Col style={{justifyContent: 'center', width: 22}}>
                    <Icon name='calendar' style={styles.icon}/>
                  </Col>
                  <Col style={{justifyContent: 'center'}}>
                    <Text style={styles.detailText}>{feed.time + ' ' + feed.date}</Text>
                  </Col>
                </Row>
                <Row style={styles.rowContainer}>
                  <Col style={{justifyContent: 'center', width: 22}}>
                    <Icon name='room' style={styles.icon}/>
                  </Col>
                  <Col style={{justifyContent: 'center'}}>
                    <Text style={styles.detailText}>{feed.location}</Text>
                  </Col>
                </Row>
                <Row style={styles.rowContainer}>
                  <Col style={{justifyContent: 'center', width: 22}}>
                    <Icon name='favorite-border' style={styles.icon}/>
                  </Col>
                  <Col style={{width: '20%', justifyContent: 'center'}}>
                    <Text style={styles.detailText}>{feed.numberOfLikes}</Text>
                  </Col>
                  <Col style={{justifyContent: 'center', width: 22}}>
                    <Icon name='share' style={styles.icon}/>
                  </Col>
                  <Col style={{justifyContent: 'center'}}>
                    <Text style={styles.detailText}>{feed.numberOfShares}</Text>
                  </Col>
                </Row>
              </Col>
            </Grid>
          </View>
          {eventImgContainer}
       </View>
    )
  }
}