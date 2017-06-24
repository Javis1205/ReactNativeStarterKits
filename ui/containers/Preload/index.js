import React, { Component } from 'react'
import { Image, findNodeHandle } from 'react-native'
import { Container, Spinner, Text } from 'native-base'
import { BlurView } from 'react-native-blur'

import { backgroundImage } from '~/assets'
import material from '~/theme/variables/material'
import styles from './styles'

export default class extends Component {

  constructor(props) {
    super(props)
    this.state = { viewRef: null }
  }

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) })
  }
  
  render(){
    const {message='Please waiting...'} = this.props
    return (
      <Container style={styles.container}>
        
        <Image source={backgroundImage} 
          ref={img => this.backgroundImage = img}
          onLoadEnd={this.imageLoaded.bind(this)}
          style={styles.splash}>
          <Text style={{
            backgroundColor:'transparent',
            color: '#fff',
            fontSize: 28,
          }}>{message}</Text>
          <Spinner color={'#fff'} />
        </Image>
        {this.state.viewRef && <BlurView
            style={{...styles.absolute, opacity: 0.8}}
            viewRef={this.state.viewRef}
            blurType="dark"
            blurAmount={1}
          />
        }        
      </Container>
    )
  }
}