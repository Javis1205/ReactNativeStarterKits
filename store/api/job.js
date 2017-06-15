/**
 * Created by vjtc0n on 6/15/17.
 */
import { apiGet, apiPost } from '~/store/api/common'

export default {
  
  getJob(access_token, page, page_size) {
    return apiGet('/mobile/v1/job/', {page, page_size}, access_token)
  },
  
}