import React, { Component } from 'react'
// import { Image, findNodeHandle } from 'react-native'
import { Container, Spinner, Text } from 'native-base'
// import { BlurView } from 'react-native-blur'

// import { backgroundImage } from '~/assets'
import material from '~/theme/variables/material'
import styles from './styles'

export default class extends Component {

  // constructor(props) {
  //   super(props)
  //   this.state = { viewRef: null }
  // }

  // imageLoaded() {
  //   this.setState({ viewRef: findNodeHandle(this.backgroundImage) })
  // }
  
  render(){
    const {message='Please waiting...'} = this.props
    return (
      <Container style={styles.container}>
        
        
          <Text style={{
            backgroundColor:'transparent',
            color: '#222',            
          }}>{message}</Text>
          <Spinner color={'#222'} />
          
      </Container>
    )
  }
}