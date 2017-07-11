/**
 * Created by vjtc0n on 6/8/17.
 */
import material from '~/theme/variables/material'
export default {
  coverImg: {
    width: '100%',
    height: 300
  },
  avatarImg: {
    width: 80,
    height: 80,
    borderWidth: 0.5,
    borderRadius: 40,
    borderColor: 'gray',
    alignSelf: 'center'
  },
  avatarContainer: {
    justifyContent: 'center',
    position: 'absolute',
    height: 300,
    width: '100%',
    backgroundColor: 'transparent'
  },
  socialContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  },
  icon: {
    width: 20,
    height: 20,
    fontSize: 20,
    color: 'black'
  },
  iconContent: {    
    fontSize: 20,    
    // marginRight: 10
  },
  detailText: {
    fontSize: 15,
    color: 'white',
    marginLeft: 5
  },
  detailEventText: {
    fontSize: 12,    
    marginLeft: 5
  },
  textContainer: {
    height: 30,
    justifyContent: 'center'
  },
  followButton: {
    width: '50%',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#F5A2A2'
  },
  listItemContainer: {
    borderBottomWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0
  },
  dateText: {
    fontSize: 16
  },
  headerContainer: {
    width: '100%',
    height: 300
  },
  dateContainer: {
    width: '20%',
    justifyContent: 'center'
  },
  starNameText: {
    fontSize: 16,
    color: 'white'
  },
  rowContainer: {
    marginBottom: 10,
    flexDirection: 'row'
  },
  eventText: {
    fontSize: 18,    
    // alignSelf: 'center'
  },
  spinnerContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image:{
    resizeMode: 'cover',
    width:'100%',
    height:material.deviceWidth * 0.6,
  },
  socialText: {
    fontSize: 13,
    color: 'black',
  },
  socialButton: {
    width: 34 + '%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 0,
    paddingTop: 0,
    paddingBottom: 0,
    height: 30,
    paddingLeft: 0,
    paddingRight: 0,
    shadowOffset: null,
    borderWidth: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    borderRadius: 0,
    alignSelf: 'center'
  },
  socialInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderBottomWidth: 0.2,
    borderColor: 'gray'
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignSelf: 'center'
  },
  celebName: {
    marginTop: 10,
    fontSize: 12
  }
}