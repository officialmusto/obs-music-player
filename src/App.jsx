// IMPORTS
import { React, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import './App.css'


// COMPONENTS
import NavBar from './components/NavBar/NavBar'

// SERVICES



// PAGES
import Landing from './pages/Landing/Landing'

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        </Routes>
    </Router>
  )
}

export default App
