import React, { Component } from 'react'
import { BackHandler, NativeModules, Animated, View, Easing } from 'react-native'
import Navigator from './components/Navigator'
import { Drawer, StyleProvider } from 'native-base'

import getTheme from '~/theme/components'
import material from '~/theme/variables/material'

import Toasts from './components/Toasts'
import AfterInteractions from './components/AfterInteractions'
import SideBar from './components/SideBar'
import Preload from './containers/Preload'
import Header from '~/ui/components/Header'
import Footer from '~/ui/components/Footer'

import { connect } from 'react-redux'
import { getDrawerState, getRouter, getModalState } from '~/store/selectors/common'
import * as commonActions from '~/store/actions/common'
import * as accountActions from '~/store/actions/account'
import * as accountSelectors from '~/store/selectors/account'
import * as notificationActions from '~/store/actions/notification'
import * as authSelectors from '~/store/selectors/auth'

import routes from './routes'

const getPage = (route) => {
  let match = routes[route.routeName]
  match && Object.assign(match, route)
  return match
}

const animatedOption = {
  toValue: 0,
  duration: 200,
  easing: Easing.bezier(0.075, 0.82, 0.165, 1),
  useNativeDriver: true, 
}

const UIManager = NativeModules.UIManager

@connect(state=>({
  router: getRouter(state),
  drawerState: getDrawerState(state),
  profile: accountSelectors.getProfile(state),
  token: authSelectors.getToken(state)
}), {...commonActions, ...accountActions, ...notificationActions})
export default class App extends Component {    

  constructor(props) {
    super(props)

    this.firstTime = true   
    this.pageInstances = new Map()
  }
  
  componentWillMount() {
    UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
  

  // replace view from stack, hard code but have high performance
  componentWillReceiveProps({router, drawerState, modalState}){
    // process for route change only
    if (router.current.routeName !== this.props.router.current.routeName) {
      const route = getPage(router.current)
      if (route) {
        // show header and footer, and clear search string          
        this.navigator.navigate(route)
        this.header.show(route.headerType, route.title)        
        this.footer.show(route.footerType, route.routeName)

      } else {
        // no need to push to route
        this.props.setToast('Scene not found: ' + router.current.routeName, 'danger')
      }      
    }    

    // check drawer
    if (drawerState !== this.props.drawerState) {
      this.drawer._root[drawerState === 'opened' ? 'open' : 'close']()
    }    
  }

  // we handle manually to gain performance
  shouldComponentUpdate(nextProps){
    return false
  }

  _transitionScene = (prevIndex, index, thisNavigator) => {         
      thisNavigator.enable(prevIndex, false)    
      thisNavigator.transitionBetween(prevIndex, index, 0)      
      thisNavigator.enable(index) 
  }

  // we can use events to pass between header and footer and page via App container or store
  _renderPage = (route) => {    
    const component = (
      <AfterInteractions firstTime={this.firstTime} placeholder={route.Preload || <Preload />}>        
        <route.Page route={route} app={this} ref={ref=> this.pageInstances.set(route.routeName, ref)} />        
      </AfterInteractions>
    )

    this.firstTime = false
    return component    
  }

  _onLeftClick=(type)=>{
    const {openDrawer, goBack} = this.props
    switch(type){
      case 'none':      
        return false
      case 'back':
      case 'searchBack':
        return goBack()
      default:
        return openDrawer()
    }      
  }

  _onTabClick=(type, route)=>{    
    const {forwardTo} = this.props
    switch(type){
      case 'none':      
        return false
      default:
        return forwardTo(route)
    }    
  }

  componentDidMount() {    
    BackHandler.addEventListener('hardwareBackPress', () => {
      const {router, goBack} = this.props
      if (router.route === 'home') {
        return false
      }
      // go back
      goBack()
      return true
    })
  }

  handleFocusableComponent(ref, focus = true){
    // do not loop forever
    const method = focus ? 'componentWillFocus' : 'componentWillBlur'
    let whatdog = 10        
    while (ref && whatdog > 0) {
      if (ref[method]) {
        ref[method]()    
        break
      }
      ref = ref._reactInternalInstance._renderedComponent._instance
      whatdog--
    }
  }

  
  _handlePageWillBlur = ({routeName, cache}) => {    
    if(cache)
      this.handleFocusableComponent(this.pageInstances.get(routeName), false)      
    else
      this.pageInstances.delete(routeName)
  }


  _handlePageWillFocus = (route) => {   
    this.handleFocusableComponent(this.pageInstances.get(route.routeName), true)
  }

  render() {    
    const {router, drawerState, closeDrawer } = this.props
    const route = getPage(router.current) || routes.notFound    
    return (            
      <StyleProvider style={getTheme(material)}>         

        <Drawer
          ref={ref => this.drawer = ref}
          open={drawerState === 'opened'}
          type="displace"             
          negotiatePan={true}
          tweenDuration={300}
          tweenEasing="easeOutCubic"
          useInteractionManager={true}  
          content={<SideBar />}        
          onClose={closeDrawer}
        >                     

          <Header type={route.headerType} title={route.title} onLeftClick={this._onLeftClick} 
            onItemRef={ref=>this.header=ref} />
         
          <Navigator ref={ref => this.navigator = ref}
            initialRoute={route}
            renderScene={this._renderPage}
            onFocus={this._handlePageWillFocus}
            onBlur={this._handlePageWillBlur}
            transition={this._transitionScene}
          />

          <Footer type={route.footerType} route={route.routeName} onTabClick={this._onTabClick} 
            ref={ref=>this.footer=ref} />

          <Toasts/>

        </Drawer>
      </StyleProvider>          
    )
  }
}

