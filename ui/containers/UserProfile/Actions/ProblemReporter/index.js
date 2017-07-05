/**
 * Created by vjtc0n on 6/9/17.
 */
import React, { Component } from 'react'
import {
  Button, List, ListItem, Switch, Spinner, CheckBox, Picker, Text,
  Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Dimensions, ScrollView } from 'react-native'
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

const formSelector = formValueSelector('ReportForm')
@connect(state=>({
  formValues: formSelector(state, 'content'),
  formState: state.form
}), dispatch => ({
  actions: bindActionCreators({ ...commonActions}, dispatch)
}), (stateProps, dispatchProps, ownProps)=>{
  return ({
    enableReinitialize: true,
    initialValues: {
      content: ''
    },
    ...ownProps, ...stateProps, ...dispatchProps,
  })
  
})
@reduxForm({ form: 'ReportForm', fields: ['content'], validate: null})

export default class ProblemReporter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    
  }
  
  submit() {
    console.log(this.state)
  }
  
  render() {
    return (
      <Container>
        <ScrollView
          keyboardDismissMode="on-drag"
          contentContainerStyle={{paddingBottom: 20}}
          style={{paddingHorizontal: 15}}>
          <View>
            <View style={{...styles.inputContainer}}>
              <Field
                multiline={true}
                iconStyle={styles.rightIcon}
                icon={input=>input.value ? 'close' : 'create'}
                onIconPress={input=>input.onChange('')}
                inputStyle={styles.inputText}
                style={{...styles.inputField}}
                label="Enter your report problem"
                name="content"
                component={InputField}
                placeholderTextColor="#7e7e7e"/>
            </View>
            <Button
              style={styles.submitButton}
              onPress={this.submit.bind(this)}>
              <Text>Update</Text>
            </Button>
          </View>
        </ScrollView>
      </Container>
    )
  }
}