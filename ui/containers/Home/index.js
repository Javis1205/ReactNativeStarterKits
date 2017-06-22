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
    Fab
} from 'native-base'

import {Dimensions, Image} from 'react-native'

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
      fabActive: false
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
      <View>
        <List
          removeClippedSubviews={false}
          renderRow={this.renderRow.bind(this)}
          dataArray={activeCampaign.results}/>
      </View>
    )
  }
  
  renderButtonSearch() {
    return(
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
        <Content
          padder          
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}          
             >
          {topButton}
          {
            activeCampaign.results && content
          }
        </Content>
      </Container>
    )
  }
}