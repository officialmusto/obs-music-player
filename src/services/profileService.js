// ---- SERVICES ----
import * as tokenService from "./tokenService"

const BASE_URL = `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/profile/create`


export const createProfile = async (profileData, token) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(profileData)
  })

  return response.json()
}
