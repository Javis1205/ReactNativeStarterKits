/**
 * Created by vjtc0n on 6/19/17.
 */
import React, { Component } from 'react'
import {
  Button, List, ListItem, Switch, Spinner, CheckBox, Picker, Text,
  Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Dimensions } from 'react-native'
import { Field, FieldArray, reduxForm, formValueSelector} from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import moment from 'moment';
import QRCodeScanner from 'react-native-qrcode-scanner'

import {
  InputField,
  CheckBoxField,
  DateField,
} from '~/ui/elements/Form'
import Icon from '~/ui/elements/Icon'

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
      refreshing: false
    }
  }
  
  onSuccess(response) {
    console.log(response.data)
  }
  
  render() {
    return(
      <View style={styles.container}>
        <QRCodeScanner
          reactivateTimeout={2000}
          bottomContent={null}
          reactivate={true}
          showMarker={true}
          onRead={this.onSuccess.bind(this)}/>
        <Text style={styles.text}>Scan the QR code</Text>
      </View>
    )
  }
}