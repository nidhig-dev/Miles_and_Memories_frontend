import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';

//import pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home/Home";
import Missing from "./pages/Missing";
import StoryDetail from './pages/Story/StoryDetail';
import AddStory from './pages/Story/AddStory';

//import components


function App() { 
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/storydetail/:id" element={<StoryDetail/>}/>
        <Route path="/addstory" element ={<AddStory/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />        
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  )
}

export default App
