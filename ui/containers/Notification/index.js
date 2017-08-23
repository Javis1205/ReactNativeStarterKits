import React, { Component } from 'react'
import {                 
    Button, Container, ListItem, List, Spinner,
    Text, Item, View, Input, Left, Body,
} from 'native-base'
import {Image, RefreshControl} from 'react-native'
import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import * as notificationActions from '~/store/actions/notification'

import Icon from '~/ui/elements/Icon'
import TimeAgo from '~/ui/components/TimeAgo'
import * as commonSelectors from '~/store/selectors/common'
import * as authSelectors from '~/store/selectors/auth'
import * as notificationSelectors from '~/store/selectors/notification'
import options from './options'
import styles from './styles'
import material from '~/theme/variables/material'

import { getTextParts } from '~/ui/shared/utils'

@connect(state=>({
  token: authSelectors.getToken(state),
  notifications: notificationSelectors.getNotification(state),
}), {...commonActions, ...notificationActions})
export default class extends Component {

  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
      loading: false,
    }    
  }

  componentWillFocus(){
    
  }

  componentDidMount(){
    this.componentWillFocus()
  }

  _onRefresh =() => {    
      
  }    

  _loadMore = ()=>{
       
  }
  
  _onEventPress(id) {
    this.props.forwardTo('eventDetail', {id})
  }
  
  renderRow(item) {
    console.log(item)
    return (
      <ListItem
        onPress={this._onEventPress.bind(this, item.news_id)}
        noBorder style={styles.listItemContainer}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: item.celebrity_avatar}} style={{height: 65, width: 65, borderRadius: 3}}/>
          <View style={{flexDirection: 'column', paddingLeft: 10, justifyContent: 'space-between', paddingRight: 10}}>
            <View style={{flexDirection: 'row', paddingTop: 10, alignItems: 'flex-end'}}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>{item.celebrity_name}</Text>
              <Text style={{color: 'gray', fontSize: 12, marginBottom: 0.5}}> created an event </Text>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>{item.news_title}</Text>
            </View>
            <TimeAgo note small time={item.dateTime} />
          </View>
        </View>
      </ListItem>
    )
  }

  render() {
    // we store the page so we must not set removeClippedSubviews to true, sometime it is for tab too
    const {notifications} = this.props
    
    return (          
       
        <Container>
                    
            <Content
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
                  tintColor="black"
                  colors={['black']}
                  progressBackgroundColor="white"
                  title={null}
                />
              }
              onEndReached={this._loadMore}
              style={styles.container}>
              {/*notifications &&*/
                <List
                  removeClippedSubviews={false}                    
                  //pageSize={notifications.take}
                  dataArray={this.props.notifications}
                  renderRow={this.renderRow.bind(this)} />
              } 

              {this.state.loading && <Spinner/>}

            </Content>
            
            
        </Container>
      
    )
  }
}