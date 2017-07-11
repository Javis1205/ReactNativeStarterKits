import React, { Component } from 'react'
import {
  Button, Container, ListItem, List, Spinner, Right,
  Text, Item, View, Input, Left, Body, Thumbnail, Content
} from 'native-base'
import { TouchableOpacity, ScrollView, RefreshControl } from 'react-native'

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
      refreshing: false,
      onRefreshing: false
    }
  }
  
  componentDidMount() {
    this.componentWillFocus()
  }
  
  componentWillFocus() {
    this.setState({
      refreshing: true
    })
    this.props.getHistory(this.props.token, 1, 50, () => {
      this.props.getProfile(this.props.token)
      this.setState({
        refreshing: false
      })
    })
  }
  
  _onRefresh =() => {
    const {token, getHistory} = this.props
    this.setState({onRefreshing: true})
    
    getHistory(token, 1, 50, ()=>{
      setTimeout(() => {
        this.setState({onRefreshing: false})
      }, 1000)
    })
  }
  
  _renderRow = (item) => {
    return (
      <ListItem style={styles.listItem}>
        <Thumbnail style={styles.thumbnail} source={{ uri: item.user && item.user.avatar }} />
        <Body>
          <Text small style={styles.mb5}>{item.user && item.user.full_name}</Text>
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
    let {profile, history} = this.props
    let listHistory = null
    if (this.state.refreshing) {
      listHistory = <Spinner color={'black'} size="small"/>
    } else {
      listHistory = <Content refreshControl={
                      <RefreshControl
                        refreshing={this.state.onRefreshing}
                        onRefresh={this._onRefresh}
                        tintColor="black"
                        colors={['black']}
                        progressBackgroundColor="white"
                        title={null}/>
                      }>
                      <List removeClippedSubviews={false}
                            dataArray={history.results}
                            renderRow={(item) => this._renderRow(item)} >
                      </List>
                    </Content>
    }
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
          <Text>{profile.full_name}</Text>
          <Text>{profile.location}</Text>
        </View>
        {listHistory}
      </Container>
    )
  }
}