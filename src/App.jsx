// IMPORTS
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


// COMPONENTS



// PAGES
import Landing from './pages/landing/Landing'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Landing />
    </>
  )
}

export default App
