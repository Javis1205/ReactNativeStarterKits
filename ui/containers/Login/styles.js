export default {
  container: {    
    flex: 1,
    alignItems: 'center',  
    justifyContent: 'center',   
    flexDirection: 'column',  
    backgroundColor: '#000',          
  },  
  absolute:{
    width: '100%',
    height: '100%',    
    position: 'absolute',
    top: 0,
    left: 0,    
  },
  get splash(){
    return {
      ...this.absolute,
      resizeMode: 'cover',
    }    
  },
  textLogo: {
    color: '#fff',
    fontWeight: '900',
    letterSpacing: 2,
    fontSize: 30,
    backgroundColor: 'transparent',          
  },
  bottomContainer:{
    position: 'absolute',
    top: '50%',
    left: 0,
    marginTop:40,
    width: '100%',
    alignItems: 'center',
  },
  socialButtons: {        
    marginTop: 40,
  },
  socialButton:{
    width: 250,
    margin: 10,
    justifyContent: 'space-around',
    paddingLeft: 0,
  },
  socialButtonIcon:{    
    fontSize: 20,    
  },
}