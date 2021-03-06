/**
 * Created by vjtc0n on 6/9/17.
 */
import {Dimensions} from 'react-native'
const {height, width} = Dimensions.get('window')

export default {
  submitButton: {
    backgroundColor: '#222222',
    alignSelf: 'center',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  inputField: {
    borderRadius: 5,
    backgroundColor: '#d9d9d9',
    height: 398,
    marginTop: 0
  },
  inputContainer: {
    marginBottom: (height <= 600) ? 20 : 30,
    height: 400,
    borderRadius: 5,
    marginTop: 20,
    paddingTop: 0,
    overflow: 'hidden',
    paddingBottom: 0,    
  },
  inputIcon: {
    fontSize: 20,
    color: '#7e7e7e'
  },
  inputText: {
    color: "#7e7e7e",
    top: 0,
    height: 398
  },
  rightIcon: {
    color: '#7e7e7e',
    fontSize: 18,
    alignSelf: 'flex-start',
    marginTop: 8
  },
}