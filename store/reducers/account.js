/*
 * The reducer takes care of state changes in our app through actions
 */

// Takes care of changing the application state
// state is previous state, 
export const account = (state = {
  profile: {
    id: ''
  },
  searchedProfile: [],
  listFollowedCeleb: []
}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceProfile':
      return {...state, profile: payload }
    case 'app/replaceSearchedProfile':
      return {...state, searchedProfile: payload.results }
    case 'app/replaceListFollowedCelebrity':
      return {...state, listFollowedCeleb: payload.results }
    default:
      return state
  }
}

