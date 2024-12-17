const { test, after} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')

const api = supertest(app)

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

after(async () => {
  await mongoose.connection.close()
}) 