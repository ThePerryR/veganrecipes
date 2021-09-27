import 'isomorphic-fetch'

/**
 * fetch
 * this is a utility method to make "fetch" calls.
 * @param url - url you are calling
 * @param method - get, put, etc
 * @param body - optional object to pass to the server
 * @param params - url query params. can be object or string
 * @returns {Promise<Response>} returns a fetch promise,
 * string this onto checkStatus, then parseJSON
 */
export default (url, method = 'get', body, params) => {
  const request = {
    method,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
  if (method !== 'get') {
    request.body = JSON.stringify(Object.assign({}, body))
  }
  const esc = encodeURIComponent
  let query
  if (params && typeof params === 'object') {
    query = Object.keys(params)
      .map(k => {
        const escapedKey = esc(k)
        if (Array.isArray(params[k])) {
          return `${params[k].map(param => `${escapedKey}=${esc(param)}`).join('&')}`
        }
        return `${escapedKey}=${esc(params[k])}`
      })
      .join('&')
  } else if (params) {
    query = params
  }

  return fetch(query ? `${url}${query && '?'}${query}` : url, request)
}

/* checks a promise status, throws and error if not good */
export function checkStatus (response) {
  if (response.status >= 200 && response.status < 305) {
    return response
  }
  throw response.json()
}

export function parseJSON (response) {
  return response.json()
}
