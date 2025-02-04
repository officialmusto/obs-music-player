import { useState } from "react"
import { createProfile } from "../../services/profileService"
import { loginWithTwitch } from "../../services/twitchService"
import styles from "./SignUp.module.css"

// Use correct video import
const backgroundVideoUrl = "/assets/video-signup.mp4"

// FONT AWESOME ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons"

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    photo: "",
  })

  const [selectedFile, setSelectedFile] = useState(null)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const validTypes = ["image/png", "image/jpeg", "image/jpg"]
    if (!validTypes.includes(file.type)) {
      setMessage("⚠️ Only PNG, JPEG, and JPG files are allowed.")
      setMessageType("error")
      return
    }

    setSelectedFile(file)
    const fileReader = new FileReader()
    fileReader.onloadend = () => {
      setFormData((prevData) => ({ ...prevData, photo: fileReader.result }))
    }
    fileReader.readAsDataURL(file)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return

    setLoading(true)
    setMessage("")
    setMessageType("")

    try {
      const token = localStorage.getItem("token")
      const response = await createProfile(formData, token)

      if (response.error) {
        setMessage(`❌ ${response.error}`)
        setMessageType("error")
      } else {
        setMessage("✅ Profile created successfully!")
        setMessageType("success")
        setFormData({ name: "", email: "", photo: "" })
        setSelectedFile(null)
      }
    } catch (error) {
      setMessage("⚠️ An error occurred. Please try again.")
      setMessageType("error")
    } finally {
      setLoading(false)
      setTimeout(() => {
        setMessage("")
        setMessageType("")
      }, 3000)
    }
  }

  return (
    <>
      <div className={styles.container}>
        {/* Background Video */}
        <video autoPlay loop muted className={styles.videoBackground}>
          <source src={backgroundVideoUrl} type="video/mp4" />
        </video>

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
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

              <label htmlFor="email">Email:</label>
              <div className={styles.emailUpload}>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                <label htmlFor="fileUpload" className={styles.fileUpload}>
                  <FontAwesomeIcon icon={faArrowUpFromBracket} bounce />
                  <input id="fileUpload" type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} className={styles.hiddenFileInput} />
                </label>
              </div>

              {formData.photo && <img src={formData.photo} alt="Profile Preview" className={styles.imagePreview} />}

              <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Profile"}</button>
            <div className={styles.twitchSection}>
              <p><strong>OR</strong></p>
              <button disabled={true} className={styles.buttonTwitch} onClick={loginWithTwitch}>Sign Up with Twitch</button>
            </div>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}

export default CreateProfile
