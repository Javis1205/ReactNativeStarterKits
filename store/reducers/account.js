/*
 * The reducer takes care of state changes in our app through actions
 */
import _ from 'underscore'
// Takes care of changing the application state
// state is previous state, 
export const account = (state = {
  profile: {
    id: ''
  },
  searchedProfile: [],
  listFollowedCeleb: [],
  fanProfile: {
    username: ''
  },
  history: []
}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceProfile':
      return {...state, profile: _.extend({}, state.profile, payload) }
    case 'app/replaceSearchedProfile':
      return {...state, searchedProfile: payload.results }
    case 'app/replaceMoreSearchedProfile':
      let concatArray = payload.results
      //concatArray.results = []
      concatArray = state.searchedProfile.concat(concatArray)
      return {...state, searchedProfile: concatArray }
    case 'app/replaceListFollowedCelebrity':
      return {...state, listFollowedCeleb: payload.results }
    case 'app/saveFanProfileToFaceTime':
      return {...state, fanProfile: payload }
    case 'app/replaceHistory':
      return {...state, history: payload }
    default:
      return state
  }
}

