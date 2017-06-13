/**
 * Created by vjtc0n on 6/13/17.
 */
import { apiGet, apiPost, apiPostUpload } from '~/store/api/common'

export default {
  
  uploadImage(access_token, data) {
    return apiPostUpload('/mobile/v1/images/', data, access_token)
  },
  
}