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
      getActiveCampaign(token, celebrity_id, 1, 10, () => {
        this.setState({
          refreshing: false,
        })
      })
    }
    
  }

  _onRefresh =() => {
    const {token, activeCampaign, getActiveCampaign, celebrity_id} = this.props
    this.setState({refreshing: true})
    getActiveCampaign(token, celebrity_id, 1, 10, ()=>this.setState({refreshing: false}))
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
      <Container>
        <Content
          padder
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}>
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