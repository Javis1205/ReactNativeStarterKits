/**
 * Created by vjtc0n on 6/9/17.
 */

import {Dimensions} from 'react-native'
const {height, width} = Dimensions.get('window')

export default {
  inputField: {
    borderRadius: 5,
    backgroundColor: '#d9d9d9',
    height: (height <= 600) ? 40 : 50,
    marginTop: 0,
    paddingTop: 0,
    marginBottom: 0,
    paddingBottom: 0
  },
  inputContainer: {
    marginBottom: 5,
    height: (height <= 600) ? 40 : 50,
    borderRadius: 5,
    marginTop: 10,
    paddingTop: 0,
    overflow: 'hidden',
    paddingBottom: 0
  },
  inputIcon: {
    fontSize: 20,
    color: '#7e7e7e'
  },
  inputText: {
    color: "#7e7e7e",
    top: 0,
    height: (height <= 600) ? 40 : 50
  },
  rightIcon: {
    color: '#7e7e7e',
    fontSize: 18,
    marginTop: 0,
  },
  photoEvent: {
    width: '100%',
    height: 250,
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: '99%',
    height: '99%',
    backgroundColor: '#d9d9d9',
    borderRadius: 3
  },
  photoIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 2,
    borderWidth: 0.2,
    borderColor: 'gray'
  }
}