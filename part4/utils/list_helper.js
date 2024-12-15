const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!blogs[0]) {
    return 0
  }
  return blogs.map((blog) => blog.likes).reduce((a,b) => a+ b)
}


module.exports = {
  dummy, totalLikes
}