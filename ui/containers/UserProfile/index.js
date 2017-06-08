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
  
  _onUserPress() {
    //this.props.forwardTo('userProfile')
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
  
  render() {
    const starAvatar = {uri: imgAvatar}
    const coverImg = {uri: imgCover}
    return(
      <Container>
        <Content>
          <View style={styles.headerContainer}>
            <CacheableImage
              onLoadEnd={this.imageLoaded.bind(this)}
              ref={(img) => { this.backgroundImage = img; }}
              style={styles.coverImg} source={coverImg}/>
            <BlurView
              blurRadius={10}
              blurAmount={0}
              viewRef={this.state.viewRef}
              blurType="dark"
              style={styles.avatarContainer}/>
            <View style={styles.avatarContainer}>
              <CacheableImage style={styles.avatarImg} source={starAvatar} />
              <View style={styles.socialContainer}>
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
              </View>
            </View>
          </View>
          <List
            renderRow={this.renderRow.bind(this)}
            dataArray={data}/>
        </Content>
      </Container>
    )
  }
}