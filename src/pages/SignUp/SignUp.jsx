import { useEffect, useState } from "react"
import { createProfile } from "../../services/profileService"
import { loginWithTwitch, getTwitchUserData } from "../../services/twitchService"
import styles from "./SignUp.module.css"


// FONT AWESOME ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons"

const CreateProfile = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [photo, setPhoto] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("") // "success" or "error"

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"]
      if (!validTypes.includes(file.type)) {
        setMessage("⚠️ Only PNG, JPEG, and JPG files are allowed.")
        setMessageType("error")
        return
      }

      setSelectedFile(file)
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
        setPhoto(fileReader.result) // Set base64 image preview
      }
      fileReader.readAsDataURL(file)
    }
  }

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
            <div className={styles.emailUpload}>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />

              <label htmlFor="fileUpload" className={styles.fileUpload}>
              <FontAwesomeIcon icon={faArrowUpFromBracket} bounce />
                  <input 
                    id="fileUpload"
                    type="file" 
                    accept="image/png, image/jpeg, image/jpg" 
                    onChange={handleFileChange} 
                    className={styles.hiddenFileInput} 
                  />
                </label>
            </div>
{photo && <img src={photo} alt="Profile Preview" className={`${styles.imagePreview} ${photo ? styles.show : ""}`} />}

            <div className={styles.createButton}>
              <button type="submit">Create Profile</button>
            </div>
          </form>

          <div>
            <p><strong>OR</strong></p>
            <button className={styles.buttonTwitch} onClick={loginWithTwitch}>Sign Up with Twitch</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProfile
