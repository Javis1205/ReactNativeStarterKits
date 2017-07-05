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

@connect(state=>({
  
}), {...commonActions })

export default class Setting extends Component {
  render() {
    return(
      <Container>
        <Content>
          <List>
            <ListItem onPress={() => this.props.forwardTo('userProfileReport')}>
              <Text>Report Problem</Text>
              <Right>
                <Icon
                  style={{color: 'black'}}
                  name="keyboard-arrow-right"/>
              </Right>
            </ListItem>
            <ListItem onPress={() => {{/*this.props.forwardTo('userProfileUpdate')*/}}}>
              <Text>Configuration</Text>
              <Right>
                <Icon
                  style={{color: 'black'}}
                  name="keyboard-arrow-right"/>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    )
  }
}