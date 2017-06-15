import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

import {
  replaceProfile,
  getProfile
} from '~/store/actions/account'


const requestGetProfile = createRequestSaga({
    request: api.account.getProfile,
    key: 'getProfile',    
    success: [
        (data) => replaceProfile(data),       
    ],
    failure: [
        () => setToast('Couldn\'t get profile', 'error')
    ],
})

const requestUpdateProfile = createRequestSaga({
  request: api.account.updateProfile,
  key: 'updateProfile',
  success: [
    (data, {args:[token]}) => getProfile(token)
  ],
  failure: [
    () => setToast('Couldn\'t update profile', 'error')
  ],
})

const requestFollowCeleb = createRequestSaga({
  request: api.account.followCeleb,
  key: 'followCeleb',
  success: [

  ],
  failure: [
    () => setToast('Couldn\'t follow profile', 'error')
  ],
})

const requestUnfollowCeleb = createRequestSaga({
  request: api.account.unfollowCeleb,
  key: 'unfollowCeleb',
  success: [
    
  ],
  failure: [
    () => setToast('Couldn\'t unfollow profile', 'error')
  ],
})


// root saga reducer
export default [
    // like case return, this is take => call
    // inner function we use yield*
    // from direct watcher we just yield value
    function* fetchWatcher() {
        // use takeLatest instead of take every, so double click in short time will not trigger more fork
        yield [
          takeLatest('app/getProfile', requestGetProfile),
          takeLatest('app/updateProfile', requestUpdateProfile),
          takeLatest('app/followCeleb', requestFollowCeleb),
          takeLatest('app/unfollowCeleb', requestUnfollowCeleb)
        ]
    },
]


