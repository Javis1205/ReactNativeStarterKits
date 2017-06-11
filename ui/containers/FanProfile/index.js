import React, { Component } from 'react'
import {
  Button, Container, ListItem, List, Spinner,
  Text, Item, View, Input, Left, Body, Thumbnail, Content
} from 'native-base'
import { TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'

// import Content from '~/ui/components/Content'
import Icon from '~/ui/elements/Icon'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import PopupPhotoView from '~/ui/components/PopupPhotoView'
import styles from './styles'
import material from '~/theme/variables/material'
const imgAvatar = "https://static.wonderfulunion.net/groundctrl/clients/taylorswift/media/13/06/large.9y7nxie1qli9.jpg"
@connect(null, commonActions)
export default class FanHistory extends Component {

  constructor(props) {
    super(props)
    this.items = [
      {
        imgAvatar: imgAvatar,
        name: 'Taylor Swift 1',
        number: 888
      },
      {
        imgAvatar: imgAvatar,
        name: 'Taylor Swift 2',
        number: 777
      },
      {
        imgAvatar: imgAvatar,
        name: 'Taylor Swift 3',
        number: 666
      },
      {
        imgAvatar: imgAvatar,
        name: 'Taylor Swift 4',
        number: 666
      },
      {
        imgAvatar: imgAvatar,
        name: 'Taylor Swift 5',
        number: 777
      },
      // {
      //   imgAvatar: imgAvatar,
      //   name: 'Taylor Swift 7',
      //   number: 777
      // },
    ]
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
          <Thumbnail style={styles.thumbnail} source={{ uri: items[i].imgAvatar }} />
          <Text>{items[i].name}</Text>
          <View style={styles.row2}>
            <Icon name='star' style={styles.icon} />
            <Text bold>{items[i].number}</Text>
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
        rowArr.push(<View style={styles.lastRow}>{itemRows}</View>)
      }
    }
    return (
      <View>
        {rowArr}
      </View>
    )
  }
  render() {
    return (
      <Container style={styles.container}>
        <PopupPhotoView ref='popupPhotoView' />
        <View style={styles.rowPadding}>
          <View style={styles.row}>
            <TouchableWithoutFeedback onPress={() => {
              this.refs.popupPhotoView.setImage(imgAvatar)
            }}>
              <Thumbnail style={styles.thumbnail} source={{ uri: imgAvatar }} />
            </TouchableWithoutFeedback>
            <View>
              <Text small style={styles.mb5}>Anna Anna</Text>
              <Text small style={styles.mb5}>Music,Sport</Text>
              <View style={{ ...styles.row, ...styles.mb5 }}>
                <Icon name='room' style={styles.icon} />
                <Text small>Bostom, US </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.rowPadding}>
          <View style={styles.row2}>
            <View>
              <Text style={styles.infoNumber}>8</Text>
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
          {this._renderGrid(this.items, 3)}
        </Content>
      </Container>
    )
  }
}