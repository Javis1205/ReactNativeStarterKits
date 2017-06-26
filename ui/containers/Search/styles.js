import material from '~/theme/variables/material'

export default {
  container: {

  },
  content: {
    height: 200
  },
  icon: {
    color: 'white',
    fontSize: 30,
  },
  iconContainer: {
    //backgroundColor: material.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  categoryContainer: {
    flex: 1,
    height: 100,
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  celebItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  suggestBlock: {
    marginTop: 10,
    flex: 1
  },
  resultThumbnail: {
    width: 70,
    height: 70,
    borderRadius: 35
  }, 
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowResult: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  suggestSubBlock: {
    flexDirection: 'column',
    // flexWrap: 'wrap'
  },
  spinnerContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listItemContainer: {
    borderBottomWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
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
    color:material.backgroundColor,
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
  },
}