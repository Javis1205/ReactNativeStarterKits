import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { requests, toast, drawer, router, search, modal } from './common'
import { auth } from './auth'
import { account } from './account'
import { data } from './data'
import { notification } from './notification'
import { campaign } from './campaign'
import { network } from './network'
import { delegation } from './delegation'
import { vault } from './vault'
import { image } from './image'
import { job } from './job'

// a rootReducer is like a single state, key is function return a sub state value
const rootReducer = combineReducers({    
  form,
  ui: combineReducers({
    // ui reducer should be placed here    
    toast,
    drawer,
    search,
    modal
  }),  
  requests, 
  router,
  auth,
  account,
  data,
  notification,
  campaign,
  network,
  delegation,
  vault,
  image,
  job
})

export default rootReducer

