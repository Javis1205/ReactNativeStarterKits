import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import App from './app'
import { Provider } from 'react-redux'
import configureStore from '~/store/config'
import { forwardTo } from '~/store/actions/common'
import Preload from './containers/Preload'
import OneSignal from 'react-native-onesignal'
import CodePush from 'react-native-code-push'

import UpdateScreen from './components/UpdateModal'

StatusBar.setBarStyle('light-content')

if (!window.navigator.userAgent) {
  window.navigator.userAgent = "react-native"
}

export default class extends Component {

  constructor(props) {
    super(props)
    this.store = null
    this.state = {
      showDownloadingModal: false,
      showInstalling: false,
      downloadProgress: 0
    }
  }

  componentDidMount(){
    configureStore(store=> {
      if(!__DEV__){
        const firstRoute = store.getState().auth.loggedIn ? 'home' : 'login'
        store.dispatch(forwardTo(firstRoute, true))
      }
      this.store = store
      this.forceUpdate()
    })
    CodePush.sync(
      {
        updateDialog: true,
        installMode: CodePush.InstallMode.IMMEDIATE,
        checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME
      },
      status => {
        switch (status) {
          case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
            this.setState({ showDownloadingModal: true });
            // this.modalRef.open();
            break;
          case CodePush.SyncStatus.INSTALLING_UPDATE:
            this.setState({ showInstalling: true });
            break;
          case CodePush.SyncStatus.UPDATE_INSTALLED:
            // this.modalRef.close();
            this.setState({ showDownloadingModal: false });
            break;
          default:
            break;
        }
      },
      ({ receivedBytes, totalBytes }) => {
        this.setState({ downloadProgress: (receivedBytes / totalBytes) * 100 });
      }
    );
  }

  componentWillMount() {    
      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('registered', this.onRegistered);
      OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('registered', this.onRegistered);
      OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
      console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onRegistered(notifData) {
    console.log("Device had been registered for push notifications!", notifData);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  shouldComponentUpdate(){
    return false
  }

  render() {        
    // should have a pre-load page
    if(!this.store)
      return ( <Preload message="Initializing..."/> )
  
    if (this.state.showDownloadingModal) {
      return (
        <UpdateScreen
          isOpen={this.state.showDownloadingModal}
          showInstalling={this.state.showInstalling}
          downloadProgress={this.state.downloadProgress}
        />
      )
    }

    return (
      <Provider store={this.store}>
        <App/>        
      </Provider>
    )
  }
}

