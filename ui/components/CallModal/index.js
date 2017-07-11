/**
 * Created by vjtc0n on 7/10/17.
 */
/**
 * Created by vjtc0n on 5/23/17.
 */
import React, { Component } from 'react'
import {
  Linking,
  Platform
} from 'react-native'
import {
  Container, Text, View, Grid, Row, Col, Button
} from 'native-base'
import { connect } from 'react-redux'

import Modal from '~/ui/components/Modal'
import styles from './styles'
import * as commonActions from '~/store/actions/common'
import * as accountSelectors from '~/store/selectors/account'
import * as accountActions from '~/store/actions/account'


@connect(state=>({
  profile: accountSelectors.getProfile(state)
}), {...commonActions, ...accountActions })

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  
  onCallAccepted() {
    const {onCloseClick, notiData} = this.props
    this.props.getUserInfo(this.props.token, notiData.user_id, (error, data) => {
      this.props.saveFanProfileToFaceTime(data)
      this.props.forwardTo(`videoCall/${this.props.profile.id}`)
    })
    onCloseClick()
    this.props.forwardTo(`videoCall/${this.props.profile.id}`)
  }
  
  render() {
    const {open, title, onCloseClick} = this.props
    return(
      <Modal
        onCloseClick={() => {
          onCloseClick()
        }}
        title={title}
        open={open}>
        <View style={styles.container}>
          <Grid>
            <Row style={styles.headerContainer}>
              <Text style={{color: 'white'}}>Thông Báo</Text>
            </Row>
            <Row style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10}}>
              <Text style={{color: 'black'}}>You are receiving a call from Celeb</Text>
            </Row>
            <Row style={{height: '40%'}}>
              <Col style={{justifyContent: 'center'}}>
                <Button
                  onPress={() => {
                    onCloseClick()
                  }}
                  style={{...styles.button, ...styles.leftButton}}>
                  <Text>Cancel</Text>
                </Button>
              </Col>
              <Col style={{justifyContent: 'center', alignItems: 'center'}}>
                <Button
                  onPress={this.onCallAccepted.bind(this)}
                  style={{...styles.button, ...styles.rightButton}}>
                  <Text>Accept</Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        </View>
      </Modal>
    )
  }
}