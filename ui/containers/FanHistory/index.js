import React, { Component } from 'react'
import {
  Button, Container, ListItem, List, Spinner,
  Text, Item, View, Input, Left, Body, Thumbnail, Content
} from 'native-base'
import { TouchableOpacity, ScrollView } from 'react-native'

// import Content from '~/ui/components/Content'
import Icon from '~/ui/elements/Icon'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'

import styles from './styles'
import material from '~/theme/variables/material'
const imgAvatar = "https://static.wonderfulunion.net/groundctrl/clients/taylorswift/media/13/06/large.9y7nxie1qli9.jpg"
@connect(null, commonActions)
export default class FanHistory extends Component {

  constructor(props) {
    super(props)
    this.items = [
      {
        thumbnailUrl: imgAvatar,
        name: 'Sing My Song, USA',
        time: '22:00 22/2/2012',
        point: 1300
      },
      {
        thumbnailUrl: imgAvatar,
        name: 'Sing My Song, USA',
        time: '22:00 22/2/2012',
        point: 1400
      },
      {
        thumbnailUrl: imgAvatar,
        name: 'Sing My Song, USA',
        time: '22:00 22/2/2012',
        point: 1500
      }
    ]

  }
  _renderRow = (item) => {
    return (
      <ListItem style={styles.listItem}>
        <Thumbnail style={styles.thumbnail} source={{ uri: item.thumbnailUrl }} />
        <Body>
          <Text small style={styles.mb5}>{item.name}</Text>
          <View style={{...styles.rowListItem, ...styles.mb5}} >
            <Icon name='calendar' style={styles.icon} />
            <Text small>{item.time}</Text>
          </View>
          <Text style={styles.mb5} small>{item.point} points</Text>
        </Body>
      </ListItem>
    )
  }
  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.infoRow}>
          <View style={styles.row}>
            <Icon name='favorite-border' style={styles.iconInfo} />
            <Text style={styles.textInfo}>8888 LP</Text>
          </View>
          <View style={styles.row}>
            <Icon name='gift' style={styles.iconInfo} />
            <Text style={styles.textInfo}>25 Products</Text>
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
          <Text>Nguyen Manh Thang</Text>
          <Text>Boston, US</Text>
        </View>
        <Content>
          <List dataArray={this.items}
            renderRow={(item) => this._renderRow(item)} >
          </List>
        </Content>


      </Container>
    )
  }
}