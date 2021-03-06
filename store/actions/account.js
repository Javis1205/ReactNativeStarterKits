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

export const searchProfile = (...args) => ({
  type: 'app/searchProfile',
  args
})

export const replaceSearchedProfile = (data) => ({
  type: 'app/replaceSearchedProfile',
  payload: data,
})

export const searchMoreProfile = (...args) => ({
  type: 'app/searchMoreProfile',
  args
})

export const replaceMoreSearchedProfile = (data) => ({
  type: 'app/replaceMoreSearchedProfile',
  payload: data,
})

export const requestCeleb = (...args) => ({
  type: 'app/requestCeleb',
  args
})

export const getTopFan = (...args) => ({
  type: 'app/getTopFan',
  args
})

export const getListFollowedCelebrity = (...args) => ({
  type: 'app/getListFollowedCelebrity',
  args
})

export const replaceListFollowedCelebrity = (data) => ({
  type: 'app/replaceListFollowedCelebrity',
  payload: data,
})

export const postQRCode = (...args) => ({
  type: 'app/postQRCode',
  args
})

export const saveFanProfileToFaceTime = (data) => ({
  type: 'app/saveFanProfileToFaceTime',
  payload: data,
})

export const getHistory = (...args) => ({
  type: 'app/getHistory',
  args
})

export const replaceHistory = (data) => ({
  type: 'app/replaceHistory',
  payload: data,
})

export const faceTime = (...args) => ({
  type: 'app/faceTime',
  args
})

export const getUserInfo = (...args) => ({
  type: 'app/getUserInfo',
  args
})
