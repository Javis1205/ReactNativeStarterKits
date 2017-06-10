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

import {
  InputField,
  CheckBoxField,
  DateField,
} from '~/ui/elements/Form'
import Icon from '~/ui/elements/Icon'

import * as commonActions from '~/store/actions/common'

import styles from './styles'
import EventForm from '../../components/EventForm'

const img = 'http://images.huffingtonpost.com/2015-07-13-1436808696-2294090-taylorswiftredtouropener650430.jpg'

const formSelector = formValueSelector('CreateEventForm')
@connect(state=>({
  formValues: formSelector(state, 'name', 'address'),
  formState: state.form
}), dispatch => ({
  actions: bindActionCreators({ ...commonActions}, dispatch)
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
    this.props.actions.forwardTo('event/update')
  }
  
  render() {
    return(
      <Container>
        <Content>
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