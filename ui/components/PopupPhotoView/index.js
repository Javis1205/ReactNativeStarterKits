import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Modal,
    TouchableOpacity
} from 'react-native'
import { Spinner } from 'native-base'
import Icon  from '~/ui/elements/Icon'
import PhotoView from 'react-native-photo-view'
import ImageP from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import styles from './styles'
import material from '~/theme/variables/material'
export default class PopupPhotoView extends Component {
    constructor(props) {
        super(props)
        this.state = {
          modalVisible: false,
          uri: props.uri,
          refreshing: false
        }
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }
    setImage(uri) {
        this.setState({ uri: uri, modalVisible: true })
    }
    
    onLoadStart() {
      this.setState({
          refreshing: true
      })
    }
    
    onLoadEnd() {
      this.setState({
        refreshing: false
      })
    }
    
    render() {
        let image = (this.state.refreshing) ? <Spinner color={'white'}/> : null
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => { this.setModalVisible(false) }}
            >
                <View style={styles.imagePopupContainer}>
                    <View style={styles.controlBlock}>
                        <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                            <Icon name='close' style={styles.backIcon} />
                        </TouchableOpacity>
                    </View>
                    <PhotoView
                      onLoadStart={this.onLoadStart.bind(this)}
                      onLoadEnd={this.onLoadEnd.bind(this)}
                        source={{ uri: this.state.uri }}
                        minimumZoomScale={0.5}
                        maximumZoomScale={3}
                        resizeMode = 'contain'
                        style={{ width: '100%', height: material.deviceHeight, justifyContent: 'center', alignItems: 'center' }}>
                      {image}
                    </PhotoView>
                </View>
            </Modal>
        )
    }
}