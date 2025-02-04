// NPM MODULES
import { NavLink, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as authService from '../../services/authService'

// ASSETS
import styles from './NavBar.module.css'
import favicon from '/assets/favicon.png'

// components


// WEATHER INFORMATION SOON
// import WeatherInfo from '../WeatherInfo/WeatherInfo'







const NavBar = ({handleAuthEvt}) => {
  const [isAuthenticated, setIsAutheticated] = useState(false)
  
  const user = authService.getUser()
  useEffect(() => {
    setIsAutheticated(!!user)
  })

  const handleLogout = () => {
    authService.logout
    setIsAutheticated(false)
    handleAuthEvt()
  }

  const protectedLinks = (
    <ul>
      <li><NavLink to="/obs-music-player">OBS Music Player</NavLink></li>
      <li>
        <NavLink to="/auth/logout" onClick={handleLogout}>LOG OUT</NavLink>
      </li>


      {/* {weather.weather && 
        <li>
          <WeatherInfo weather={weather} />
        </li>
      } */}
    </ul>
  )

  return (
    <nav className={styles.container}>
      <img src={favicon} alt="obs-music-player-logo" />
      <ul>

        {isAuthenticated ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><button onClick={handleLogout}>Log Out</button></li>
          </>
        ) : (
          <>
            <li><Link to="/auth/login">Log In</Link></li>
            <li><Link to="/auth/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
