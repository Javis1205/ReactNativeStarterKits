import { apiGet, apiPost } from '~/store/api/common'

export default {

  getActiveCampaign(access_token, celebrity_id, page, page_size) {
    return apiGet('/mobile/v1/news', {celebrity_id, page, page_size}, access_token)
  },
  
  createCampaign(access_token, event) {
    return apiPost('/mobile/v1/news/', event, access_token)
  },

}
