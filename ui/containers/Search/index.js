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
      refreshingJob: true,
      loadingMore: false,
      page: 1,
      jobId: 0,
      searchType: 'name'
    }
  }
  
  componentDidMount() {
    this.setState({
      refreshing: true,
      refreshingJob: true,
    })
    this.props.getJob(this.props.token, 1, 50, (error, data) => {
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
      refreshingCeleb: true,
      searchType: 'name',
      page: 1
    })
    this.props.searchProfile(this.props.token, this.state.searchText, null, 1, 10, (error, data) => {
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
  
  _onEndReachedCeleb() {
    console.log("onEndReachedCeleb")
    if (this.state.loadingMore) {
      return;
    }
    this.setState({
      loadingMore: true
    })
    this.setState({
      page: this.state.page + 1
    }, () => {
      console.log(this.state.page)
      if (this.state.searchType == 'name') {
        this.props.searchProfile(this.props.token, this.state.searchText, null, this.state.page, 10, (error, data) => {
          this.setState({
            loadingMore: false
          })
        })
      } else {
        this.props.searchProfile(this.props.token, null, 1, this.state.page, 10, (error, data) => {
          this.setState({
            loadingMore: false
          })
        })
      }
    })
  }
  
  onPressJobItem(jobId) {
    this.setState({
      jobId: jobId,
      refreshingCeleb: true,
      searchType: 'job',
      page: 1
    })
    this.props.searchProfile(this.props.token, null, jobId, 1, 10, (error, data) =>{
      this.setState({
        refreshingCeleb: false
      })
    })
  }
  
  renderCelebItem(rowData, sectionID, rowID, highlightRow) {
    return(
      <ListItem
        onPress={this.onUserPress.bind(this, rowData.id)}
        style={{
          ...styles.listItemContainer, 
          width: width/3, 
          paddingLeft: 5, 
          paddingRight: 5
        }}>
        <View style={styles.celebItem}>
          <Thumbnail source={{ uri: rowData.avatar }} style={styles.resultThumbnail} />
          <Text style={{alignSelf: 'center', fontSize: 12}}>{rowData.username}</Text>
          <View style={styles.row}>
            <Icon small name='star' />
            <Text note small>888</Text>
          </View>
        </View>
      </ListItem>
    )
  }
  
  renderListCeleb() {
    return(
      <List
        renderFooter={() => {
              return(
                <View>
                  {this.state.loadingMore && <Spinner color='#fff' />}
                </View>
              )
            }
          }
        onEndReached={this._onEndReachedCeleb.bind(this)}
        onEndReachedThreshold={50}
        removeClippedSubviews={false}
        style={{flex: 1}}
        contentContainerStyle={{alignItems:'flex-start', flexDirection: 'row', flexWrap: 'wrap'}}
        pageSize={4}
        renderRow={this.renderCelebItem.bind(this)}
        dataArray={this.props.searchedProfile}/>
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
    if (!this.state.refreshingCeleb) {
      listCeleb = this.renderListCeleb()
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
          <ScrollView
            horizontal={true}
            style={styles.categoryContainer}>
            {
              this.props.jobList && this.props.jobList.map((rowData, index) => {
                let backgroundColor = (rowData.id == this.state.jobId) ? '#FF96C7' : 'black'
                return(
                  <ListItem
                  key={index}
                  onPress={this.onPressJobItem.bind(this, rowData.id)}
                  style={{...styles.listItemContainer, width: width/4}}>
                    <View style={styles.item}>
                      <View style={{...styles.iconContainer, backgroundColor}}>
                        <Icon name='actor' style={styles.icon} />
                      </View>
                      <Text small>{rowData.name}</Text>
                    </View>
                  </ListItem>
                )
              })
            }
          </ScrollView>
  
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