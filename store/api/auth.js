import { apiPost, apiLogin } from '~/store/api/common'

export default {
 

  login (token, socialType) {
    console.log(token)
    switch (socialType) {
      case 'facebook':
        return apiLogin(`/mobile/v1/user/register/facebook/`, {
          access_token: token
        })
      case 'twitter':
        return apiLogin(`/mobile/v1/user/register/facebook/`, {
          access_token: token
        })
    }
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
