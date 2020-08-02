import React from 'react';
import logo from './logo.svg';
import './App.css';
import Posts from './Components/Posts'
import PostForm from './Components/PostForm'


function App() {
  return (
    <div className="App">
      <PostForm /> 
      <hr />      
      <Posts />
    </div>
  );
}

export default App;
