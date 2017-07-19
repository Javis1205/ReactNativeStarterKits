import { apiGet, apiPost } from '~/store/api/common'

export default {

  getActiveCampaign(access_token, page, page_size) {
    return apiGet('/mobile/v1/news-feed/', {page, page_size}, access_token)
  },
  
  createCampaign(access_token, event) {
    return apiPost('/mobile/v1/news/', event, access_token)
  },
  
  getDetailedCampaign(access_token, event_id) {
    return apiGet('/mobile/v1/news/' + event_id, {}, access_token)
  },
  
  getUserCampaign(access_token, celebrity_id, page, page_size) {
    return apiGet('/mobile/v1/news', {celebrity_id, page, page_size}, access_token)
  },
  
  editCampaign(access_token, event_id, event) {
    return apiPost('/mobile/v1/news/' + event_id, event, access_token, 'PUT')
  },
  
  getTemporaryActiveCampaign(access_token) {
    return apiGet('/mobile/v1/news/', {}, access_token)
  },
  
}
