import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Header, Left, Right, Body,
  Text, Title, Button, Item, Input, Container
} from 'native-base'
import { View } from 'react-native'
import * as commonSelectors from '~/store/selectors/common'
import * as commonActions from '~/store/actions/common'

import Icon from '~/ui/elements/Icon'
import styles from './styles'

@connect(state => ({
  searchString: commonSelectors.getSearchString(state),
}), commonActions)
export default class extends Component {

  constructor(props) {
    super(props)

    this.state = {
      type: props.type,
      title: props.title,
      notifyNumber: props.notifyNumber || 0,
    }
  }

  componentDidMount() {
    this.props.onItemRef && this.props.onItemRef(this)
  }

  show(type, title) {
    this.setState({ type, title })
  }
  setNotifyNumber(number) {
    this.setState({ notifyNumber: number })
  }
  _leftClick = (e) => {
    const { onLeftClick } = this.props
    onLeftClick && onLeftClick(this.state.type)
  }

  _search = (value, force = false) => {
    if ((this.props.searchString !== value) || force) {
      this.props.search(value)
    }
  }

  _onPressSearch = () => {
    const { forwardTo } = this.props
    forwardTo('search')
  }
  _onPressNotification = () => {
    const { forwardTo } = this.props
    forwardTo('notification')
  }
  renderHeaderBack(title) {
    const left = (
      <Button transparent onPress={this._leftClick}>
        <Icon name="keyboard-arrow-left" />
      </Button>
    )
    const center = (
      <Title full>{title}</Title>
    )
    return this.renderHeader(left, center)
  }

  // public data not event
  renderHeaderSearch(iconName = "menu") {
    const left = (
      <Button transparent onPress={this._leftClick}>
        <Icon style={styles.menuIcon} name={iconName} />
      </Button>
    )
    const center = (
      <Item style={styles.searchContainer}>
        {/*<Icon name="search" style={styles.searchIcon} />*/}
        <Input value={this.props.searchString}
          autoCorrect={false} onChangeText={this._search}
          placeholderTextColor="#222" style={styles.searchInput}
          placeholder="Novame Search" />
      </Item>
    )
    const right = (
      <Button transparent>
        <Icon style={styles.searchIcon} name="search" />
      </Button>
    )
    return this.renderHeader(left, center, right)
  }
  renderHeaderHome() {
    const left = (
      <Button transparent onPress={this._leftClick}>
        <Icon style={styles.menuIcon} name='menu' />
      </Button>
    )
    const center = (
      <Text white style={{alignSelf: 'center'}}>Home</Text>
    )
    const right = (
      <View style={styles.rowIconContainer}>
        <Button transparent onPress={() => this._onPressNotification()}>
          <View style={styles.badgeContainer}>
            <Text small white>5</Text>
          </View>
          <Icon style={styles.icon} name="notification" />
        </Button>
        <Button transparent onPress={() => this._onPressSearch()}>
          <Icon style={styles.icon} name="search" />
        </Button>
      </View>
    )
    console.log('end of header')
    return this.renderHeader(left, center, right)
  }
  renderHeader(left, center, right, props) {
    let rightStyle = null
    if (right) {
      rightStyle = {flex: 0.5}
    } else {
      rightStyle = {}
    }
    
    return (
      <Header noShadow {...props} style={styles.container}>
        <Left style={{flex: 0.5}}>{left}</Left>
        <Body style={{flex: 1,}}>{center}</Body>
        <Right style={rightStyle}>{right}</Right>
      </Header>
    )
  }

  render() {
    // events will be 
    const { type, title } = this.state
    // event will be invoke via pageInstance
    switch (type) {
      case 'none':
        return false
      case 'back':
        return this.renderHeaderBack(title)
      case 'home':
        return this.renderHeaderHome()
      case 'searchBack':
        return this.renderHeaderSearch('keyboard-arrow-left')
      default:
        return this.renderHeaderSearch()
    }
  }
}

