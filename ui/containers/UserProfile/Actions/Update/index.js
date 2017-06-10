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
import moment from 'moment';

import {
  InputField,
  CheckBoxField,
  DateField,
} from '~/ui/elements/Form'
import Icon from '~/ui/elements/Icon'

import * as commonActions from '~/store/actions/common'

import styles from './styles'
import UpdateForm from '../../components/UpdateForm'
import Avatar from '../../components/Avatar'
import Cover from '../../components/Cover'

const imgAvatar = "https://static.wonderfulunion.net/groundctrl/clients/taylorswift/media/13/06/large.9y7nxie1qli9.jpg"
const imgCover = "http://images.huffingtonpost.com/2015-07-13-1436808696-2294090-taylorswiftredtouropener650430.jpg"

const formSelector = formValueSelector('UpdateProfileForm')
@connect(state=>({
  formValues: formSelector(state, 'name', 'address', 'favorite'),
  formState: state.form
}), dispatch => ({
  actions: bindActionCreators({ ...commonActions}, dispatch)
}), (stateProps, dispatchProps, ownProps)=>{
  return ({
    enableReinitialize: true,
    initialValues: {
      name: '',
      address: '',
      favorite: ''
    },
    ...ownProps, ...stateProps, ...dispatchProps,
  })
  
})
@reduxForm({ form: 'UpdateProfileForm', fields: ['name', 'address', 'favorite'], validate: null})

export default class ProfileUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCeleb: true,
      avatarImg: imgAvatar,
      coverImg: imgCover
    }
    
  }
  
  renderCommonUser() {
    return (
      <View>
        <View style={styles.avatarCommonUserContainer}>
          <Avatar avatarUri={this.state.avatarImg}/>
        </View>
        <UpdateForm/>
      </View>
    )
  }
  
  renderCelebUser() {
    return (
      <View>
        <View style={styles.headerCelebUserContainer}>
          <Cover coverUri={this.state.coverImg}/>
          <View style={styles.avatarCelebUserContainer}>
            <Avatar avatarUri={this.state.avatarImg}/>
          </View>
        </View>
        <UpdateForm/>
      </View>
    )
  }
  
  submitUser() {
    console.log(this.state)
  }
  
  render() {
    let editProfile = null
    editProfile = this.state.isCeleb ? this.renderCelebUser() : this.renderCommonUser();
    return (
      <Container>
        {editProfile}
        <Button
          style={styles.submitButton}
          onPress={this.submitUser.bind(this)}>
          <Text>Update</Text>
        </Button>
      </Container>
    )
  }
}