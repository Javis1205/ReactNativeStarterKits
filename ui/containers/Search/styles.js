import material from '~/theme/variables/material'

export default {
  container: {
    paddingTop: 10,
    paddingBottom: 10
  },
  content: {
    height: 200
  },
  icon: {
    color: 'white',
    fontSize: 30,
  },
  iconContainer: {
    backgroundColor: material.black,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  categoryContainer: {
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  
  suggestBlock: {
    marginTop: 10,
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
    justifyContent: 'center'
  },
}