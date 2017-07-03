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
    return apiPost('/mobile/v1/me/', {...userInfo}, access_token, 'PUT')
  },
  
  followCeleb (access_token, celebId) {
    return apiPost('/mobile/v1/follow/' + celebId, {}, access_token)
  },
  
  unfollowCeleb (access_token, celebId) {
    return apiPost('/mobile/v1/unfollow/' + celebId, {}, access_token)
  },
  
  searchProfile (access_token, celebrityName, jobId, page=1, pageSize=10) {
    if (celebrityName != null) {
      return apiGet('/mobile/v1/search/', {
        celebrity_name: celebrityName,
        page: page,
        page_size: pageSize
      }, access_token)
    } else if (celebrityName == null && jobId != null) {
      return apiGet('/mobile/v1/search/', {
        job_id: jobId,
        page: page,
        page_size: pageSize
      }, access_token)
    }
    return apiGet('/mobile/v1/search/', {}, access_token)
  },
  
  requestCeleb(access_token, description) {
    return apiPost('/mobile/v1/celebrity-request/', {
      description: description
    }, access_token)
  },
  
  getTopFan(accessToken, celebrity_id) {
    return apiGet('/mobile/v1/user/' + celebrity_id + '/fan/', {}, accessToken)
  },
  
  getListFollowedCelebrity(accessToken, page, page_size) {
    return apiGet('/mobile/v1/me/list-followed/', {page, page_size}, accessToken)
  },
  
  postQRCode (access_token, qRCode) {
    return apiPost('/mobile/v1/barcodes/' + qRCode + '/active', {}, access_token, 'PUT')
  },

}
