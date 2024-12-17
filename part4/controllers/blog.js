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

  if (!request.body.title || !request.body.url) {
    return response.status(400).json({
      error: "Missing title or url"
    })
  } else {
    const blog = new Blog(request.body)
    if (!blog.likes) { // default to 0
      blog.likes = 0
    }
    const result = await blog.save()
    response.status(201).json(result)
  }
})

blogRouter.delete('/blogs/:id', async (request,response) => {
  console.log("delete router")
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter