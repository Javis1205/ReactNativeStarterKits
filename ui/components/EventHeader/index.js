/**
 * Created by vjtc0n on 6/9/17.
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
import Icon from '~/ui/elements/Icon'
import styles from './styles'

export default class EventHeader extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      refreshing: false,
      viewRef: null
    }
  }
  
  render() {
    return(
      <Grid>
        <Row style={{justifyContent: 'center', marginBottom: 30}}>
          <Text style={styles.starNameText}>Taylor Swift</Text>
        </Row>
        <Row style={{marginBottom: 10}}>
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
      </Grid>
    )
  }
}