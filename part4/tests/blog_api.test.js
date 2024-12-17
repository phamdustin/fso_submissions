const { test, after, describe, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
  {
    id:"6760cc0aa0fdbf802c5412d2",
    author:"Alex Park",
    likes:0,
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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe.only('blog api tests', async () => {
  test.only('blogs are returned as json', async() => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
test.only('blog count returns 2', async() => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length,2)
  }) 

  test.only('unique id is id', async () => {
    const blogs = await api.get('/api/blogs')
    blogs.body.forEach((blog) => {
      assert.notStrictEqual(blog.id, undefined)
      assert.strictEqual(blog._id,undefined)
    })
  })

  test.only("creating a new blog with POST", async () => {
    const newBlog = {
      title: 'A New World',
      author: 'Albert Einsten',
      url: 'https://mathrules.com',
      likes: 183,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert(titles.includes('A New World'))
  })

})

after(async () => {
  await mongoose.connection.close()
}) 