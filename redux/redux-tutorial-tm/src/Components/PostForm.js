import React, { useEffect, useState, Fragment } from "react";

export const PostForm = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const onSubmit = e => {
    e.preventDefault() 
    
    const post = { title, body } 

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST", 
      headers: {
        "content-type": "application/json"
      }, 
      body: JSON.stringify(post) 
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  return (
    <div>
      <h1>Add Post</h1>
      <form>
        <div>
          <label>Title: </label><br /> 
          <input name="title" type="text" value={title} onChange={e => setTitle(e.target.value)}/> 
        </div>
        <div>
          <label>Body</label><br /> 
          <textarea name="body" type="text" value={body} onChange={e => setBody(e.target.value)}/> 
        </div>
        <br /> 
        <div>
          <button type="submit" onClick={onSubmit}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
