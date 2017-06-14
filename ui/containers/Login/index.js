import React, { Component } from 'react'
import { Image } from 'react-native'
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

import routes from '~/ui/routes'

// this way help copy and paste faster
import * as commonActions from '~/store/actions/common'
import * as authActions from '~/store/actions/auth'
import * as commonSelectors from '~/store/selectors/common'

import Content from '~/ui/components/Content'
import Preload from '~/ui/containers/Preload'
import { InputField } from '~/ui/elements/Form'
import { validate } from './utils'
import { spashImage } from '~/assets'

import Icon from '~/ui/elements/Icon'

import { SOCIAL_CONFIG } from '~/store/constants/api'

const manager = new OAuthManager('novame')

manager.configure(SOCIAL_CONFIG)

@connect(state=>({  
  loginRequest: commonSelectors.getRequest(state, 'login'),  
}), {...commonActions, ...authActions})
@reduxForm({ form: 'LoginForm', validate})
export default class extends Component {

  // _handleLogin = ({email, password}) => {    
  //   this.props.login(email, password)
  // }

  async handleLogin(socialType = 'facebook'){
    if(socialType === 'facebook'){ 
      const resp = await manager.authorize(socialType)
    }

    // let token = "EAAS2N4DQMIEBAP6LxAPnBu8U9juPZAo0bZCBIH1H2ZAC1lseUZCjMwElbUJ1m9aDltTLKZAUK6Gkywn5CdV3r72fC3Xt9ZCFmI5W1zwVMhBedC5yDqXt2f17wjVjpQzEkJDMuImfZAa9yd4d6YfnpgEZBsQTSGBSX4MLtnoJcRtIuFJFrfsvyDsAHBoR2YZBVmtUZD"

    let token = "EAACEdEose0cBAKSqiNjIME3z2z7Tu8GHEkftm5J61rgjXfNEFh74UjWQMpycImly1gqDN4eBmw8WpYYezKu6joiwuqTZC2QlKXqIevyTyAdJfD0hiQZA2rcLX2c9CXICZAQIRty56ZAMGSpo81q9uyEXR5m0w3ZBZA1S88leUiC5daLWw0TmX5aIb6YrGDtUgZD"

    this.props.login(token)
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
        <Image source={spashImage} style={styles.splash}/>    
                               
        <View style={styles.bottomContainer}>
          <Text style={styles.textLogo}>NOVAME</Text>      

          <View style={styles.socialButtons}>
            <Button full iconLeft style={styles.socialButton} onPress={()=>this.handleLogin('facebook')}>
                <Icon name="facebook" style={styles.socialButtonIcon}/>
                <Text>Login with Facebook</Text>
            </Button>
            <Button info iconLeft style={styles.socialButton} onPress={()=>this.handleLogin('twitter')}>
                <Icon name="twitter" style={styles.socialButtonIcon}/>
                <Text>Login with Twitter</Text>
            </Button>              
          </View>  
          
        </View>

      </Container>
    )
  }
}