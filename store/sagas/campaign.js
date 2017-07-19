import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

import {
  replaceActiveCampaign,
  replaceMoreActiveCampaign,
  setNoData
} from '~/store/actions/campaign'


const requestGetActiveCampaign = createRequestSaga({
    request: api.campaign.getActiveCampaign,
    key: 'getActiveCampaign',    
    success: [
        (data) => replaceActiveCampaign(data),
        () => setNoData(false)
    ],
    failure: [
        () => setToast('Couldn\'t get active campaign', 'error')
    ],
})

const requestGetMoreActiveCampaign = createRequestSaga({
  request: api.campaign.getActiveCampaign,
  key: 'getActiveCampaign',
  success: [
    (data) => replaceMoreActiveCampaign(data),
  ],
  failure: [
    () => setToast('Couldn\'t get active campaign', 'error')
  ],
})

const requestCreateCampaign = createRequestSaga({
  request: api.campaign.createCampaign,
  key: 'createCampaign',
  success: [
    
  ],
  failure: [
    () => setToast('Couldn\'t create event', 'error')
  ],
})

const requestGetDetailedEvent = createRequestSaga({
  request: api.campaign.getDetailedCampaign,
  key: 'getDetailedCampaign',
  success: [
  
  ],
  failure: [
    () => setToast('Couldn\'t create event', 'error')
  ],
})

const requestUserEvent = createRequestSaga({
  request: api.campaign.getUserCampaign,
  key: 'getUserCampaign',
  success: [
  
  ],
  failure: [
    () => setToast('Couldn\'t create event', 'error')
  ],
})

const requestEditCampaign = createRequestSaga({
  request: api.campaign.editCampaign,
  key: 'editCampaign',
  success: [
  
  ],
  failure: [
    () => setToast('Couldn\'t update event', 'error')
  ],
})

const requestGetTemporaryActiveCampaign = createRequestSaga({
  request: api.campaign.getTemporaryActiveCampaign,
  key: 'getTemporaryActiveCampaign',
  success: [
    (data) => replaceActiveCampaign(data),
    () => setNoData(true)
  ],
  failure: [
    () => setToast('Couldn\'t get active campaign', 'error')
  ],
})

// saga reducer
export default [
    // like case return, this is take => call
    // inner function we use yield*
    // from direct watcher we just yield value
    function* fetchWatcher() {
        // use takeLatest instead of take every, so double click in short time will not trigger more fork
        yield [
          takeLatest('app/getActiveCampaign', requestGetActiveCampaign),
          takeLatest('app/createCampaign', requestCreateCampaign),
          takeLatest('app/getDetailedCampaign', requestGetDetailedEvent),
          takeLatest('app/getUserCampaign', requestUserEvent),
          takeLatest('app/editCampaign', requestEditCampaign),
          takeLatest('app/getMoreActiveCampaign', requestGetMoreActiveCampaign),
          takeLatest('app/getTemporaryActiveCampaign', requestGetTemporaryActiveCampaign)

        ]
    },
]

