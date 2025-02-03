import { useState } from "react"
import { createProfile } from "../../services/profileService"

const CreateProfile = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [photo, setPhoto] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")  // Get JWT token from local storage
    const profileData = { name, email, photo }

    try {
      const response = await createProfile(profileData, token)

      if (response.error) {
        setMessage(`Error: ${response.error}`)
      } else {
        setMessage("Profile created successfully!")
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.")
    }
  }

  return (
    <div>
      <h2>Create Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Photo URL:
          <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        </label>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  )
}

export default CreateProfile
