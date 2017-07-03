import React, { Component } from 'react'
import { Platform, Image } from 'react-native'
import { connect } from 'react-redux'
import { Content,Text, List, ListItem, 
  Container, Left, Right, Badge, Button, View, StyleProvider, getTheme, variables,
  Spinner, Thumbnail,
} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import OAuthManager from 'react-native-oauth'
import OneSignal from 'react-native-onesignal'

import CacheableImage from '~/ui/components/CacheableImage'
import * as authActions from '~/store/actions/auth'
import * as accountSelectors from '~/store/selectors/account'
import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'


import options from './options'
import routes from '~/ui/routes'
//import Icon from '~/ui/elements/Icon'
import styles from './styles'

import {  
  API_BASE
} from '~/store/constants/api'

const manager = new OAuthManager('novame')

@connect(state=>({
  token: authSelectors.getToken(state),
  profile: accountSelectors.getProfile(state),
  socialType: authSelectors.getSocialType(state)
}), {...authActions, ...commonActions})
export default class extends Component {  

  async _handleLogout() {
    const {forwardTo, closeDrawer, setToast} = this.props
    closeDrawer()
    const ret = await manager.deauthorize(this.props.socialType)
    if (ret.status == "ok") {
      OneSignal.deleteTag("user_id")
      forwardTo('login')
      setToast('Logout successfully!!!')
    } else {
      setToast('Logout failed! Please check your internet connection')
    }
  }

  navigateTo(route) {
    const {forwardTo, closeDrawer} = this.props
    closeDrawer()
    forwardTo(route)
  }
  
  onFanProfilePress() {
    const {forwardTo, closeDrawer} = this.props
    closeDrawer()
    forwardTo('fanProfile')
  }

  render() {
    const {profile, forwardTo} = this.props    
    let areUCeleb = (profile.user_type && profile.user_type.id == 3) ? null : <ListItem
                                                            noBorder
                                                            button
                                                            onPress={e => this.navigateTo('areUCeleb')}>
                                                            <Left>
                                                              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                                                <Icon name={'info'} style={{...styles.icon, paddingLeft: 6}} />
                                                              </View>
                                                              <Text style={styles.iconText}>Are you a celebrity?</Text>
                                                            </Left>
                                                          </ListItem>
    return (
      
        <Content
          bounces={false}
          style={styles.container}
        >                
          <ListItem
            onPress={this.onFanProfilePress.bind(this)}
            style={styles.drawerCover}>
            <Image source={{uri: this.props.profile.avatar}}
              placeholder={<Icon name="image" style={styles.drawerImage}/>} 
              style={styles.drawerImage}/>            

            <Text large style={styles.text}>{this.props.profile.username}</Text>
            <Text small style={styles.text}>{this.props.profile.location}</Text>
            {/*<View style={styles.editContainer}>
              <Text small style={styles.text}>{'LA'}, {'USA'}</Text>
              /!*<Icon onPress={e=>{/!*this.navigateTo('user/profile')*!/}} name="edit" style={styles.iconEdit} />*!/
            </View>*/}
          </ListItem>
          <View style={styles.listItemContainer}>
            {options.listItems.map((item, index) =>
                <ListItem noBorder key={index} button onPress={e => this.navigateTo(item.route)} >
                  <Left>
                    <Icon name={item.icon} style={styles.icon} />
                    <Text style={styles.iconText}>{item.name}</Text>
                  </Left>                
                </ListItem>)}
            {areUCeleb}
            <ListItem noBorder button onPress={this._handleLogout.bind(this)} >
              <Text style={styles.iconTextLast}>Log Out</Text>
            </ListItem>
          </View>          
        </Content>
      
    );
  }
}