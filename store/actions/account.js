// action requestors

export const getProfile = (...args) => ({
  type: 'app/getProfile',
  args
})


// action creators
export const replaceProfile = (data) => ({
  type: 'app/replaceProfile',
  payload: data,
})

export const updateProfile = (...args) => ({
  type: 'app/updateProfile',
  args
})

export const followCeleb = (...args) => ({
  type: 'app/followCeleb',
  args
})

export const unfollowCeleb = (...args) => ({
  type: 'app/unfollowCeleb',
  args
})

export const checkFollowCeleb = (...args) => ({
  type: 'app/checkFollowCeleb',
  args
})