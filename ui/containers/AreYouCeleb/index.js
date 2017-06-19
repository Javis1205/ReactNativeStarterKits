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

const formSelector = formValueSelector('CreateCelebRequestForm')
@connect(state=>({
    formValues: formSelector(state, 'description'),
    formState: state.form,
    token: authSelectors.getToken(state),
    profile: accountSelectors.getProfile(state)
  }), { ...commonActions, ...accountActions},
  (stateProps, dispatchProps, ownProps)=>{
    return ({
      enableReinitialize: true,
      initialValues: {
        description: ''
      },
      ...ownProps, ...stateProps, ...dispatchProps,
    })
    
  })
@reduxForm({ form: 'CreateCelebRequestForm', fields: ['description'], validate: null})

export default class AreUCeleb extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  
  onSubmit() {
    this.props.requestCeleb(this.props.token, this.props.formValues.description)
  }
  
  render() {
    return(
      <View style={styles.container}>
        <View style={{flexDirection: 'column'}}>
          <View style={{...styles.inputContainer}}>
            <Field
              iconStyle={styles.rightIcon}
              icon={input=>input.value ? 'close' : 'create'}
              onIconPress={input=>input.onChange('')}
              inputStyle={styles.inputText}
              style={{...styles.inputField}}
              label="Description"
              name="description"
              component={InputField}
              placeholderTextColor="#7e7e7e"/>
          </View>
          <Button
            onPress={this.onSubmit.bind(this)}
            style={styles.submitButton}>
            <Text>Request</Text>
          </Button>
        </View>
      </View>
    )
  }
}