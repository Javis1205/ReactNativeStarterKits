import material from '~/theme/variables/material'
import { Platform } from 'react-native'

export default {
  remoteView: {
    position: 'absolute',
    top: 75,
    left: 0,
    bottom: 0,
    right: 0,    
    backgroundColor:'#000',
  },
  selfView: {
    width: 120,
    height: 100,    
  },
  actionButton:{
    marginTop: 40,
  },
  welcome: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  listViewContainer: {
    height: 150,
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  content: {
    position: 'absolute',
    zIndex: 9,        
    left: 0,
    bottom: 40,
    right: 0,   
    flexDirection: 'row',
    justifyContent:'space-between', 
    paddingHorizontal: 10
  }
}