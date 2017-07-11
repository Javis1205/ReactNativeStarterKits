import React, { Component } from 'react'
import { Image, findNodeHandle } from 'react-native'
import { 
  Container,   View,
  Form, 
  Item, 
  Input, 
  Button, 
  Text, 
  Thumbnail, 
  Label,
} from 'native-base'
import styles from './styles'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import OAuthManager from 'react-native-oauth'
import { BlurView } from 'react-native-blur'
import OneSignal from 'react-native-onesignal'


import routes from '~/ui/routes'

// this way help copy and paste faster
import * as commonActions from '~/store/actions/common'
import * as authActions from '~/store/actions/auth'
import * as commonSelectors from '~/store/selectors/common'
import * as accountSelectors from '~/store/selectors/account'
import * as accountActions from '~/store/actions/account'

import Content from '~/ui/components/Content'
import Preload from '~/ui/containers/Preload'
import { InputField } from '~/ui/elements/Form'
import { validate } from './utils'
import { spashImage, backgroundImage } from '~/assets'

import Icon from '~/ui/elements/Icon'

import { SOCIAL_CONFIG } from '~/store/constants/api'

const manager = new OAuthManager('novame')

manager.configure(SOCIAL_CONFIG)

@connect(state=>({  
  loginRequest: commonSelectors.getRequest(state, 'login'),
  profile: accountSelectors.getProfile(state)
}), {...commonActions, ...authActions, ...accountActions})
@reduxForm({ form: 'LoginForm', validate})
export default class extends Component {

  constructor(props) {
    super(props)
    this.state = { viewRef: null }
  }

  // _handleLogin = ({email, password}) => {    
  //   this.props.login(email, password)
  // }

  async handleLogin(socialType = 'facebook'){
    this.props.saveSocialType(socialType)
    const ret = await manager.authorize(socialType)
    console.log(ret.response)
    let token = null
    if (socialType == 'facebook') {
      token = ret.response.credentials.accessToken
      this.props.login(token, socialType, (error, data) => {
       this.props.getProfile(data.access_token, (errorProfile, dataProfile) => {
         console.log(dataProfile.id)
         this.props.forwardTo('home')
         this.props.setToast('Logged successfully!!!')
         OneSignal.sendTag("user_id", dataProfile.id)
       })
     })
    } else {
      token = ret.response.credentials.access_token
      tokenSecret = ret.response.credentials.access_token_secret
      console.log(token)
      console.log(tokenSecret)
      /*this.props.login(token, socialType, (error, data) => {
        this.props.getProfile(data.access_token, (errorProfile, dataProfile) => {
          console.log(dataProfile.id)
          this.props.forwardTo('home')
          this.props.setToast('Logged successfully!!!')
          OneSignal.sendTag("user_id", dataProfile.id)
        })
      }) */
    }
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) })
  }

  render() {    
    const { handleSubmit, submitting, forwardTo, loginRequest } = this.props          
    if(loginRequest.status === 'pending'){
      return (
        <Preload/>
      )
    }          

    return (
      <Container style={styles.container}>
        <Image source={backgroundImage} 
          ref={img => this.backgroundImage = img}
          onLoadEnd={this.imageLoaded.bind(this)}
          style={styles.splash}/>
        {this.state.viewRef && <BlurView
            style={{...styles.absolute, opacity: 0.8}}
            viewRef={this.state.viewRef}
            blurType="dark"
            blurAmount={1}
          />
        }
                               
        <View style={styles.bottomContainer}>
          <Text style={styles.textLogo}>NOVAME</Text>      

          <View style={styles.socialButtons}>
            <Button bordered light transparent iconLeft style={styles.socialButton} onPress={()=>this.handleLogin('facebook')}>
                <Icon name="facebook" style={styles.socialButtonIcon}/>
                <Text>Login with Facebook</Text>
            </Button>
            <Button bordered light transparent iconLeft style={styles.socialButton} onPress={()=>this.handleLogin('twitter')}>
                <Icon name="twitter" style={styles.socialButtonIcon}/>
                <Text>Login with Twitter</Text>
            </Button>              
          </View>  
          
        </View>

      </Container>
    )
  }
}