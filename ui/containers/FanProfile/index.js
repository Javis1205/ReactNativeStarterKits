import React, { Component } from 'react'
import {
  Button, Container, ListItem, List, Spinner,
  Text, Item, View, Input, Left, Body, Thumbnail, Content, Grid, Col, Row
} from 'native-base'
import { TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'

// import Content from '~/ui/components/Content'
import Icon from '~/ui/elements/Icon'
import { connect } from 'react-redux'
import PopupPhotoView from '~/ui/components/PopupPhotoView'
import styles from './styles'
import material from '~/theme/variables/material'

const imgAvatar = "https://static.wonderfulunion.net/groundctrl/clients/taylorswift/media/13/06/large.9y7nxie1qli9.jpg"

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
  
  _renderGrid = (items, numColumn) => {
    let numRow = Math.ceil(items.length / numColumn)
    let itemRows = []
    let rowArr = []
    const itemWidth = (material.deviceWidth-20)/3
    for (let i = 0; i < items.length; i++) {
      // Start Of Row
      if (i % numColumn == 0) {
        itemRows = []
      }
      if (i < items.length) {
        itemRows.push(<View style={{...styles.gridItem, width: itemWidth}} key={i}>
          <View>
            <Image style={styles.thumbnail} source={{ uri: items[i].avatar }} />
          </View>
          <Text style={{fontSize: 14}}>{items[i].username}</Text>
          <View style={{flexDirection: 'row'}}>
            <Grid>
              <Col style={{alignItems: 'flex-end'}}>
                <Icon name='star' style={styles.icon} />
              </Col>
              <Col>
                <Text bold style={{marginLeft: 2}}>{items[i].fan_count}</Text>
              </Col>
            </Grid>
          </View>
        </View>)
      }else{
        itemRows.push(<View style={{...styles.viewHolder, width: itemWidth}} key={i}></View>)
      }

      // End Of Row
      if (i % numColumn == numColumn - 1 && i != items.length) {
        rowArr.push(<View style={styles.row} key={i}>{itemRows}</View>)
      }
      // Last Row
      if (i == items.length - 1) {
        rowArr.push(<View style={styles.lastRow} key={i}>{itemRows}</View>)
      }
    }
    return (
      <View>
        {rowArr}
      </View>
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
        <View style={styles.rowPadding}>
          <View style={styles.row}>
            <TouchableWithoutFeedback onPress={() => {
              this.refs.popupPhotoView.setImage(this.props.profile.avatar)
            }}>
              <Thumbnail style={styles.thumbnail} source={{ uri: this.props.profile.avatar }} />
            </TouchableWithoutFeedback>
            <View style={{marginLeft: 10}}>
              <Text small style={{...styles.mb5, fontWeight: 'bold'}}>{this.props.profile.username}</Text>
              <Text small style={styles.mb5}>{this.props.profile.favorite || 'Favorite'}</Text>
              <View style={{ ...styles.row, ...styles.mb5, justifyContent: 'flex-start' }}>
                <Icon name='room' style={styles.icon} />
                <Text small>{this.props.profile.location || 'Location'}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.rowPadding}>
          <View style={styles.row2}>
            <View>
              <Text style={styles.infoNumber}>{this.state.following}</Text>
              <Text small bold>Following</Text>
            </View>
            <Icon name='userDefault' style={styles.iconInfo} />
          </View>
          <View style={styles.row2}>
            <View>
              <Text style={styles.infoNumber}>8888</Text>
              <Text small bold>LP</Text>
            </View>
            <Icon name='favorite-border' style={styles.iconInfo} />
          </View>
          <View style={styles.row2}>
            <View>
              <Text style={styles.infoNumber}>8888</Text>
              <Text small bold>Reward</Text>
            </View>
            <Icon name='trophy' style={styles.iconInfo} />
          </View>
        </View>
        <Content padder>
          {this._renderGrid(this.props.listCeleb, 3)}
        </Content>
      </Container>
    )
  }
}