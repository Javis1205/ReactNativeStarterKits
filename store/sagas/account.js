import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

import {
  replaceProfile,
  getProfile,
  replaceSearchedProfile,
  replaceListFollowedCelebrity,
  replaceMoreSearchedProfile,
  replaceHistory
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
    //(data, {args:[token]}) => getProfile(token)
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

const requestSearchProfile = createRequestSaga({
  request: api.account.searchProfile,
  key: 'searchProfile',
  success: [
    (data) => replaceSearchedProfile(data)
  ],
  failure: [
    () => setToast('Couldn\'t search profile', 'error')
  ],
})

const requestSearchMoreProfile = createRequestSaga({
  request: api.account.searchProfile,
  key: 'searchMoreProfile',
  success: [
    (data) => replaceMoreSearchedProfile(data)
  ],
  failure: [
    () => setToast('Couldn\'t search profile', 'error')
  ],
})

const requestRequestCeleb = createRequestSaga({
  request: api.account.requestCeleb,
  key: 'requestCeleb',
  success: [
    () => setToast('Request successfully')
  ],
  failure: [
    (error) => {
      if (error.status == 400) {
        return setToast('You\'ve already requested', 'error')
      } else {
        return setToast('Couldn\'t request', 'error')
      }
    }
  ],
})

const requestGetListFan = createRequestSaga({
  request: api.account.getTopFan,
  key: 'getTopFan',
  success: [
  
  ],
  failure: [
    () => setToast('Couldn\'t get top fan', 'error')
  ],
})

const requestGetListFollowedCeleb = createRequestSaga({
  request: api.account.getListFollowedCelebrity,
  key: 'getListFollowedCelebrity',
  success: [
    (data) => replaceListFollowedCelebrity(data)
  ],
  failure: [
    () => setToast('Couldn\'t get list', 'error')
  ],
})

const requestPostQRCode = createRequestSaga({
  request: api.account.postQRCode,
  key: 'postQRCode',
  success: [
  
  ],
  failure: [
    () => setToast('Couldn\'t request QR code', 'error')
  ],
})

const requestGetHistory = createRequestSaga({
  request: api.account.getHistory,
  key: 'getHistory',
  success: [
    (data) => replaceHistory(data),
  ],
  failure: [
    () => setToast('Couldn\'t get history', 'error')
  ],
})

const requestFaceTime = createRequestSaga({
  request: api.account.faceTime,
  key: 'faceTime',
  success: [
    
  ],
  failure: [
    () => setToast('Couldn\'t have a facetime', 'error')
  ],
})

const requestGetUserInfo = createRequestSaga({
  request: api.account.getUserInfo,
  key: 'getUserInfo',
  success: [
    
  ],
  failure: [
    () => setToast('Couldn\'t get profile', 'error')
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
          takeLatest('app/unfollowCeleb', requestUnfollowCeleb),
          takeLatest('app/searchProfile', requestSearchProfile),
          takeLatest('app/requestCeleb', requestRequestCeleb),
          takeLatest('app/getTopFan', requestGetListFan),
          takeLatest('app/getListFollowedCelebrity', requestGetListFollowedCeleb),
          takeLatest('app/postQRCode', requestPostQRCode),
          takeLatest('app/searchMoreProfile', requestSearchMoreProfile),
          takeLatest('app/getHistory', requestGetHistory),
          takeLatest('app/faceTime', requestFaceTime),
          takeLatest('app/getUserInfo', requestGetUserInfo)
        ]
    },
]


