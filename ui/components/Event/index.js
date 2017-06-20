import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View,
  Container, Header, Title, Content, Button, Grid, Row, Col,
  Card, CardItem, Text, Thumbnail, Left, Right, Body
} from 'native-base'
import { Image } from 'react-native'
import Geocoder from 'react-native-geocoder'
import { API_BASE } from '~/store/constants/api'
// import * as accountSelectors from '~/store/selectors/account'
import moment from 'moment'
import CacheableImage from '~/ui/components/CacheableImage'
import RegitButton from '~/ui/elements/RegitButton'
import Icon from '~/ui/elements/Icon'
import styles from './styles'

const Background = ({feed, children}) => {
  if (feed.images && feed.images.length) {
    let imgEventUri = API_BASE + '/i/0x0/' + feed.images[0].image.url
    const eventImg = {uri: imgEventUri}
    return ( 
      <View cardBody>
        <CacheableImage                              
          style={styles.image}
          source={eventImg}>
          {children}
        </CacheableImage>
      </View>
    )
  }

  return (
    <View cardBody>
      {children}
    </View>
  )
}


export default class extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      location: ''
    }
  }

  render() {
    const {feed} = this.props
    let starAvatar = null
    fbAvatar = feed.celebrity.avatar
    starAvatar = {uri: fbAvatar}    
    
    let fromTime = moment(feed.start_time).format("HH:mm")
    let toTime = moment(feed.finish_time).format("HH:mm")
    let date = moment(feed.finish_time).format("DD/MM/YY")
    return (
        <View style={styles.container}>

          

          <View style={{              
              padding: 8,
              backgroundColor: '#fefefe',
              borderColor: '#ccc',
              borderBottomWidth: 0.5,
              justifyContent:'space-between',  
            }}>
              
                                             
              <Text style={styles.bigText}>{'Created an event: ' + feed.title}</Text>              
              <View row style={{
                marginTop: 4,
              }}>
                <Icon name='location' small style={{
                  marginRight: 4,                  
                }}/>  
                <Text note style={styles.detailText}>{feed.location}</Text>
              </View>
            </View>

          <Background feed={feed}></Background>
          
          <View style={styles.avatarContainer}>
            

            <View style={{
              flexDirection: 'row', 
              justifyContent:'space-between',  
              padding: 8,                  
              width: '100%',
            }}>

              <View style={{flexDirection: 'row'}}>
                <Image style={styles.avatar} source={starAvatar} />

                <View style={{        
                  marginLeft: 8,     
                  height: 30,     
                  alignSelf: 'center',
                  justifyContent: 'space-around'
                }}>
                  
                    <Text
                      onLongPress={this.props.onUserPress}
                      style={styles.starNameText}>{feed.celebrity.username}</Text>                            
                    
                    <Text note style={styles.detailText}>{fromTime + ' - ' + toTime + '   ' + date}</Text>                                    

                </View>

              </View>
            

              

              <View style={{                
                flexDirection: 'row',                
                justifyContent: 'flex-end',
              }}>
                <View style={{justifyContent: 'center', width: 22}}>
                  <Icon name='favorite-border' style={styles.icon}/>
                </View>
                <View style={{width: '20%', justifyContent: 'center'}}>
                  <Text style={styles.detailText}>2K</Text>
                </View>
                <View style={{justifyContent: 'center', width: 22}}>
                  <Icon name='share' style={styles.icon}/>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.detailText}>3K</Text>
                </View>
              </View>

            </View>


          </View>


          


       </View>
    )
  }
}