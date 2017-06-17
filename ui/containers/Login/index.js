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

import routes from '~/ui/routes'

// this way help copy and paste faster
import * as commonActions from '~/store/actions/common'
import * as authActions from '~/store/actions/auth'
import * as commonSelectors from '~/store/selectors/common'

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
}), {...commonActions, ...authActions})
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

    
    const ret = await manager.authorize(socialType, {scopes: 'email profile'})
    console.log(ret.response)
    const token = ret.response.credentials.accessToken
    // let token = "EAACEdEose0cBAGPt10F7Jdtjqawj6KrKfJMtvfEgCP9ZAnZBvcpA7qSpJAmJnQmQkaCc7Gcega56lK4kBbuh2mu88n11oMX3Rx0iZCW9ZBsrZAwgO4ngrah9IMOcP2X1NoeqDTykmnlV0hKcWurfZCtaoMLgBhZB1lTr2MSI4kw6iOIRZBtXBrSHmphBPhcxL9gZD"
    this.props.login(token, socialType)
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
        <BlurView
          style={{...styles.absolute, opacity: 0.8}}
          viewRef={this.state.viewRef}
          blurType="dark"
          blurAmount={1}
        />
                               
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