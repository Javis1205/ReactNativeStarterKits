
export const isLogged = state =>
  state.auth.loggedIn

export const getToken = state => 
  (state.auth.user && state.auth.user.access_token) ? state.auth.user.access_token : null

export const getUser = state => 
  state.auth.user || {}

export const getSocialType = state =>
  state.auth.socialType || {}

