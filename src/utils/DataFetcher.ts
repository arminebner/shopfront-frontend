import axios from 'axios'

const dataFetcher = async (endpoint: string, config = {}) => {
  try {
    const { data } = await axios(`http://localhost:5000/api/${endpoint}`, config)
    return data
  } catch (_) {}
}

export default dataFetcher
