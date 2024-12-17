const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

blogRouter.get('/blogs', async (request, response) => {
  console.log('grabbing list of blogs from database')
  const blogs = await Blog.find({})
  response.json(blogs)
  
})

blogRouter.post('/blogs', async (request, response) => {
  const blog = new Blog(request.body)
  console.log("posting new blog entry", blog)

  const result = await blog.save()
  response.status(201).json(result)

})

module.exports = blogRouter