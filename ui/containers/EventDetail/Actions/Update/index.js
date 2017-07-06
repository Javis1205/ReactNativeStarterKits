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
import Modal from 'react-native-modal'

import {
  API_BASE
} from '~/store/constants/api'

import {
  InputField,
  CheckBoxField,
  DateField,
} from '~/ui/elements/Form'

import ProfileHeader from '~/ui/components/ProfileHeader'
import EventHeader from '~/ui/components/EventHeader'


import * as commonActions from '~/store/actions/common'
import * as campaignSelectors from '~/store/selectors/campaign'
import * as campaignActions from '~/store/actions/campaign'
import * as authSelectors from '~/store/selectors/auth'
import * as accountSelectors from '~/store/selectors/account'
import * as imageActions from '~/store/actions/image'

import styles from './styles'
import EventForm from '../../components/EventForm'

const formSelector = formValueSelector('UpdateEventForm')
@connect(state=>({
  formValues: formSelector(state, 'name', 'address'),
  formState: state.form,
  token: authSelectors.getToken(state),
  chosenEvent: campaignSelectors.getChosenCampaign(state),
  celebrity_id: accountSelectors.getCelebrityId(state)
}), dispatch => ({
  actions: bindActionCreators({ ...commonActions, ...campaignActions, ...imageActions}, dispatch)
}), (stateProps, dispatchProps, ownProps)=>{
  return ({
    enableReinitialize: true,
    initialValues: {
      name: stateProps.chosenEvent.title,
      address: stateProps.chosenEvent.location
    },
    ...ownProps, ...stateProps, ...dispatchProps,
  })
  
})
@reduxForm({ form: 'UpdateEventForm', fields: ['name', 'address'], validate: null})

export default class EventUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fromTime: moment(props.chosenEvent.start_time).format("HH:mm"),
      toTime: moment(props.chosenEvent.finish_time).format("HH:mm"),
      date: moment(props.chosenEvent.finish_time).format("DD/MM/YYYY"),
      imgUri: '',
      celebrity: props.chosenEvent.celebrity,
      imgId: '',
      updatingModal: false
    }
    
  }
  
  componentDidMount() {
    this.componentWillFocus()
  }
  
  componentWillFocus() {
    let event = this.props.chosenEvent
    this.setState({
      fromTime: moment(event.start_time).format("HH:mm"),
      toTime: moment(event.finish_time).format("HH:mm"),
      date: moment(event.finish_time).format("DD/MM/YYYY"),
      imgUri: (event.images[0]) ? (API_BASE + '/i/0x0/' + event.images[0].image.url) : '',
      celebrity: event.celebrity
    })
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
    this.setState({
      updatingModal: true
    })
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
    this.props.actions.editCampaign(this.props.token, this.props.chosenEvent.id, event, (error, data) => {
      console.log(data)
      if (data != null) {
        this.props.actions.deleteAfterEditingACampaign(data)
        this.props.actions.addAfterDeletingACampaign(data)
        this.setState({
          updatingModal: false
        }, () => {
          this.props.actions.goBack()
        })
      } else {
        this.setState({
          updatingModal: false
        }, () => {
          this.props.actions.setToast('Time out', 'error')
        })
      }
    })
  }
  
  render() {
    return(
      <Container>
        <Content>
          <EventForm
            updateForm={this.props.chosenEvent}
            imgUri={this.state.imgUri}
            getFromTime={this.getFromTime.bind(this)}
            getDate={this.getDate.bind(this)}
            getImgUri={this.getImgUri.bind(this)}
            getToTime={this.getToTime.bind(this)}/>
        </Content>
        <Button
          style={styles.submitButton}
          onPress={this.submitEvent.bind(this)}>
          <Text>Update</Text>
        </Button>
        <Modal
          backdropColor="gray"
          backdropOpacity={0.7}
          animationOut={'fadeOut'}
          animationIn={'fadeIn'}
          hideOnBack={true}
          isVisible={this.state.updatingModal}
          style={{}}>
          <Spinner color={"white"}/>
        </Modal>
      </Container>
    )
  }
}