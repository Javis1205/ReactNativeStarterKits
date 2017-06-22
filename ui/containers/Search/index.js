import React, { Component } from 'react'
import {
  Button, Container, ListItem, List, Spinner,
  Text, Item, View, Input, Left, Body, Thumbnail, Content, Header, Right
} from 'native-base'
import { TouchableOpacity, ScrollView , Dimensions, ListView} from 'react-native'

// import Content from '~/ui/components/Content'
import Icon from '~/ui/elements/Icon'
import { connect } from 'react-redux'

import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'
import * as jobSelectors from '~/store/selectors/job'
import * as jobActions from '~/store/actions/job'
import * as accountActions from '~/store/actions/account'
import * as accountSelectors from '~/store/selectors/account'

import options from './options'
import styles from './styles'
import material from '~/theme/variables/material'

const {height, width} = Dimensions.get('window')

@connect(state=>({
  token: authSelectors.getToken(state),
  jobList: jobSelectors.getJob(state),
  searchedProfile: accountSelectors.getSearchedProfile(state)
}), {...commonActions, ...jobActions, ...accountActions})

export default class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      refreshingCeleb: false,
      searchText: '',
      celebList: [
        {},
        {}, {}, {}, {}, {}
      ],
      refreshingJob: true
    }
  }
  
  componentDidMount() {
    this.setState({
      refreshing: true,
      refreshingJob: true,
    })
    this.props.getJob(this.props.token, 1, 4, (error, data) => {
      this._onPressSearch()
      this.setState({
        refreshing: false,
        refreshingJob: false,
      })
    })
    this.componentWillFocus()
  }
  
  componentWillFocus(){
    
  }
  
  _leftClick = (e) => {
    const { goBack } = this.props
    goBack()
  }
  
  _search = (value, force = false) => {
    this.setState({
      searchText: value
    })
    //this.props.searchProfile(this.props.token, value)
  }
  
  _onPressSearch = () => {
    this.setState({
      refreshingCeleb: true
    })
    this.props.searchProfile(this.props.token, this.state.searchText, null, (error, data) => {
      console.log(data)
      this.setState({
        celebList: data.results,
        refreshingCeleb: false
      })
    })
  }
  
  onUserPress(userId) {
    this.props.forwardTo('userProfile/' + userId)
  }
  
  renderJobItem(rowData, sectionID, rowID, highlightRow) {
    return(
      <ListItem style={{...styles.listItemContainer, width: width/4}}>
        <View style={styles.item}>
          <View style={styles.iconContainer}>
            <Icon name='actor' style={styles.icon} />
          </View>
          <Text small>{rowData.name}</Text>
        </View>
      </ListItem>
    )
  }
  
  renderCelebItem(rowData, sectionID, rowID, highlightRow) {
    return(
      <ListItem
        onPress={this.onUserPress.bind(this, rowData.id)}
        style={{...styles.listItemContainer, width: width/4, paddingLeft: 5, paddingRight: 5}}>
        <View style={styles.celebItem}>
          <Thumbnail source={{ uri: rowData.avatar }} style={styles.resultThumbnail} />
          <Text style={{alignSelf: 'center', fontSize: 12}}>{rowData.username}</Text>
          <View style={styles.row}><Icon name='star' /><Text small>888</Text></View>
        </View>
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
    
    let listCeleb = null
    console.log(this.state.refreshingCeleb)
    if (!this.state.refreshingCeleb) {
      listCeleb = <List
                    removeClippedSubviews={false}
                    style={{width:'100%'}}
                    contentContainerStyle={{alignItems:'flex-start', flexDirection: 'row', flexWrap: 'wrap'}}
                    pageSize={4}
                    renderRow={this.renderCelebItem.bind(this)}
                    dataArray={this.props.searchedProfile}/>
    } else {
      listCeleb = <View style={{...styles.spinnerContainer, marginTop: 30}}>
                    <Spinner color={"black"}/>
                  </View>
    }
    
    return (
      <Container style={styles.container}>
        <Header noShadow style={styles.container}>
          <Left style={{flex: 0.5}}>
            <Button transparent onPress={this._leftClick}>
              <Icon style={styles.menuIcon} name={'keyboard-arrow-left'} />
            </Button>
          </Left>
          <Body style={{flex: 1,}}>
            <Item style={styles.searchContainer}>
              {/*<Icon name="search" style={styles.searchIcon} />*/}
              <Input value={this.state.searchText}
                     autoCorrect={false} onChangeText={this._search}
                     placeholderTextColor="#222" style={styles.searchInput}
                     placeholder="Novame Search" />
            </Item>
          </Body>
          <Right style={{}}>
            <Button
              onPress={this._onPressSearch.bind(this)}
              transparent>
              <Icon style={styles.searchIcon} name="search" />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={styles.categoryContainer}>
            <List
              removeClippedSubviews={false}
              contentContainerStyle={{justifyContent: 'space-between'}}
              horizontal={true}
              renderRow={this.renderJobItem.bind(this)}
              dataArray={this.props.jobList}/>
          </View>
  
          <View style={styles.suggestBlock}>
            <Text bold style={{marginLeft: 20, marginBottom: 20}}>Suggestion</Text>
            <View style={{flex: 1}}>
              {listCeleb}
            </View>
          </View>
        </Content>

      </Container>
    )
  }
}