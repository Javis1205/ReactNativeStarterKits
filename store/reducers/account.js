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
  listFollowedCeleb: [],
  fanProfile: {
    username: ''
  }
}, {type, payload}) => {
  switch (type) {   
    case 'app/replaceProfile':
      return {...state, profile: payload }
    case 'app/replaceSearchedProfile':
      let concatArray = payload.results
      //concatArray.results = []
      concatArray = state.searchedProfile.concat(concatArray)
      return {...state, searchedProfile: concatArray }
    case 'app/replaceListFollowedCelebrity':
      return {...state, listFollowedCeleb: payload.results }
    case 'app/saveFanProfileToFaceTime':
      return {...state, fanProfile: payload }
    default:
      return state
  }
}

