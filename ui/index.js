import React, { Component } from 'react'
import App from './app'
import { Provider } from 'react-redux'
import configureStore from '~/store/config'
import { forwardTo } from '~/store/actions/common'
import Preload from './containers/Preload'
import { initialRouteName, initialAuthRouteName } from '~/store/constants/app'

export default class extends Component {
  
  constructor(props) {
    super(props)
    this.store = null
  }

  componentDidMount(){
    configureStore(store=> {
      if(!__DEV__){
        const firstRoute = store.getState().auth.loggedIn ? initialAuthRouteName : initialRouteName
        store.dispatch(forwardTo(firstRoute, true))
      }
      this.store = store
      this.forceUpdate()
    })    
  }

  shouldComponentUpdate(){
    return false
  }

  render() {        
    // should have a pre-load page
    if(!this.store)
      return ( <Preload message="Initializing..."/> )

    return (
      <Provider store={this.store}>
        <App/>        
      </Provider>
    )
  }
}

