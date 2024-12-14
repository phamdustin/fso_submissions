const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

blogRouter.get('/blogs', (request, response) => {
  console.log('grabbing list of blogs from database')
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogRouter.post('/blogs', (request, response) => {
  const blog = new Blog(request.body)

  console.log("posting new blog entry", blog)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter