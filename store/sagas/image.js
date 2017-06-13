/**
 * Created by vjtc0n on 6/13/17.
 */
import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'


const requestUploadImage = createRequestSaga({
  request: api.image.uploadImage,
  key: 'uploadImage',
  blob: true,
  uploadProgress: [
    ({uploaded, total}) => setToast('Uploaded ' + uploaded)
  ],
  success: [
    
  ],
  failure: [
    () => setToast('Couldn\'t upload image', 'error')
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
      takeLatest('app/uploadImage', requestUploadImage)
    ]
  },
]