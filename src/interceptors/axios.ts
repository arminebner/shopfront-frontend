import axios from 'axios'

axios.interceptors.response.use(
  resp => resp,
  async error => {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      const { data } = await axios.get('http://localhost:5000/api/users/refreshAccess', {
        withCredentials: true,
      })

      axios.defaults.headers.common['authorization'] = `Bearer ${data.accessToken}`
      originalRequest.headers['authorization'] = `Bearer ${data.accessToken}`

      return axios(originalRequest)
    }

    return error
  }
)
