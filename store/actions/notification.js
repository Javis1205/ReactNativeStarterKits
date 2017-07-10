// action requestors

export const getNotification = (...args) => ({
  type: 'app/getNotification',
  args
})


// action creators
export const replaceNotification = (data) => ({
  type: 'app/replaceNotification',
  payload: data,
})

export const receiveNotification = () => ({
  type: 'app/receiveNotification'
})

export const throwNotification = () => ({
  type: 'app/throwNotification'
})