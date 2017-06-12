import { apiPost, apiLogin } from '~/store/api/common'

export default {
 

  login (facebookToken) {
    return apiLogin(`/mobile/v1/user/register/facebook/`, {
      access_token: facebookToken
    })
  },

  refreshAccessToken (refreshToken) {
    return apiPost(`/auth/token`, {      
      refreshToken,
    })
  },

  reject (refreshToken) {
    return apiPost(`/auth/reject`, {
      refreshToken,
    })
  },
  
  /**
  * Logs the current user out
  */
  logout (accessToken) {
    // return fetchJsonWithToken(token, `/logout`)
    return apiPost(`/api/Account/Logout`, {}, accessToken)
  },

}
