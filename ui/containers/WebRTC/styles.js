import material from '~/theme/variables/material'

export default {
  selfView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,    
    backgroundColor:'#000',
  },
  remoteView: {
    width: 120,
    height: 100,
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
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,   
    flexDirection: 'row',
    justifyContent:'space-between', 
    paddingHorizontal: 10
  }
}