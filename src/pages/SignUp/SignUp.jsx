import { useEffect, useState } from "react"
import { createProfile } from "../../services/profileService"
import { loginWithTwitch, getTwitchUserData } from "../../services/twitchService"
import styles from "./SignUp.module.css"

const CreateProfile = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [photo, setPhoto] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("") // "success" or "error"

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const profileData = { name, email, photo }

    try {
      const response = await createProfile(profileData, token)
      if (response.error) {
        setMessage(`❌ ${response.error}`)
        setMessageType("error") 
      } else {
        setMessage("✅ Profile created successfully!")
        setMessageType("success")
      }

      setTimeout(() => {
        setMessage("")
        setMessageType("")
      }, 3000)
      
    } catch (error) {
      setMessage("⚠️ An error occurred. Please try again.")
      setMessageType("error")

      setTimeout(() => {
        setMessage("")
        setMessageType("")
      }, 3000)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileBox}>
        <div className={styles.visual}> 
          <h1 className={styles.brand}>OBS Music Player</h1>
        </div>

        <div className={styles.formWrapper}>
          <h2>Create Profile</h2>
          
          {message && (
            <p className={`${styles.message} ${messageType === "success" ? styles.successMessage : styles.errorMessage}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label>Photo URL:</label>
            <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} />

            <div className={styles.createButton}>
              <button type="submit">Create Profile</button>
            </div>
          </form>

          <div>
            <button onClick={loginWithTwitch}>Login with Twitch</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProfile
