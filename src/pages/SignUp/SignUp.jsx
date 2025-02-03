import { useState } from "react"
import { createProfile } from "../../services/profileService"
import styles from "./SignUp.module.css"

// --- ASSETS ---
import brandingVideo from "../../assets/branding-createProfile-video.mp4"  

const CreateProfile = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [photo, setPhoto] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const profileData = { name, email, photo }

    try {
      const response = await createProfile(profileData, token)
      if (response.error) {
        setMessage(`Error: ${response.error}`)
      } else {
        setMessage("✅ Profile created successfully!")
      }
    } catch (error) {
      setMessage("⚠️ An error occurred. Please try again.")
    }
  }

  return (
    <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay muted loop>
        <source src={brandingVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.profileBox}>
        
      {/* BRANDING VISUAL */}
        <div className={styles.visual}> 
          <h1 className={styles.brand}>OBS Music Player</h1>
        </div>

        <div className={styles.formWrapper}>
          <h2>Create Profile</h2>
          {message && <p className={styles.message}>{message}</p>}
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
        </div>
      </div>
    </div>
  )
}

export default CreateProfile
