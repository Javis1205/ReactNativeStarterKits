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
    width: 30,
    height: 30,
    fontSize: 30,
    color: 'white'
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
}