import material from '~/theme/variables/material'

export default {
  container: {
    borderRadius: 4,    
    marginBottom:0,
    borderWidth:0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  headerContainer:{
    paddingBottom:0
  },
  footerContainer:{ 
    justifyContent: 'space-around',    
  },
  avatarContainer:{
    borderTopWidth: material.platform === 'android' ? 1 : 0,
    paddingLeft: 0,
    paddingRight: 0,    
  },
  avatar: {
    width: 40,
    height: 40,
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: 'gray'
  },
  firstCard:{    
    borderTopLeftRadius:5,
    borderTopRightRadius: 5,             
  },
  text: {    
    color: material.tabBarActiveTextColor,
  },
  bigText: {
    fontSize: 20,
    // color: '#000',
    // lineHeight: 20,    
    backgroundColor: 'transparent',
    color: 'white'
  },
  image:{ 
    resizeMode: 'cover',    
    width:'100%',
    height:material.deviceWidth * 0.7,
  },
  textGray: {    
    color: '#757575'
  },
  textGreen:{
    color:'#00a651',
    marginBottom:5,
  },
  iconGray: {    
    color: '#757575',
    fontSize:30,
  },
  button: {
    borderColor: material.tabBarActiveTextColor,
    width: '100%',
  },
  icon: {
    width: 25,
    height: 25,
    fontSize: 25,
    color: 'white',
  },
  detailText: {
    fontSize: 13,
    color: 'white',
    alignSelf: 'center',
  },
  rowContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  starNameText: {
    fontSize: 12,    
    lineHeight: 14,
  },
  socialText: {
    fontSize: 13,
    color: 'white',
  },
  timeText: {
    fontSize: 13,
    color: 'white',
  }
}