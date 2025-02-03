// IMPORTS
import { React, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'


// COMPONENTS



// PAGES
import Landing from './pages/Landing/Landing'
import CreateProfile from './pages/SignUp/SignUp'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateProfile />} />
        {/* <Route path "/" element={<Landing />} /> */}
        </Routes>
    </Router>
  )
}

export default App
