
// NPM MODULES
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// SERVICES
import * as authService from '../../services/authService'
import { loginWithTwitch, getTwitchUserData } from "../../services/twitchService"

// ASSETS

// CSS
import styles from './LogIn.module.css'


const LogIn = ({ handleAuthEvt }) => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
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
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
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
      <section>
      </section>
      <section>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <h1>Log In</h1>
          <p>{message}</p>
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
          <div>
            <button disabled={isFormInvalid()}>LOG IN</button>
            <Link to="/">CANCEL</Link>
          </div>
        </form>
        <button onClick={loginWithTwitch}>Login with Twitch</button>
      </section>
    </main>
  )
}

export default LogIn
