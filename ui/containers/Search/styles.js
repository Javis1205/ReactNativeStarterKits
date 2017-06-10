import material from '~/theme/variables/material'

export default {
  container: {
    padding: 10,
    // paddingBottom: 40
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  }
}