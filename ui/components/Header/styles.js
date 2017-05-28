import material from '~/theme/variables/material'

export default {
  container: {
    borderBottomWidth: 0,
  },
  searchContainer: {    
    backgroundColor: '#e1e1e1',
    borderColor:'transparent',
    borderRadius: 5,            
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft:-20,    
    width: material.deviceWidth/2 + 60,        
    height:30,    
    flexDirection:'row',  
  },
  searchIcon:{
    color:'#222',
    paddingRight:0,
  },
  menuIcon:{
    marginLeft:0,
  },
  uploadIcon: {
    fontSize: 17,
    marginRight:-3    
  },
  searchInput:{
    height: material.platform === 'ios' ? 30 : 50,    
    color:'#222'
  }
}