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
import { BlurView } from 'react-native-blur'
import moment from 'moment';

import {
  InputField,
  CheckBoxField,
  DateField,
} from '~/ui/elements/Form'
import Icon from '~/ui/elements/Icon'
import ProfileHeader from '~/ui/components/ProfileHeader'
import EventHeader from '~/ui/components/EventHeader'

import * as commonActions from '~/store/actions/common'

import styles from './styles'
import EventForm from '../../components/EventForm'

const img = 'http://images.huffingtonpost.com/2015-07-13-1436808696-2294090-taylorswiftredtouropener650430.jpg'
const imgAvatar = "https://static.wonderfulunion.net/groundctrl/clients/taylorswift/media/13/06/large.9y7nxie1qli9.jpg"
const imgCover = "http://images.huffingtonpost.com/2015-07-13-1436808696-2294090-taylorswiftredtouropener650430.jpg"

const formSelector = formValueSelector('UpdateEventForm')
@connect(state=>({
  formValues: formSelector(state, 'name', 'address'),
  formState: state.form
}), dispatch => ({
  actions: bindActionCreators({ ...commonActions}, dispatch)
}), (stateProps, dispatchProps, ownProps)=>{
  return ({
    enableReinitialize: true,
    initialValues: {
      name: 'Sing My Song',
      address: 'LA-USA'
    },
    ...ownProps, ...stateProps, ...dispatchProps,
  })
  
})
@reduxForm({ form: 'UpdateEventForm', fields: ['name', 'address'], validate: null})

export default class EventUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fromTime: moment(new Date()).format("HH:mm"),
      toTime: moment(new Date()).format("HH:mm"),
      date: moment(new Date()).format("DD/MM/YY"),
      imgUri: img
    }
    
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
  
  getImgUri(uri) {
    this.setState({
      imgUri: uri
    })
  }
  
  submitEvent() {
    console.log(this.state)
  }
  
  render() {
    return(
      <Container>
        <Content>
          <ProfileHeader>
            <EventHeader/>
          </ProfileHeader>
          <EventForm
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