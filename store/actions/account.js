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