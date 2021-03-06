import {
  MARK_REQUEST_PENDING,
  MARK_REQUEST_SUCCESS, 
  MARK_REQUEST_FAILED,
  MARK_REQUEST_CANCELLED
} from '~/store/constants/actions'
// we defined reducer to change state to state with action

import { initialAuthRouteName, initialRouteName } from '~/store/constants/app'

// these reducer is used for many pages
export const requests = (state = {}, { type, payload, meta }) => {
  switch (type) {
    case MARK_REQUEST_PENDING:    
      return { ...state, [meta.key]: { status: 'pending', error: null } }
    case MARK_REQUEST_SUCCESS:
      return { ...state, [meta.key]: { status: 'success', error: null } } 
    case MARK_REQUEST_FAILED:
      return { ...state, [meta.key]: { status: 'failure', error: payload } }
    case MARK_REQUEST_CANCELLED:
      return { ...state, [meta.key]: { status: 'success', error: null } }
    default:
      return state
  }
}

// show toast, can use material ui snackbar
export const toast = (state = null, { type, payload }) => {
  switch (type) {
    case 'app/setToast':
      return payload
    case 'app/clearToast':
      return null
    default:
      return state
  }
}

export const drawer = (state = {drawerState: 'closed'}, { type }) => {
  switch (type) {
    case 'app/openDrawer':
      return {
        ...state,
        drawerState: 'opened',
      }
    case 'app/closeDrawer':
      return {
        ...state,
        drawerState: 'closed',
      }
    default:
      return state
  }
}

export const modal = (state = {modalState: 'closed'}, { type }) => {
  switch (type) {
    case 'app/openModal':
      return {
        ...state,
        modalState: 'opened',
      }
    case 'app/closeModal':
      return {
        ...state,
        modalState: 'closed',
      }
    default:
      return state
  }
}

export const search = (state = null, { type, payload }) => {
  switch(type){
    case 'app/search':
      return payload
    default:
      return state
  }
}

// should always be payload for faster copy and paste
// we write our own route, only replace, do not use speacial function like jumpTo, it can be replaced by modal
const initialRouterState = {
  current:{
    routeName: initialRouteName
  }, 
  stack:[]
}
const defaultRoute = {
  routeName: initialAuthRouteName
}
export const router = (state = initialRouterState, { type, payload }) => {  
  switch(type) {
    case 'navigate/push':      
      // max stack is 3 items :D detail of detail
      return state.current.routeName === payload.routeName 
      ? state 
      : {current: payload, stack: [state.current, ...(state.stack.length > 2 ? state.stack.slice(0, -1) : state.stack)]}
    case 'navigate/reset':
      // for select we can return default because no mutate, next time we will return new array, just for check
      return {current: payload, stack: initialRouterState.stack}
    case 'navigate/pop':      
      // prevent back forever      
      return {current: state.stack[0] || defaultRoute, stack: state.stack.slice(1)}
    case 'app/logout':
      return initialRouterState
    case 'app/clearData':
      return initialRouterState
    default:
      return state
  }  
}