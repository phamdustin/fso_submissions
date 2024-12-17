const Blog = require('../models/blog')

const initialBlogs = [
  {
    id:"6760cc0aa0fdbf802c5412d2",
    author:"Alex Park",
    likes:2,
    title:"testing blog",
    url:"youtube.com"
  },
  {
    id:"6760e1fd251ba40b20385e45",
    title:"Go To Statement Considered Harmful",
    author:"Edsger W. Dijkstra",
    url:"https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes:5,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url:'remove.com' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}