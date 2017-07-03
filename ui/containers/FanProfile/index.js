import React, { Component } from 'react'
import {
  Button, Container, ListItem, List, Spinner, Right,
  Text, Item, View, Input, Left, Body, Thumbnail, Content, Grid, Col, Row
} from 'native-base'
import { TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'

// import Content from '~/ui/components/Content'
import Icon from '~/ui/elements/Icon'
import { connect } from 'react-redux'
import PopupPhotoView from '~/ui/components/PopupPhotoView'
import styles from './styles'
import material from '~/theme/variables/material'
import ProfileHeader from '~/ui/components/ProfileHeader'


import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'
import * as accountActions from '~/store/actions/account'
import * as accountSelectors from '~/store/selectors/account'

@connect(state=>({
  token: authSelectors.getToken(state),
  profile: accountSelectors.getProfile(state),
  listCeleb: accountSelectors.getlistFollowedCeleb(state)
}), { ...commonActions, ...accountActions})

export default class FanProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      following: 0
    }
  }
  
  componentDidMount() {
    this.componentWillFocus()
  }
  
  componentWillFocus() {
    this.props.getListFollowedCelebrity(this.props.token, 1, 10, (error, data) => {
      this.setState({
        refreshing: false,
        following: data.count
      })
    })
  }
  
  renderRow(rowData, sectionID, rowID, highlightRow) {
    return(
      <ListItem style={styles.listItemContainer}>
        <Image style={styles.thumbnail} source={{uri: rowData.avatar}} />
        <View style={{marginLeft:5}}>
          <Text>{rowData.username}</Text>
          <Text>{rowData.location || 'Location'}</Text>
        </View>
        <Right>
          <View row>
          <Icon name='star' style={styles.icon} />
          <Text>{rowData.fan_count}</Text>
          </View>
        </Right>
      </ListItem>
    )
  }
  
  render() {
    if (this.state.refreshing) {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner color={"black"}/>
        </View>
      )
    }
    return (
      <Container style={styles.container}>
        <PopupPhotoView ref='popupPhotoView' />
        <Content>
          <ProfileHeader user={this.props.profile}>
            <View style={{alignItems: 'center', paddingBottom: 30}}>
              <Text style={{color: 'white'}}>{this.props.profile.username || 'Username'}</Text>
              <Text small style={{color: 'white', marginTop: 10}}>{this.props.profile.favorite || 'Favorite'}</Text>
              <Text small style={{color: 'white', marginTop: 10}}>{this.props.profile.location || 'Location'}</Text>
            </View>
          </ProfileHeader>
          <Content padder>
            <View style={styles.rowPadding}>
              <View style={{...styles.row2, borderRightWidth: 1, borderColor: '#ccc'}}>
                <View>
                  <Text style={styles.infoNumber}>{this.state.following}</Text>
                  <Text style={styles.infoText}>Following</Text>
                </View>
              </View>
              <View style={{...styles.row2, borderRightWidth: 1, borderColor: '#ccc'}}>
                <View>
                  <Text style={styles.infoNumber}>{this.props.profile.loyal_points}</Text>
                  <Text style={styles.infoText}>LP</Text>
                </View>
              </View>
              <View style={styles.row2}>
                <View>
                  <Text style={styles.infoNumber}>0</Text>
                  <Text style={styles.infoText}>Reward</Text>
                </View>
              </View>
            </View>
            <View style={{height: 1, width: '100%', backgroundColor: '#ccc'}}/>
          </Content>
          <List
            renderRow={this.renderRow.bind(this)}
            dataArray={this.props.listCeleb}/>
        </Content>
      </Container>
    )
  }
}