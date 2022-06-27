const dummy = (blogs) => {
    if(blogs) {
        return 1
    }
  }
  

const totalLikes = (blogList) => {
 let likes = 0

 blogList.forEach(blog => {
     likes = likes + blog.likes
     
 });
 return likes
}

const favoriteBlog = (blogList) => {
    let favorite = {
        title: String,
        author: String,
        likes: Number,
    }
    favorite.likes = 0

    blogList.forEach(blog =>{
        if(blog.likes > favorite.likes){
            favorite.likes = blog.likes
            favorite.title = blog.title
            favorite.author = blog.author
        }
    })
    return favorite
}


  module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog
  }