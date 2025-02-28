const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  // exercise 4.4
  if (!blogs[0]) {
    return 0;
  }
  return blogs.map((blog) => blog.likes).reduce((a, b) => a + b);
};

const favoriteBlog = (blogs) => {
  // exercise 4.5
  if (!blogs[0]) {
    return 0;
  }

  const mostLikedBlog = blogs.reduce((maxBlog, currentBlog) => {
    return currentBlog.likes > maxBlog.likes ? currentBlog : maxBlog;
  }, blogs[0]);

  return mostLikedBlog;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
