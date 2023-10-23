import React from 'react'
import './App.css'
import Chatbot from './pages/Chatbot/Chatbot'
import NavigationBar from './lib/NavigationBar/NavigationBar'
import { Routes, Route } from 'react-router'
import Home from './pages/Home/Home'

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/chatbot" element={<Chatbot />}></Route>
      </Routes>
    </>
  )
}

export default App;
