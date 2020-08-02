import React, { useEffect, useState, Fragment } from "react";

export const PostForm = () => {
  

  return (
    <div>
      <h1>Add Post</h1>
      <form>
        <div>
          <label>Title: </label><br /> 
          <input name="title" type="text" /> 
        </div>
        <div>
          <label>Body</label><br /> 
          <textarea name="body" type="text" /> 
        </div>
        <br /> 
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
