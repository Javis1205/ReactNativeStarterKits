import React, { Component } from 'react'
import {                 
    Button,
    Container,
    Text,    
    Item,
    View,
    Input,
    List,
    ListItem,
    Fab,
    Spinner
} from 'native-base'

import {Dimensions, Image, RefreshControl} from 'react-native'

import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'
import * as commonSelectors from '~/store/selectors/common'
import * as campaignSelectors from '~/store/selectors/campaign'
import * as campaignActions from '~/store/actions/campaign'
import * as accountSelectors from '~/store/selectors/account'

import Event from '~/ui/components/Event'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './styles'

@connect(state=>({  
  token: authSelectors.getToken(state),
  celebrity_id: accountSelectors.getCelebrityId(state),
  activeCampaign: campaignSelectors.getActiveCampaign(state),
  profile: accountSelectors.getProfile(state)
}), {...campaignActions, ...commonActions})

export default class extends Component {

  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
      emptyHome: false,
      fabActive: false,
      loadingMore: false,
      page: 1,
    }    
  }

  componentWillMount(){
    this.componentWillFocus()
  }

  componentWillFocus(){
    const {token, activeCampaign, getActiveCampaign, celebrity_id} = this.props
    if (!activeCampaign.results) {
      this.setState({
        refreshing: true,
      })
      getActiveCampaign(token, 1, 10, () => {
        this.setState({
          refreshing: false,
        }, () => {
          (this.props.activeCampaign.results.length == 0) ? this.setState({emptyHome: true}) : this.setState({emptyHome: false})
        })
      })
    } else if (this.props.activeCampaign.results.length == 0) {
      this.setState({
        emptyHome: true
      })
    } else {
      this.setState({
        emptyHome: false
      })
    }
  
  }

  _onRefresh =() => {
    const {token, activeCampaign, getActiveCampaign, celebrity_id} = this.props
    this.setState({refreshing: true})

    getActiveCampaign(token, 1, 10, (error, data)=>{
      setTimeout(() => {
        (data.results.length == 0) ?
          this.setState({emptyHome: true}, ()=>this.setState({refreshing: false})) :
          this.setState({emptyHome: false}, ()=>this.setState({refreshing: false}))
      }, 1000)
    })
  }
  
  _onUserPress(userId) {
    this.props.forwardTo('userProfile/' + userId)
  }
  
  _onEventPress(id) {
    this.props.forwardTo('eventDetail/' + id)
  }
  
  _onSearchPress() {
    this.props.forwardTo('search')
  }
  
  _onCreateEventPress() {
    this.props.forwardTo('event/create')
  }
  
  _onProfilePress() {
    this.props.forwardTo('userProfile/' + this.props.profile.id)
  }
  
  _onEndReached() {
    console.log("On End Reach")
    const {token, activeCampaign, getActiveCampaign} = this.props
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
      
      // If this is the first Login, activeCampaign.results doesn't exist
      if (!activeCampaign.results) {
        console.log("First Login")
        this.setState({
          refreshing: true,
        })
        getActiveCampaign(token, 1, 10, () => {
          this.setState({
            refreshing: false,
          }, () => {
            (this.props.activeCampaign.results.length == 0) ? this.setState({emptyHome: true}) : this.setState({emptyHome: false, loadingMore: false})
          })
        })
      }
      // If after fetching and no data for the listview
      else if (this.props.activeCampaign.results.length == 0) {
        console.log("No data")
        this.setState({
          emptyHome: true,
          loadingMore: false
        })
      }
      // If after fetching data and Listview has some items
      else if (activeCampaign.results && this.props.activeCampaign.results.length != 0) {
        console.log("Prepare to next page")
        getActiveCampaign(token, this.state.page, 10, () => {
          this.setState({
            refreshing: false,
          }, () => {
            this.setState({
              emptyHome: false,
              loadingMore: false
            })
          })
        })
      }
    })
  }
  
  
  renderRow(rowData, sectionID, rowID, highlightRow) {
    return(
      <ListItem
        onPress={this._onEventPress.bind(this, rowData.id)}
        style={styles.listItemContainer}>
        <Event feed={rowData} onUserPress={this._onUserPress.bind(this, rowData.celebrity.id)}/>
      </ListItem>
    )
  }
  
  renderTopButton() {
    return(
      <View style={styles.topButtonContainer}>
        <Button
          style={styles.avatarButton}
          onPress={this._onProfilePress.bind(this)}>
          <Image
            style={styles.avatar}
            source={{uri: this.props.profile.avatar}}/>
        </Button>
        <Button
          onPress={this._onCreateEventPress.bind(this)}
          style={styles.eventButton}>
          <Text style={styles.eventText}>Post an event?</Text>
        </Button>
      </View>
    )
  }
  
  renderList() {
    const { activeCampaign } = this.props
    return (
      <View style={{flex: 1}}>
        <List
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor="black"
              colors={['black']}
              progressBackgroundColor="white"
              title={null}
            />
          }
          style={{flex: 1,}}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={80}
          removeClippedSubviews={false}
          renderRow={this.renderRow.bind(this)}
          dataArray={activeCampaign.results}/>
      </View>
    )
  }
  
  renderButtonSearch() {
    return(
      <Content
        refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor="black"
              colors={['black']}
              progressBackgroundColor="white"
              title={null}
            />
        }>
        <View style={styles.buttonContainer}>
          <View style={styles.refreshContainer}>
            <Icon style={styles.searchIcon} name="arrow-down" />
            <Text style={styles.refreshText}>Already follwed celebrities?</Text>
            <Text style={styles.refreshText}>Pull to refresh</Text>
          </View>
          <Button
            onPress={this._onSearchPress.bind(this)}
            style={styles.button}>
            <Icon style={styles.searchIcon} name="search" />
            <Text style={styles.textSearchButton}>You can find celebrities here</Text>
          </Button>
        </View>
      </Content>
    )
  }
  
  
  render() {
    const { activeCampaign } = this.props
    let content = (this.state.emptyHome) ? this.renderButtonSearch() : this.renderList()
    let topButton = null
    if (this.props.profile.user_type && this.props.profile.user_type.id == 3) {
      topButton = this.renderTopButton()
    }
    return (
      <Container style={{
        backgroundColor: '#ccc',
        borderColor: '#555',
        borderTopWidth: 0.5,
      }}>
        <View
          style={{flex: 1}}
          padder>
          {topButton}
          {
            activeCampaign.results && content
          }
          {this.state.loadingMore && <Spinner style={{marginBottom: 10}} color='#fff' />}
        </View>
      </Container>
    )
  }
}