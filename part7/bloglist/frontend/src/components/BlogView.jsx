import { useParams } from 'react-router-dom'
import {useSelector } from 'react-redux'

import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogView = () => {
  const {id} = useParams()
  const blogs = useSelector(state => state.blogs)

  return blogs.map((blog) => blog.id === id? 
    <div><h1>{blog.title}</h1> <a>{blog.url}</a><p>{blog.likes} likes</p> <p>added by {blog.author}</p></div>: 
    <div></div>)
}
export default BlogView