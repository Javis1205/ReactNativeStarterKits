/**
 * Created by vjtc0n on 6/9/17.
 */
import React, { Component } from 'react'
import {
  Button, List, ListItem, Switch, Spinner, CheckBox, Picker, Text,
  Container, Item, Input, Left, Body, Right, View, Content, Grid, Col, Row
} from 'native-base'
import { Dimensions, Image } from 'react-native'

import {
  InputField,
  CheckBoxField,
  DateField,
} from '~/ui/elements/Form'
import Icon from '~/ui/elements/Icon'
import PhotoChooser from '~/ui/components/PhotoChooser'
import CacheableImage from '~/ui/components/CacheableImage'

import styles from './styles'

export default class Avatar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgUri: props.avatarUri
    }
    
  }
  
  handleChoosePhoto = (response) => {
    this.props.getImgUri(response.uri, response.data)
  }
  
  render() {
    return (
      <View style={styles.photoContainer}>
        <Image
          style={styles.img}
          source={{uri: this.props.avatarUri}} />
        <PhotoChooser
          style={styles.photoIcon}
          onSuccess={this.handleChoosePhoto}/>
      </View>
    )
  }
}