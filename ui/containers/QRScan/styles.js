/**
 * Created by vjtc0n on 6/19/17.
 */
import { Dimensions } from 'react-native'

const {height, width} = Dimensions.get('window')

export default {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  text: {
    position: 'absolute',
    top: 30,
    color: 'white',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30
  },
  modalContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalImage: {
    height: 100,
    width: width - 50
  },
  modalSuccessText: {
    marginTop: 20,
    color: '#DB2490',
    fontSize: 20
  },
  modalErrorText: {
    marginTop: 20,
    color: 'red',
    fontSize: 20
  }
}