
// NPM MODULES
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// SERVICES
import * as authService from '../../services/authService'
import { loginWithTwitch, getTwitchUserData } from "../../services/twitchService"

// ASSETS
import backgroundVideoUrl from '/assets/video-signup.mp4'

// CSS
import styles from './LogIn.module.css'


const LogIn = ({ handleAuthEvt }) => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

    // Fetch Twitch user data if logged in
    useEffect(() => {
      const fetchTwitchProfile = async () => {
        const userData = await getTwitchUserData()
        if (userData && userData.data) {
          setName(userData.data[0].display_name)
          setEmail(userData.data[0].email)
          setPhoto(userData.data[0].profile_image_url)
        }
      }
  
      fetchTwitchProfile()
    }, [])

  const handleChange = evt => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACKEND_SERVER_URL) {
        throw new Error('No VITE_BACKEND_SERVER_URL in front-end .env')
      }
      await authService.login(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      setMessage(err.message)
    }
  }

  const { email, password } = formData

  const isFormInvalid = () => {
    return !(email && password)
  }



  return (
    <main className={styles.container}>
      {/* Background Video */}
      <video autoPlay loop muted className={styles.videoBackground}>
        <source src={backgroundVideoUrl} type="video/mp4" />
      </video>
      <section className={styles.logInBox}>
        <div className={styles.visual}>
          <h1 className={styles.brand}>OBS Music Player</h1>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h1 className={styles.title}>Log In</h1>
          <p>{message}</p>
          <div>
          <label>
            Email
            <input
              type="text"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </label>
          </div>
          <div>
          <button className={styles.logInButton} type="submit" disabled={loading}>{loading ? "Creating..." : "Log In"}</button>
            <Link to="/">CANCEL</Link>
          </div>
            <div className={styles.twitchSection}>
              <p><strong>OR</strong></p>
              <button className={styles.buttonTwitch} onClick={loginWithTwitch}>Log In with Twitch</button>
            </div>
        </form>
      </section>
    </main>
  )
}

export default LogIn
