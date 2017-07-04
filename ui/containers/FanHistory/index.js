import React, { Component } from 'react'
import {
  Button, Container, ListItem, List, Spinner, Right,
  Text, Item, View, Input, Left, Body, Thumbnail, Content
} from 'native-base'
import { TouchableOpacity, ScrollView } from 'react-native'

// import Content from '~/ui/components/Content'
import Icon from '~/ui/elements/Icon'
import Preload from '~/ui/containers/Preload'
import { connect } from 'react-redux'
import moment from 'moment'

import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'
import * as accountSelectors from '~/store/selectors/account'
import * as accountActions from '~/store/actions/account'

import styles from './styles'
import material from '~/theme/variables/material'
const imgAvatar = "https://static.wonderfulunion.net/groundctrl/clients/taylorswift/media/13/06/large.9y7nxie1qli9.jpg"
@connect(state=>({
  token: authSelectors.getToken(state),
  profile: accountSelectors.getProfile(state),
  history: accountSelectors.getHistory(state)
}), {...commonActions, ...accountActions})
export default class FanHistory extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false
    }
  }
  
  componentDidMount() {
    this.setState({
      refreshing: true
    })
    this.props.getHistory(this.props.token, 1, 50, () => {
      this.setState({
        refreshing: false
      })
    })
  }
  
  _renderRow = (item) => {
    console.log(item)
    return (
      <ListItem style={styles.listItem}>
        <Thumbnail style={styles.thumbnail} source={{ uri: item.user && item.user.avatar }} />
        <Body>
          <Text small style={styles.mb5}>{item.user && item.user.username}</Text>
          <Text style={styles.mb5} small>{item.loyal_point} points</Text>
        </Body>
        
          <View style={{...styles.rowListItem, ...styles.mb5}} >
            <Icon name='calendar' style={{...styles.icon, fontSize: 24}} />
            <View style={{flexDirection: 'column'}}>
              <Text small style={{fontSize:10}}>{moment(item.active_date).format("HH:mm")}</Text>
              <Text small style={{fontSize:10}}>{moment(item.active_date).format("DD/MM/YYYY")}</Text>
            </View>
          </View>
        
      </ListItem>
    )
  }
  render() {
    if (this.state.refreshing) {
      return (
        <Preload message=""/>
      )
    }
    let {profile, history} = this.props
    return (
      <Container style={styles.container}>
        <View style={styles.infoRow}>
          <View style={styles.row}>
            <Icon name='favorite-border' style={styles.iconInfo} />
            <Text style={styles.textInfo}>{profile.loyal_points} LP</Text>
          </View>
          <View style={styles.row}>
            <Icon name='gift' style={styles.iconInfo} />
            <Text style={styles.textInfo}>{history.count} Products</Text>
          </View>
        </View>
        <View style={styles.rowPadding}>
          <View style={styles.row}>
            <Icon name='userDefault' style={styles.icon} />
            <Text>Username</Text>
          </View>
          <View style={styles.row}>
            <Icon name='room' style={styles.icon} />
            <Text>Address</Text>
          </View>
        </View>
        <View style={styles.rowPadding}>
          <Text>{profile.username}</Text>
          <Text>{profile.location}</Text>
        </View>
        <Content>
          <List removeClippedSubviews={false} 
            dataArray={history.results}
            renderRow={(item) => this._renderRow(item)} >
          </List>
        </Content>


      </Container>
    )
  }
}