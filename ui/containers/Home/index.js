import React, { Component } from 'react'
import {                 
    Button,         
    Icon,     
    Container,
    Text,    
    Item,
    View,
    Input,
    List,
    ListItem
} from 'native-base'

import {Dimensions, RefreshControl} from 'react-native'

import Content from '~/ui/components/Content'
import { connect } from 'react-redux'
import * as commonActions from '~/store/actions/common'
import * as authSelectors from '~/store/selectors/auth'
import * as commonSelectors from '~/store/selectors/common'
import * as campaignSelectors from '~/store/selectors/campaign'
import * as campaignActions from '~/store/actions/campaign'
import * as accountSelectors from '~/store/selectors/account'

import Event from '~/ui/components/Event'

import styles from './styles'

@connect(state=>({  
  token: authSelectors.getToken(state),
  celebrity_id: accountSelectors.getCelebrityId(state),
  activeCampaign: campaignSelectors.getActiveCampaign(state)
}), {...campaignActions, ...commonActions})

export default class extends Component {

  constructor(props) {
    super(props)

    this.state = {
      refreshing: false,
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
        })
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
  
  renderRow(rowData, sectionID, rowID, highlightRow) {
    return(
      <ListItem
        onPress={this._onEventPress.bind(this, rowData.id)}
        style={styles.listItemContainer}>
        <Event feed={rowData} onUserPress={this._onUserPress.bind(this, rowData.celebrity.id)}/>
      </ListItem>
    )
  }

  render() {
    const { activeCampaign } = this.props
    return (
      <Container style={{
        backgroundColor: '#ccc',
        borderColor: '#555',
        borderTopWidth: 0.5,
      }}>
        <Content
          padder
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              tintColor="white"
              colors={['white']}
              progressBackgroundColor="white"
              title={null}
            />
             }>
          {
            activeCampaign.results &&
            <List
              removeClippedSubviews={false}
              renderRow={this.renderRow.bind(this)}
              dataArray={activeCampaign.results}/>
          }
        </Content>
      </Container>
    )
  }
}