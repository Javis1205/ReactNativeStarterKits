import material from '~/theme/variables/material'

export default {
  container: {
    borderRadius: 0,    
    marginBottom:10,
    borderWidth:0,
    marginLeft: 0,
    marginRight: 0
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
    paddingRight: 0
  },
  avatar: {
    width: 80,
    height: 80,
    borderWidth: 0.5,
    borderRadius: 40,
    borderColor: 'gray'
  },
  firstCard:{    
    borderTopLeftRadius:5,
    borderTopRightRadius: 5,             
  },
  text: {    
    color: material.tabBarActiveTextColor,
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
    fontSize: 20
  },
  detailText: {
    fontSize: 13
  },
  rowContainer: {
    marginBottom: 10
  },
  starNameText: {
    fontSize: 18
  }
}