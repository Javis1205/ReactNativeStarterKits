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


import {
  InputField,
  CheckBoxField,
  DateField,
} from '~/ui/elements/Form'
import styles from './styles'

export default class UpdateForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  
  render() {
    return(
      <View style={{paddingLeft: 15, paddingRight: 15}}>
        <View style={{flexDirection: 'column'}}>
          <View style={{...styles.inputContainer}}>
            <Field
              iconStyle={styles.rightIcon}
              icon={input=>input.value ? 'close' : 'create'}
              onIconPress={input=>input.onChange('')}
              inputStyle={styles.inputText}
              style={{...styles.inputField}}
              label="User Name"
              name="name"
              component={InputField}
              placeholderTextColor="#7e7e7e"/>
          </View>
          <View style={{...styles.inputContainer}}>
            <Field
              iconStyle={styles.rightIcon}
              icon={input=>input.value ? 'close' : 'create'}
              onIconPress={input=>input.onChange('')}
              inputStyle={styles.inputText}
              style={{...styles.inputField}}
              label="Favorite"
              name="favorite"
              component={InputField}
              placeholderTextColor="#7e7e7e"/>
          </View>
          <View style={{...styles.inputContainer}}>
            <Field
              iconStyle={styles.rightIcon}
              icon={input=>input.value ? 'close' : 'create'}
              onIconPress={input=>input.onChange('')}
              inputStyle={styles.inputText}
              style={{...styles.inputField}}
              label="Location"
              name="address"
              component={InputField}
              placeholderTextColor="#7e7e7e"/>
          </View>
        </View>
      </View>
    )
  }
}