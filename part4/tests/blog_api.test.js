const { test, after, describe} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')

const api = supertest(app)

describe.only('blog api tests', async () => {
  test.only('blogs are returned as json', async() => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test.only('blog count returns 1', async() => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length,1)
  })

  test.only('unique id is id', async () => {
    const blogs = await api.get('/api/blogs')
    blogs.body.forEach((blog) => {
      assert.notStrictEqual(blog.id, undefined)
      assert.strictEqual(blog._id,undefined)
    })
  })
  
})

after(async () => {
  await mongoose.connection.close()
}) 