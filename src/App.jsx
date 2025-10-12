import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom';

//import pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home/Home";
import Missing from "./pages/Missing";

//import components


function App() {

  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </>
  )
}

export default App
