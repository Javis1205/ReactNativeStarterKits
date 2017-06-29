/**
 * Created by vjtc0n on 6/19/17.
 */
import React, { Component } from 'react'
import {
  Button, List, ListItem, Switch, Spinner, CheckBox, Picker, Text,
  Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Dimensions, TouchableWithoutFeedback, Image } from 'react-native'
import { Field, FieldArray, reduxForm, formValueSelector} from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import moment from 'moment';
import QRCodeScanner from 'react-native-qrcode-scanner'
import Modal from 'react-native-modal'

import {
  InputField,
  CheckBoxField,
  DateField,
} from '~/ui/elements/Form'
import Icon from '~/ui/elements/Icon'
import CacheableImage from '~/ui/components/CacheableImage'
import { congratulations, heartBroken } from '~/assets'


import {
  API_BASE,
  COVER_IMAGE
} from '~/store/constants/api'


import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'
import * as accountActions from '~/store/actions/account'
import * as accountSelectors from '~/store/selectors/account'

import styles from './styles'


@connect(state=>({
  token: authSelectors.getToken(state),
  profile: accountSelectors.getProfile(state),
}), {...accountActions, ...commonActions})

export default class QRScan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      isSuccessModalVisible: false,
      isErrorModalVisible: false
    }
  }
  
  onSuccess(response) {
    console.log(response.data)
    this.props.postQRCode(this.props.token, response.data, (error, data) => {
      console.log(data)
      this.setState({
        isErrorModalVisible: true
      })
    })
  }
  
  onSuccessButtonPress() {
    this.setState({
      isSuccessModalVisible: !this.state.isSuccessModalVisible,
      isErrorModalVisible: false
    })
  }
  
  onErrorButtonPress() {
    this.setState({
      isErrorModalVisible: !this.state.isErrorModalVisible,
      isSuccessModalVisible: false
    })
  }
  
  render() {
    return(
      <View style={styles.container}>
        <QRCodeScanner
          cameraStyle={{height: '100%'}}
          reactivateTimeout={2000}
          bottomContent={null}
          reactivate={true}
          showMarker={true}
          onRead={this.onSuccess.bind(this)}/>
        <Text style={styles.text}>Scan the QR code</Text>
        <TouchableWithoutFeedback onPress={() => this.onSuccessButtonPress()}>
          <Modal
            backdropColor="#D2FAFB"
            backdropOpacity={0.2}
            animationOut={'fadeOut'}
            animationIn={'fadeIn'}
            hideOnBack={true}
            isVisible={this.state.isSuccessModalVisible}
            style={{}}>
            <View style={styles.modalContainer}>
              <Image
                resizeMode="cover"
                style={styles.modalImage}
                source={congratulations}/>
              <Text style={styles.modalSuccessText}>You have 4000LP!</Text>
            </View>
          </Modal>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => this.onErrorButtonPress()}>
          <Modal
            backdropColor="#D2FAFB"
            backdropOpacity={0.5}
            animationOut={'fadeOut'}
            animationIn={'fadeIn'}
            hideOnBack={true}
            isVisible={this.state.isErrorModalVisible}
            style={{}}>
            <View style={styles.modalContainer}>
              <Image
                resizeMode="contain"
                style={styles.modalImage}
                source={heartBroken}/>
              <Text style={styles.modalErrorText}>Sorry! Wrong QR code</Text>
            </View>
          </Modal>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}