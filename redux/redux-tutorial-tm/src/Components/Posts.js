import React, { useEffect, useState, Fragment } from 'react' 

export const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
  },[])



  return (
    <Fragment>
      <h1>Posts</h1>
      {
        posts.map(post => {
          return (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          )
        })

      }
    </Fragment>
    )
}


export default Posts 