
export const notification = (state={hasMore:true, start:0, take: 10, data:[], unRead: 0}, {type, payload}) => {
  switch (type) {   
    // we can store current page? for paging...
    case 'app/replaceNotification':
      let notification = {...payload, dateTime: new Date()}
      state.data.unshift(notification)
      return {...state}
    case 'app/receiveNotification':
      return {...state, unRead: 1}
    case 'app/throwNotification':
      return {...state, unRead: 0}
    default:
      return state
  }
}

