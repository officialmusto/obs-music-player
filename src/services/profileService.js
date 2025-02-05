// services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/profile`

async function getAllProfiles() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}

async function addPhoto(photoData) {
  try {
    const photoFormData = new FormData()
    photoFormData.append('photo', photoData)
    const profileId = tokenService.getUserFromToken().profile
    const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: photoFormData,
    })
    return await res.json()
  } catch (err) {
    throw new Error(err)
  }
}


async function createProfile(profileData) {
  try {
    console.log("🔥 Sending profile data to backend:", profileData)

    const response = await fetch(`${BASE_URL}/create`, { // ✅ Correct Route
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify(profileData),
    })

    const result = await response.json()
    console.log("✅ Response from backend:", result)
    return result
  } catch (error) {
    console.error("❌ Error creating profile:", error)
    return { error: "Failed to create profile" }
  }
}


export { getAllProfiles, addPhoto, createProfile }
