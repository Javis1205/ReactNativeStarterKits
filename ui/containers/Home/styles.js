import material from '~/theme/variables/material'
import {Dimensions} from 'react-native'

const {height, width} = Dimensions.get('window')
export default {
  listItemContainer: {
    borderBottomWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom:0,
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
    color: 'black',
    fontSize: 18,
    alignSelf: 'center',
  },
  textSearchButton: {
    color: 'black'
  },
  refreshText: {
    
  },
  refreshContainer: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  topButtonContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 4
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: '#ccc'
  },
  eventButton: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 0,
    elevation: 0,
    shadowOffset: null,
    shadowOpacity: 0
  },
  eventText: {
    color: 'gray',
    fontWeight: '100',
    fontSize: 16
  },
  avatarButton: {
    height: '100%',
    paddingLeft: 10,
    paddingRight: 0,
    backgroundColor: 'white',
    borderWidth: 0,
    marginLeft: 0,
    elevation: 0,
    paddingTop: 0,
    paddingBottom: 0,
    shadowOffset: null,
    shadowOpacity: 0
  }
}