import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,
  Container, Header, Title, Content, Button,
  Card, CardItem, Text, Thumbnail, Left, Right, Body, 
} from 'native-base'
import { API_BASE } from '~/store/constants/api'
// import * as accountSelectors from '~/store/selectors/account'
import moment from 'moment'
import CacheableImage from '~/ui/components/CacheableImage'
import RegitButton from '~/ui/elements/RegitButton'
import Icon from '~/ui/elements/Icon'
import styles from './styles'


export default class extends Component {

  render() {
    const {feed} = this.props
    const starAvatar = {uri: feed.starAvatar}
    const eventImg = {uri: feed.eventImg}
  
    return (      
        <Card style={styles.container}>
          
          <CardItem bordered style={styles.avatarContainer}>
            <Left>
                <CacheableImage style={styles.avatar} source={starAvatar} />
                <Body>
                    <Text>{feed.starName}</Text>
                    <Text note>{feed.date}</Text>
                </Body>
            </Left>            
          </CardItem>          
          <CardItem cardBody>
            <CacheableImage style={styles.image} source={eventImg} />
          </CardItem>                        
       </Card>       
    )
  }
}