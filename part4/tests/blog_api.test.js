const { test, after, describe, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)



beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

describe('basic blog api checks', async () => {
  test('blogs are returned as json', async() => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
test('blog count returns 2', async() => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length,helper.initialBlogs.length)
  }) 

  test('unique id is id', async () => {
    const blogs = await api.get('/api/blogs')
    blogs.body.forEach((blog) => {
      assert.notStrictEqual(blog.id, undefined)
      assert.strictEqual(blog._id,undefined)
    })
  })
})

describe('adding new blogs', () => {
  test("creating a new blog with POST", async () => {
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

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    assert(titles.includes('A New World'))
  })

  test("posting blog with likes property missing, default 0", async () => {
    const newBlog = {
      title: 'Will default to 0',
      author: 'ZERO',
      url: 'https://mathfails.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(blog => blog.likes)
    assert(likes.includes(0))
  })

  test.only("posting blog with no title, 400 bad request", async () => {
    const newBlog = {
      author: 'WILL REJECT',
      url: 'https://mathfails.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  
  test.only("posting blog with no url, 400 bad request", async () => {
    const newBlog = {
      title: 'WILL FAIL',
      author: 'WILL REJECT',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe.only('deleting blog', async() => {
  test.only('deleting a single blog', async() => {
    const initialBlogs = await helper.blogsInDb()
    const blogToDelete = initialBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
 

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(b => b.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length-1)
  })
})

after(async () => {
  await mongoose.connection.close()
}) 