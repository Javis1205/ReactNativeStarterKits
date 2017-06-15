/**
 * Created by vjtc0n on 6/15/17.
 */
export const getJob = (...args) => ({
  type: 'app/getJob',
  args
})

export const replaceJob = (data) => ({
  type: 'app/replaceJob',
  payload: data,
})