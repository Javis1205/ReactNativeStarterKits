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
import { API_BASE, COVER_IMAGE } from '~/store/constants/api'
import moment from 'moment'
import { BlurView } from 'react-native-blur'
import CacheableImage from '~/ui/components/CacheableImage'
import Icon from '~/ui/elements/Icon'
import PopupPhotoView from '~/ui/components/PopupPhotoView'
import styles from './styles'


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
    let coverImg = {uri: (this.props.user.cover_picture) ? this.props.user.cover_picture : COVER_IMAGE}
    return(
      <View style={styles.headerContainer}>
        <PopupPhotoView ref='popupPhotoView' />
        <Image
          onLoadEnd={this.imageLoaded.bind(this)}
          ref={(img) => { this.backgroundImage = img; }}
          style={styles.coverImg} source={coverImg}/>
        {this.state.viewRef && <BlurView
          blurRadius={1}
          blurAmount={0}
          viewRef={this.state.viewRef}
          blurType="dark"
          style={styles.avatarContainer}/>
        }
        <View style={styles.avatarContainer}>
          <Button
            onPress={() => this.refs.popupPhotoView.setImage(this.props.user.avatar)}
            style={styles.avatarButton}>
            <Image style={styles.avatarImg} source={starAvatar} />
          </Button>
          <View style={styles.socialContainer}>
            {this.props.children}
          </View>
        </View>
      </View>
    )
  }
}