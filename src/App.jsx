// IMPORTS
import { React, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import './App.css'


// COMPONENTS
import NavBar from './components/NavBar/NavBar'


// SERVICES



// PAGES
import Landing from './pages/Landing/Landing'
import LogIn from './pages/LogIn/LogIn'
import SignUp from './pages/SignUp/SignUp'

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/login" element={<LogIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
    </Router>
  )
}

export default App
