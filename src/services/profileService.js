const API_URL = "http://localhost:5000/api/profile/create"

export const createProfile = async (profileData, token) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(profileData)
  })

  return response.json()
}
