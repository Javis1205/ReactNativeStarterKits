/**
 * Created by vjtc0n on 6/9/17.
 */
import React, { Component } from 'react'
import {
  Button, List, ListItem, Switch, Spinner, CheckBox, Picker, Text,
  Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Dimensions, Image } from 'react-native'
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
import PhotoChooser from '~/ui/components/PhotoChooser'
import CacheableImage from '~/ui/components/CacheableImage'

import styles from './styles'
const img = 'https://image.freepik.com/free-icon/camera-symbol_318-1953.jpg'

export default class EventForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fromTimeVisible: false,
      toTimeVisible: false,
      fromTime: moment(new Date()).format("HH:mm"),
      toTime: moment(new Date()).format("HH:mm"),
      date: moment(new Date()).format("DD/MM/YYYY"),
      dateVisible: false,
      imgUri: img
    }
    
  }
  
  onFromTimeFocus() {
    this.setState({
      fromTimeVisible: true
    })
  }
  
  onFromTimeCancel() {
    this.setState({
      fromTimeVisible: false
    })
  }
  
  setFromTime(value) {
    this.props.getFromTime(moment(value).format("HH:mm"))
    this.setState({
      fromTimeVisible: false,
      fromTime: moment(value).format("HH:mm")
    })
  }
  
  onToTimeFocus() {
    this.setState({
      toTimeVisible: true
    })
  }
  
  onToTimeCancel() {
    this.setState({
      toTimeVisible: false
    })
  }
  
  setToTime(value) {
    this.props.getToTime(moment(value).format("HH:mm"))
    this.setState({
      toTimeVisible: false,
      toTime: moment(value).format("HH:mm")
    })
  }
  
  onDateFocus() {
    this.setState({
      dateVisible: true
    })
  }
  
  onDateCancel() {
    this.setState({
      dateVisible: false
    })
  }
  
  setDate(value) {
    this.props.getDate(moment(value).format("DD/MM/YYYY"))
    this.setState({
      dateVisible: false,
      date: moment(value).format("DD/MM/YYYY")
    })
  }
  
  handleChoosePhoto = (response) => {
    this.props.getImgUri(response.uri, response.data)
    this.setState({
      imgUri: response.uri
    })
  }
  
  render() {
    let fromTime = this.state.fromTime
    let toTime = this.state.toTime
    let date = this.state.date
    let imgContainer = null
    if (this.props.imgUri != '') {
      imgContainer = <View style={styles.photoEvent}>
                      <Image
                        style={styles.img}
                        source={{uri: this.props.imgUri}} />
                      <PhotoChooser style={styles.photoIcon} onSuccess={this.handleChoosePhoto}/>
                    </View>
    } else {
      imgContainer = <View style={styles.photoEvent}>
                        <CacheableImage
                          style={styles.img}
                          source={{uri: this.state.imgUri}} />
                        <PhotoChooser style={styles.photoIcon} onSuccess={this.handleChoosePhoto}/>
                      </View>
    }
    
    return(
      <View style={{paddingLeft: 15, paddingRight: 15, paddingBottom: 50}}>
        <View style={{flexDirection: 'column'}}>
          <View style={{...styles.inputContainer}}>
            <Field
              iconStyle={styles.rightIcon}
              icon={input=>input.value ? 'close' : false}
              onIconPress={input=>input.onChange('')}
              inputStyle={styles.inputText}
              style={{...styles.inputField}}
              label="Event Name"
              name="name"
              component={InputField}
              placeholderTextColor="#7e7e7e"/>
          </View>
          <View style={{...styles.inputContainer}}>
            <Field
              iconStyle={styles.rightIcon}
              icon={input=>input.value ? 'close' : false}
              onIconPress={input=>input.onChange('')}
              inputStyle={styles.inputText}
              style={{...styles.inputField}}
              label="Address"
              name="address"
              component={InputField}
              placeholderTextColor="#7e7e7e"/>
          </View>
          <View style={{height: 60}}>
            <Grid>
              <Col style={{alignItems: 'center'}}>
                <View style={{...styles.inputContainer, marginRight: 10}}>
                  <Field
                    onPress={this.onFromTimeFocus.bind(this)}
                    editable={false}
                    style={styles.inputField}
                    label={fromTime}
                    name="fromDate"
                    component={InputField}
                    placeholderTextColor="#7e7e7e"/>
                </View>
              </Col>
              <Col style={{alignItems: 'center'}}>
                <View style={{...styles.inputContainer, marginLeft: 10}}>
                  <Field
                    onPress={this.onToTimeFocus.bind(this)}
                    editable={false}
                    style={styles.inputField}
                    label={toTime}
                    name="toDate"
                    component={InputField}
                    placeholderTextColor="#7e7e7e"/>
                </View>
              </Col>
            </Grid>
          </View>
          <View style={{...styles.inputContainer}}>
            <Field
              iconStyle={styles.rightIcon}
              icon={input=>input.value ? 'close' : 'calendar'}
              onPress={this.onDateFocus.bind(this)}
              editable={false}
              inputStyle={styles.inputText}
              style={{...styles.inputField}}
              label={date}
              name="date"
              component={InputField}
              placeholderTextColor="#7e7e7e"/>
          </View>
          {imgContainer}
        </View>
        <DateTimePicker
          mode="time"
          titleIOS="Start Time Picker"
          confirmTextIOS="Ok"
          cancelTextIOS="Cancel"
          isVisible={this.state.fromTimeVisible}
          onConfirm={this.setFromTime.bind(this)}
          onCancel={this.onFromTimeCancel.bind(this)}
        />
        <DateTimePicker
          mode="time"
          titleIOS="End Time Picker"
          confirmTextIOS="Ok"
          cancelTextIOS="Cancel"
          isVisible={this.state.toTimeVisible}
          onConfirm={this.setToTime.bind(this)}
          onCancel={this.onToTimeCancel.bind(this)}
        />
        <DateTimePicker
          titleIOS="Date Picker"
          confirmTextIOS="Ok"
          cancelTextIOS="Cancel"
          isVisible={this.state.dateVisible}
          onConfirm={this.setDate.bind(this)}
          onCancel={this.onDateCancel.bind(this)}
        />
      </View>
    )
  }
}