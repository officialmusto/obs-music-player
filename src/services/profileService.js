// ---- SERVICES ----
import * as tokenService from "./tokenService"

const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/profile/create`


export async function createProfile(profileData) {
  try {
    console.log("🔥 Sending profile data to backend:", profileData) // Debug log
    const response = await fetch("http://localhost:5000/api/profiles/twitch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    })

    const result = await response.json()
    console.log("✅ Response from backend:", result) // Debug log response
    return result
  } catch (error) {
    console.error("❌ Error creating profile:", error)
    return { error: "Failed to create profile" }
  }
}


