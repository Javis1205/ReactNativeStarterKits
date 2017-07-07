/**
 * Created by vjtc0n on 6/19/17.
 */
import { Dimensions } from 'react-native'

const {height, width} = Dimensions.get('window')

export default {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
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
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10
  },
  modalImage: {
    height: 200,
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