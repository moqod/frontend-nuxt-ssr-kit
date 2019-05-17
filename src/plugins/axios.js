import axios from 'axios'

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export default ({ app, store, redirect }) => {
  axios.defaults.baseURL = process.env.apiUrl

  // if (process.server) {
  //   return
  // }

  // Request interceptor
  axios.interceptors.request.use(request => {
    request.headers.common['Accept-Language'] = app.i18n.locale

    return request
  })

  // Response interceptor
  axios.interceptors.response.use(response => response, error => {
    const { status, data } = error.response || {}

    if (status >= 500) {
      alert(data.message || 'Error');
    }

    return Promise.reject(error)
  })
}
