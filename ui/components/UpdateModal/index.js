/**
 * Created by vjtc0n on 6/27/17.
 */
import React, { Component } from 'react';
import styles from './styles';
import { View, Text } from 'react-native';
import Modal from 'react-native-modalbox';

class UpdateScreen extends Component {
  render() {
    let renderContent = (
      <Text
        style={{
          textAlign: 'center',
          marginBottom: 15,
          fontSize: 15
        }}
      >
        Installing update...
      </Text>
    )
    if (this.props.showInstalling) {
      renderContent = (
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              marginBottom: 15,
              fontSize: 15
            }}
          >
            Downloading update... {`${parseInt(this.props.downloadProgress, 10)} %`}
          </Text>
        </View>
      )
    }
    return (
      <Modal
        isOpen={this.props.isOpen}
        style={[styles.modal, styles.modal1]}
        backdrop={false}
        ref={c => {
          this.modalRef = c;
        }}
        swipeToClose={false}
      >
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch',
            justifyContent: 'center',
            padding: 20
          }}
        >
          {renderContent}
        </View>
      </Modal>
    );
  }
}

export default UpdateScreen;
