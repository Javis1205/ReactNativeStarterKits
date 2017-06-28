/**
 * Created by vjtc0n on 6/19/17.
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

@connect(state=>({
    token: authSelectors.getToken(state),
    profile: accountSelectors.getProfile(state)
}), { ...commonActions, ...accountActions})

export default class ListTopFan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      listFan: []
    }
  }
  
  componentDidMount() {
    this.componentWillFocus()
  }
  
  componentWillFocus() {
    this.props.getTopFan(this.props.token, this.props.route.params.userId, (error, data) => {
      this.setState({
        listFan: data.results,
        refreshing: false
      })
    })
  }
  
  onFaceTimePress(profile) {
    this.props.saveFanProfileToFaceTime(profile)
    this.props.forwardTo(`videoCall/${profile.id}`)
  }
  
  renderRow(rowData, sectionID, rowID, highlightRow) {
    let rightContainer = null
    if (this.props.profile.id == this.props.route.params.userId) {
      rightContainer= <Button
                        iconRight
                        noPadder
                        transparent
                        style={{alignSelf: 'flex-end'}}
                        onPress={this.onFaceTimePress.bind(this, rowData)}>
                        <Icon name="photo-camera"/>
                      </Button>
    } else {
      rightContainer = <Text note small style={{alignSelf: 'flex-end'}}>8000 LP</Text>
    }
    return(
      <ListItem style={styles.listItemContainer}>
        <Grid>
          <Col style={{ width: '70%', flexDirection: 'row'}}>
            <Image
              source={{uri: rowData.avatar}}
              style={{width: 50, height: 50, borderRadius: 25}}/>
            <View style={{flexDirection: 'column', paddingLeft: 10, justifyContent: 'center'}}>
              <Text numberOfLines={1} style={{fontSize: 14}}>{rowData.username}</Text>
              <Text style={{fontSize: 14}}>{rowData.location || 'location'}</Text>
            </View>
          </Col>
          <Col style={{justifyContent: 'center'}}>
            {rightContainer}
          </Col>
        </Grid>
      </ListItem>
    )
  }
  
  render() {
    if (this.state.refreshing) {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner color={"black"}/>
        </View>
      )
    }
    return(
      <View style={styles.container}>
        <List
          removeClippedSubviews={false}
          renderRow={this.renderRow.bind(this)}
          dataArray={this.state.listFan}/>
      </View>
    )
  }
}