const blogRouter = require('express').Router()
const Blog = require('../models/blog')

const {info, error} = require('../utils/logger')


blogRouter.get('/', async (request, response) => {
  console.log('grabbing list of blogs from database')
  const blogs = await Blog.find({})
  response.json(blogs)
  
})

blogRouter.get('/:id', async (request,response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    repsonse.status(404).end()
  }
})

blogRouter.post('/', async (request, response) => {
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


blogRouter.delete('/:id', async (request,response) => {
  console.log("delete router")
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request,response) => {
  info("put router")
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
  response.status(201).json(updatedBlog)

})


module.exports = blogRouter