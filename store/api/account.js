import { apiGet, apiPost } from '~/store/api/common'

export default {
  /**
  * Logs a user in, returning a promise with `true` when done
  * @param  {string} token The token of the user  
  */
   
  
  /**
  * Logs the current user out
  */
  getProfile (access_token) {
    // return fetchJsonWithToken(token, `/logout`)
    return apiGet('/mobile/v1/me/', {}, access_token)
  },

  getBusinessProfile(accessToken) {
    return apiGet('/Api/BusinessAccount/BusinessAccountProfile', {}, accessToken)
  },
  
  updateProfile (access_token, userInfo) {
    return apiPost('/mobile/v1/me/', {userInfo}, access_token, 'PUT')
  },
  
  followCeleb (access_token, celebId) {
    return apiPost('/mobile/v1/follow/' + celebId, {}, access_token)
  },
  
  unfollowCeleb (access_token, celebId) {
    return apiPost('/mobile/v1/unfollow/' + celebId, {}, access_token)
  },

}
