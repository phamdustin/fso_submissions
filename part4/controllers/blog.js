const blogRouter = require('express').Router()
const Blog = require('../models/blog')

const {info, error} = require('../utils/logger')

blogRouter.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

blogRouter.get('/blogs', async (request, response) => {
  console.log('grabbing list of blogs from database')
  const blogs = await Blog.find({})
  response.json(blogs)
  
})

blogRouter.post('/blogs', async (request, response) => {
  console.log("post router")
  const blog = new Blog(request.body)
  if (!blog.likes) {
    blog.likes = 0
  }
  const result = await blog.save()
  response.status(201).json(result)
  
})

module.exports = blogRouter