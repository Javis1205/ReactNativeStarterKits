
export const isLogged = state =>
  state.auth.loggedIn

export const getToken = state => 
  state.auth.user.access_token ? state.auth.user.access_token : null

export const getUser = state => 
  state.auth.user || {}
  
