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
  renderRow(rowData, sectionID, rowID, highlightRow) {
    console.log(rowData)
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
                  <Text style={styles.infoNumber}>8888</Text>
                  <Text style={styles.infoText}>LP</Text>
                </View>
              </View>
              <View style={styles.row2}>
                <View>
                  <Text style={styles.infoNumber}>8888</Text>
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