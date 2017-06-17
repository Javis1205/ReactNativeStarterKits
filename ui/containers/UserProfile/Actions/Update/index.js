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

import {
  API_BASE,
  COVER_IMAGE
} from '~/store/constants/api'


import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'
import * as accountActions from '~/store/actions/account'
import * as accountSelectors from '~/store/selectors/account'
import * as imageActions from '~/store/actions/image'

import styles from './styles'
import UpdateForm from '../../components/UpdateForm'
import Avatar from '../../components/Avatar'
import Cover from '../../components/Cover'

const formSelector = formValueSelector('UpdateProfileForm')
@connect(state=>({
  formValues: formSelector(state, 'name', 'address', 'favorite'),
  formState: state.form,
  token: authSelectors.getToken(state),
  profile: accountSelectors.getProfile(state)
}), { ...commonActions, ...accountActions, ...imageActions},
  (stateProps, dispatchProps, ownProps)=>{
  return ({
    enableReinitialize: true,
    initialValues: {
      name: stateProps.profile.username,
      address: stateProps.profile.location,
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
      isCeleb: false,
      avatarImg: props.profile.avatar,
      coverImg: props.profile.cover_picture || COVER_IMAGE,
    }
    
  }
  
  componentDidMount() {
    if (this.props.profile.user_type.id == 3) {
      this.setState({
        isCeleb: true
      })
    }
  }
  
  getImgAvatarUri(uri, data) {
    let newDate = new Date()
    this.props.uploadImage(this.props.token, [
      { name: 'images', filename: (this.props.token + newDate.toString() + '.jpg'), type:'image/jpeg', data: data }
    ], (error, data) => {
      this.setState({
        avatarImg: API_BASE + '/i/0x0/' + data.images[0].url
      })
    })
  }
  
  getImgCoverUri(uri, data) {
    let newDate = new Date()
    this.props.uploadImage(this.props.token, [
      { name: 'images', filename: (this.props.token + newDate.toString() + '.jpg'), type:'image/jpeg', data: data }
    ], (error, data) => {
      this.setState({
        coverImg: API_BASE + '/i/0x0/' + data.images[0].url
      })
    })
  }
  
  submitUser() {
    let userInfo = {
      avatar: this.state.avatarImg,
      location: this.props.formValues.address,
      cover_picture: this.state.coverImg,
      favorite: this.props.formValues.favorite
    }
    
    this.props.updateProfile(this.props.token, userInfo)
  }
  
  renderCommonUser() {
    return (
      <View>
        <View style={styles.avatarCommonUserContainer}>
          <Avatar
            getImgUri={this.getImgAvatarUri.bind(this)}
            avatarUri={this.state.avatarImg}/>
        </View>
        <UpdateForm/>
      </View>
    )
  }
  
  renderCelebUser() {
    return (
      <View>
        <View style={styles.headerCelebUserContainer}>
          <Cover
            getImgUri={this.getImgCoverUri.bind(this)}
            coverUri={this.state.coverImg}/>
          <View style={styles.avatarCelebUserContainer}>
            <Avatar
              getImgUri={this.getImgAvatarUri.bind(this)}
              avatarUri={this.state.avatarImg}/>
          </View>
        </View>
        <UpdateForm/>
      </View>
    )
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