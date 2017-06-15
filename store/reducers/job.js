/**
 * Created by vjtc0n on 6/15/17.
 */
export const job = (state = {
  jobList: []
}, {type, payload}) => {
  switch (type) {
    case 'app/replaceJob':
      return {...state, jobList: payload.results }
    default:
      return state
  }
}