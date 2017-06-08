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
export default class extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return (
      <Container style={styles.container}>

        <View style={styles.categoryContainer}>
          <TouchableOpacity>
            <View style={styles.item}>
              <View style={{ ...styles.iconContainer, backgroundColor: material.blue400 }}>
                <Icon name='music' style={styles.icon} />
              </View>
              <Text small>Music</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.item}>
              <View style={styles.iconContainer}>
                <Icon name='actor' style={styles.icon} />
              </View>
              <Text small>Actor</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.item}>
              <View style={styles.iconContainer}>
                <Icon name='model' style={styles.icon} />
              </View>
              <Text small>Model</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.item}>
              <View style={styles.iconContainer}>
                <Icon name='sport' style={styles.icon} />
              </View>
              <Text small>Sport</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.suggestBlock}>
          <Text bold>Sugguestion</Text>
          <ScrollView>
            <View style={styles.suggestSubBlock}>

              <View style={styles.rowResult}>
                <TouchableOpacity>
                  <View style={styles.item}>
                    <Thumbnail source={{ uri: imgAvatar }} style={styles.resultThumbnail} />
                    <Text>Taylor Swift</Text>
                    <View style={styles.row}><Icon name='star' /><Text small>888</Text></View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.item}>
                    <Thumbnail source={{ uri: imgAvatar }} style={styles.resultThumbnail} />
                    <Text>Taylor Swift</Text>
                    <View style={styles.row}><Icon name='star' /><Text small>888</Text></View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.item}>
                    <Thumbnail source={{ uri: imgAvatar }} style={styles.resultThumbnail} />
                    <Text>Taylor Swift</Text>
                    <View style={styles.row}><Icon name='star' /><Text small>888</Text></View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.rowResult}>
                <TouchableOpacity>
                  <View style={styles.item}>
                    <Thumbnail source={{ uri: imgAvatar }} style={styles.resultThumbnail} />
                    <Text>Taylor Swift</Text>
                    <View style={styles.row}><Icon name='star' /><Text small>888</Text></View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.item}>
                    <Thumbnail source={{ uri: imgAvatar }} style={styles.resultThumbnail} />
                    <Text>Taylor Swift</Text>
                    <View style={styles.row}><Icon name='star' /><Text small>888</Text></View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>


          </ScrollView>
        </View>

      </Container>
    )
  }
}