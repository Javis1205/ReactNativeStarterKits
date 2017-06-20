import material from '~/theme/variables/material'
import {Dimensions} from 'react-native'

const {height, width} = Dimensions.get('window')
export default {
  listItemContainer: {
    borderBottomWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    height: height - 100,
    justifyContent: 'center'
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black'
  },
  searchIcon: {
    color: 'black'
  },
  textSearchButton: {
    color: 'black'
  }
}