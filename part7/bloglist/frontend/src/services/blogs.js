import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(token)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addLike = async (blogObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    blogObject,
    config,
  )
  return response.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('prior to sending delete request')
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  console.log(`response data is!!: ${response.data}`)
}

export default { getAll, setToken, create, addLike, deleteBlog }
