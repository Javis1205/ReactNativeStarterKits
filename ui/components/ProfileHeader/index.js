/**
 * Created by vjtc0n on 6/9/17.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {findNodeHandle, Image} from 'react-native'
import { View,
  Container, Header, Title, Content, Button, Grid, Row, Col, List, ListItem,
  Card, CardItem, Text, Thumbnail, Left, Right, Body
} from 'native-base'
import { API_BASE } from '~/store/constants/api'
import moment from 'moment'
import { BlurView } from 'react-native-blur'
import CacheableImage from '~/ui/components/CacheableImage'
import Icon from '~/ui/elements/Icon'
import styles from './styles'

const imgAvatar = "https://static.wonderfulunion.net/groundctrl/clients/taylorswift/media/13/06/large.9y7nxie1qli9.jpg"
const imgCover = "http://images.huffingtonpost.com/2015-07-13-1436808696-2294090-taylorswiftredtouropener650430.jpg"

export default class ProfileHeader extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      refreshing: false,
      viewRef: null
    }
  }
  
  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }
  
  render() {
    const starAvatar = {uri: this.props.user.avatar}
    const coverImg = {uri: imgCover}
    return(
      <View style={styles.headerContainer}>
        <CacheableImage
          onLoadEnd={this.imageLoaded.bind(this)}
          ref={(img) => { this.backgroundImage = img; }}
          style={styles.coverImg} source={coverImg}/>
        <BlurView
          blurRadius={10}
          blurAmount={0}
          viewRef={this.state.viewRef}
          blurType="dark"
          style={styles.avatarContainer}/>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatarImg} source={starAvatar} />
          <View style={styles.socialContainer}>
            {this.props.children}
          </View>
        </View>
      </View>
    )
  }
}