/**
 * Created by vjtc0n on 6/15/17.
 */
import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

import {
  replaceJob
} from '~/store/actions/job'


const requestGetJob = createRequestSaga({
  request: api.job.getJob,
  key: 'getJob',
  success: [
    (data) => replaceJob(data),
  ],
  failure: [
    () => setToast('Couldn\'t get job', 'error')
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
      takeLatest('app/getJob', requestGetJob),
    ]
  },
]