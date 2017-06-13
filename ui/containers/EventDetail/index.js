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

import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'
import * as campaignActions from '~/store/actions/campaign'

const imgAvatar = "https://static.wonderfulunion.net/groundctrl/clients/taylorswift/media/13/06/large.9y7nxie1qli9.jpg"
const imgCover = "http://images.huffingtonpost.com/2015-07-13-1436808696-2294090-taylorswiftredtouropener650430.jpg"

@connect(state=>({
  token: authSelectors.getToken(state),
}), { ...commonActions, ...campaignActions })

export default class UserProfile extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      refreshing: false,
      viewRef: null
    }
  }
  
  componentDidMount() {
    this.componentWillFocus()
  }
  
  componentWillFocus(){
    console.log(this.props.route.params.id)
    this.props.getDetailedCampaign(this.props.token, this.props.route.params.id, (error, data) => {
      console.log(data)
    })
  }
  
  onPressBack() {
    this.props.goBack()
  }
  
  onPressEdit() {
    this.props.forwardTo('event/update/' + this.props.route.params.id)
  }

  render() {
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
            <Text full style={{color: 'white', alignSelf: 'center'}}>Body</Text>
          </Body>
          <Left style={{alignItems: 'flex-end'}}>
            <Button
              onPress={this.onPressEdit.bind(this)}
              transparent>
              <Icon style={{fontSize: 18}} name="create" />
            </Button>
          </Left>
        </Header>

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