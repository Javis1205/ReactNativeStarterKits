/**
 * Created by vjtc0n on 6/9/17.
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
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import RNFetchBlob from 'react-native-fetch-blob'

import {
  InputField,
  CheckBoxField,
  DateField,
} from '~/ui/elements/Form'
import Icon from '~/ui/elements/Icon'

import {
  API_BASE
} from '~/store/constants/api'

import * as commonActions from '~/store/actions/common'
import * as campaignActions from '~/store/actions/campaign'
import * as authSelectors from '~/store/selectors/auth'
import * as accountSelectors from '~/store/selectors/account'
import * as imageActions from '~/store/actions/image'

import styles from './styles'
import EventForm from '../../components/EventForm'

const img = 'http://images.huffingtonpost.com/2015-07-13-1436808696-2294090-taylorswiftredtouropener650430.jpg'

const formSelector = formValueSelector('CreateEventForm')
@connect(state=>({
  formValues: formSelector(state, 'name', 'address'),
  formState: state.form,
  token: authSelectors.getToken(state),
  celebrity_id: accountSelectors.getCelebrityId(state),
}), dispatch => ({
  actions: bindActionCreators({ ...commonActions, ...campaignActions, ...imageActions}, dispatch)
}), (stateProps, dispatchProps, ownProps)=>{
  return ({
    enableReinitialize: true,
    initialValues: {
      name: '',
      address: ''
    },
    ...ownProps, ...stateProps, ...dispatchProps,
  })
  
})
@reduxForm({ form: 'CreateEventForm', fields: ['name', 'address'], validate: null})

export default class EventCreation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fromTime: moment(new Date()).format("HH:mm"),
      toTime: moment(new Date()).format("HH:mm"),
      date: moment(new Date()).format("DD/MM/YYYY"),
      imgUri: '',
      imgId: ''
    }
    
  }
  
  componentWillFocus(){
    this.setState({
      imgUri: '',
      imgId: ''
    })
    this.props.change('name', '')
    this.props.change('address', '')
  }
  
  getFromTime(fromTime) {
    this.setState({
      fromTime: fromTime
    })
  }
  
  getToTime(toTime) {
    this.setState({
      toTime: toTime
    })
  }
  
  getDate(date) {
    this.setState({
      date: date
    })
  }
  
  getImgUri(uri, data) {
    let newDate = new Date()
    this.props.actions.uploadImage(this.props.token, [
      { name: 'images', filename: (this.props.token + newDate.toString() + '.jpg'), type:'image/jpeg', data: data }
    ], (error, data) => {
      this.setState({
        imgId: data.images[0].id,
        imgUri: uri
      })
    })
  }
  
  submitEvent() {
    console.log(this.state)
    let fromTime = moment(this.state.date + ' ' + this.state.fromTime, 'DD/MM/YYYY HH:mm').toISOString()
    let toTime = moment(this.state.date + ' ' + this.state.toTime, 'DD/MM/YYYY HH:mm').toISOString()
    let event = {
      celebrity_id: this.props.celebrity_id,
      status_id: 2,
      news_type_id: 1,
      location: this.props.formValues.address,
      title: this.props.formValues.name,
      content: "Hello World",
      start_time: fromTime,
      finish_time: toTime
    }
    if (this.state.imgId != '') {
      event.image_ids = [this.state.imgId]
    }
    this.props.actions.createCampaign(this.props.token, event)
  }
  
  render() {
    return(
      <Container>
        <Content>
          <EventForm
            imgUri={this.state.imgUri}
            getFromTime={this.getFromTime.bind(this)}
            getDate={this.getDate.bind(this)}
            getImgUri={this.getImgUri.bind(this)}
            getToTime={this.getToTime.bind(this)}/>
        </Content>
        <Button
          style={styles.submitButton}
          onPress={this.submitEvent.bind(this)}>
          <Text>Create</Text>
        </Button>
      </Container>
    )
  }
}