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

import Event from '~/ui/components/Event'

import styles from './styles'

const imgAvatar = "https://static.wonderfulunion.net/groundctrl/clients/taylorswift/media/13/06/large.9y7nxie1qli9.jpg"
const imgEvent = "http://images.huffingtonpost.com/2015-07-13-1436808696-2294090-taylorswiftredtouropener650430.jpg"

var data = []
for(let i = 0; i < 5; i++) {
  data.push({
    starName: "Taylor Swift",
    eventName: "Country Super Show",
    time: "19:00 - 22:00",
    date: "22/04/2017",
    location: "LA - USA",
    numberOfLikes: "2K",
    numberOfShares: "3K",
    starAvatar: imgAvatar,
    eventImg: imgEvent
  })
}

@connect(state=>({  
    
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
   /* // make it like before
    const {token, activeCampaign, getActiveCampaign} = this.props
    if(!activeCampaign.NewFeedsItemsList) {
      // so keep refreshing :D
      getActiveCampaign(token)  
    } */

    this.setState({
      refreshing: false,
    })
    
  }

  _onRefresh =() => {
    /*this.setState({refreshing: true})
    this.props.getActiveCampaign(this.props.token, ()=>this.setState({refreshing: false}))  */
  }
  
  _onUserPress() {
    this.props.forwardTo('userProfile')
  }
  
  _onEventPress() {
    this.props.forwardTo('eventDetail')
  }
  
  renderRow(rowData, sectionID, rowID, highlightRow) {
    return(
      <ListItem
        onPress={this._onEventPress.bind(this)}
        style={styles.listItemContainer}>
        <Event feed={rowData} onUserPress={this._onUserPress.bind(this)}/>
      </ListItem>
    )
  }

  render() {
    // const {  } = this.props
    return (
      <Container>
        <Content padder refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}>
          <List
            renderRow={this.renderRow.bind(this)}
            dataArray={data}/>
        </Content>
      </Container>
    )
  }
}