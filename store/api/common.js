import RNFetchBlob from 'react-native-fetch-blob'
// default api_base for all request
import {  
  API_BASE
} from '~/store/constants/api'

export const urlEncode = data => data
? Object.keys(data).map((key) => key + '=' + encodeURIComponent(data[key])).join('&')
: ''

// try invoke callback for refresh token here
export const fetchJson = (url, options = {}, base = API_BASE) => {
  return (
    // in the same server, API_BASE is emtpy
    /// check convenient way of passing base directly
    fetch(/^(?:https?)?:\/\//.test(url) ? url : base + url, {
      ...options,
      headers: {
        ...options.headers,
        //'Content-Type':'application/x-www-form-urlencoded',
        // 'Accept': 'application/json',
        //'Content-Type': 'application/json',
      },
    })     
  )  
}

export const fetchJsonUploadWithToken = (token, url, options = {}, base = API_BASE) => {
  return RNFetchBlob.fetch('POST', /^(?:https?)?:\/\//.test(url) ? url : base + url,
    {
      Authorization: `Bearer ${token.access_token || token}`,
      'Content-Type' : 'multipart/form-data',
    }, options.body)
}

export const apiCallUpload = (url, options, token = null) =>
  fetchJsonUploadWithToken(token, url, options)

export const apiPostUpload = (url, data, token, method='POST') =>
  apiCallUpload(url, {
    method,
    body: data,
    header: {
      'Content-Type': 'application/json'
    }
  }, token)

export const fetchJsonWithToken = (token, url, options = {}, ...args) => {
  return (
    fetchJson(url, {
      ...options,
      headers: {
        ...options.header,
        Authorization: `Bearer ${token.access_token || token}`,
      },
    }, ...args)
  )
}

// default is get method, we can override header with method:PUT for sample
export const apiCall = (url, options, token = null) => 
  token ? fetchJsonWithToken(token, url, options) : fetchJson(url, options)

// must have data to post, put should not return data
export const apiPost = (url, data, token, method='POST') =>
  apiCall(url, {
    method,
    body: JSON.stringify(data),
    header: {
      'Content-Type': 'application/json'
    }
  }, token)

export const apiLogin = (url, data, token, method='POST') =>
  apiCall(url, {
    method,
    body: urlEncode(data),
    headers: {
      'Content-Type':'application/x-www-form-urlencoded'
    }
  }, token)

export const apiGet = (url, data, token, method='GET') => {
  return apiCall(url + '?' + urlEncode(data), {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }, token)
}


// if we want to fetch blob data with progress support, we should use fetchBlob, such as download from uri to local, then cache it
// https://github.com/wkh237/react-native-fetch-blob  

