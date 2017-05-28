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
    const avatar = {uri: API_BASE + feed.BusinessImageUrl}
    const cardImage = {uri: API_BASE + feed.Image}

    return (      
        <Card style={styles.container}>
          
          <CardItem bordered style={styles.avatarContainer}>
            <Left>
                <CacheableImage style={styles.avatar} source={avatar} />
                <Body>
                    <Text>{feed.BusinessName}</Text>
                    <Text note>{moment(feed.SpendEffectDate).format('DD MMM YYYY')}</Text>
                </Body>
            </Left>            
          </CardItem>          
          <CardItem cardBody>
            <CacheableImage style={styles.image} source={cardImage} />
          </CardItem>                        
       </Card>       
    )
  }
}