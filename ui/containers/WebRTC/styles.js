import material from '~/theme/variables/material'

export default {
  selfView: {
    width: material.deviceWidth,
    height: material.deviceWidth * 0.6,
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
}