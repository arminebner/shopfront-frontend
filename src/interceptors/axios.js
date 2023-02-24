import axios from 'axios'

axios.interceptors.response.use(
  resp => resp,
  async error => {
    if (error.response.status === 401) {
      const { status, data } = await axios.post(
        'http://localhost:5000/api/users/refreshAccess',
        {},
        { withCredentials: true }
      )

      if (status === 200) {
        // TODO safe token in store again as well !?
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`
        return axios(error.config)
      }
    }

    return error
  }
)
