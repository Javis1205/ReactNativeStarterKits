import options from './options'
import material from '~/theme/variables/material'

export default {
  container:{
    marginTop: 20,
  },
  form:{
    padding: 10,
    marginTop: options.avatar.halfSize,
  },
  label:{
    paddingLeft:5,
    fontSize:14,    
    color: '#898989',
    paddingTop: 20,
    marginBottom:-5,    
  },
  userLabel:{
    color: '#fff',        
    backgroundColor: 'transparent',    
  },
  subUserLabel:{
    color: '#D8D8D8',
    backgroundColor: 'transparent', 
  },
  headerContainer:{
    justifyContent: 'space-between', 
    flexDirection: 'row',    
    position:'absolute',    
    top:0,
    width:'100%',
    height: material.toolbarHeight + 20,
    backgroundColor:'#28282a',
    opacity:0,
    zIndex:10,
  },
  buttonLeft: {        
    top: 120,      
    position:'absolute',
    zIndex:10,
  },
  get buttonRight() {
    return {...this.buttonLeft, right:0}
  },
  iconGray:{
    color: '#464646',
    fontSize: 15,
  },
  headerImage:{
    resizeMode: 'cover', 
    width: '100%',     
    height:options.header.MAX_HEIGHT - options.avatar.halfSize,     
  },
  avatarContainer:{       
    position: 'absolute',    
    top:140 - options.avatar.halfSize,
    alignSelf: 'center',
    zIndex:10,    
  },
  avatar:{          
    width: options.avatar.size,
    height: options.avatar.size,
    borderRadius: options.avatar.halfSize,                    
  },
  photoIcon:{    
    position:'absolute',
    bottom:10,
    right:0,    
  }, 
}