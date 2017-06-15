import React, { Component } from 'react'
import {
  Button, Container, ListItem, List, Spinner,
  Text, Item, View, Input, Left, Body, Thumbnail, Content
} from 'native-base'
import { TouchableOpacity, ScrollView , Dimensions} from 'react-native'

// import Content from '~/ui/components/Content'
import Icon from '~/ui/elements/Icon'
import { connect } from 'react-redux'

import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'
import * as jobSelectors from '~/store/selectors/job'
import * as jobActions from '~/store/actions/job'
import styles from './styles'
import material from '~/theme/variables/material'

const {height, width} = Dimensions.get('window')

const imgAvatar = "https://static.wonderfulunion.net/groundctrl/clients/taylorswift/media/13/06/large.9y7nxie1qli9.jpg"

@connect(state=>({
  token: authSelectors.getToken(state),
  jobList: jobSelectors.getJob(state)
}), {...commonActions, ...jobActions})

export default class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      refreshingCeleb: false
    }
  }
  
  componentDidMount() {
    this.componentWillFocus()
  }
  
  componentWillFocus(){
    this.setState({
      refreshing: true
    })
    this.props.getJob(this.props.token, 1, 4, (error, data) => {
      this.setState({
        refreshing: false
      })
    })
  }
  
  renderJobItem(rowData, sectionID, rowID, highlightRow) {
    console.log(rowData)
    return(
      <ListItem style={{...styles.listItemContainer, width: width/4}}>
        <TouchableOpacity>
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <Icon name='actor' style={styles.icon} />
            </View>
            <Text small>{rowData.name}</Text>
          </View>
        </TouchableOpacity>
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

        <View style={styles.categoryContainer}>
          <List
            contentContainerStyle={{justifyContent: 'space-between'}}
            horizontal={true}
            renderRow={this.renderJobItem.bind(this)}
            dataArray={this.props.jobList}/>
        </View>

        <View style={styles.suggestBlock}>
          <Text bold>Suggestion</Text>
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