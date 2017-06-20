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
    fontSize: 15,
    // color: '#000',
    // lineHeight: 20,    
    backgroundColor: 'transparent',
  },
  image:{ 
    resizeMode: 'cover',    
    width:'100%',
    height:material.deviceWidth * 0.6,
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
    width: 20,
    height: 20,
    fontSize: 20,    
    marginLeft:-3,
  },
  detailText: {
    fontSize: 10,
    lineHeight: 12,
  },
  rowContainer: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  starNameText: {
    fontSize: 12,    
    lineHeight: 14,
  }
}