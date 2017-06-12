import { takeLatest, takeEvery } from 'redux-saga/effects'

import api from '~/store/api'
import { createRequestSaga } from '~/store/sagas/common'
import { setToast, noop, forwardTo } from '~/store/actions/common'

import {
    setAuthState,
    saveLoggedUser,
    removeLoggedUser
} from '~/store/actions/auth'

import {
    getProfile,
    replaceProfile
} from '~/store/actions/account'

import { closeDrawer } from '~/store/actions/common'

const requestLogin = createRequestSaga({
    request: api.auth.login,
    key: 'login',
    cancel: 'app/logout',
    success: [
        (data) => saveLoggedUser(data),
        //({access_token}) => getProfile(access_token),
        () => replaceProfile({
            user_id: "7a39a6ed-3748-4ddb-9f14-3210a473cb25",
            celebrity_id: "d0c31260-d04d-4ba0-b561-62dbe12e7922"
        }),
        () => setAuthState(true),                   
        () => forwardTo('home'), 
        () => setToast('Logged successfully!!!'),            
    ],
    failure: [
        () => setToast('Couldn\'t login', 'error')
    ],
})


const requestLogout = createRequestSaga({
    request: api.auth.logout,
    key: 'logout',
    success: [
        () => removeLoggedUser(),
        () => setAuthState(false),           
        () => closeDrawer(),
        () => forwardTo('login'),
        () => setToast('Logout successfully!!!'),    
    ],
    failure: [
        () => setToast('Couldn\'t logout', 'error')
    ],
})



// root saga reducer
export default [
    // like case return, this is take => call
    // inner function we use yield*
    // from direct watcher we just yield value
    // other watcher may be background workers
    function* fetchWatcher() {
        // use takeLatest instead of take every, so double click in short time will not trigger more fork
        yield [            
            takeLatest('app/login', requestLogin),
            takeLatest('app/logout', requestLogout),
        ]
    },
]


