const TWITCH_CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID
const TWITCH_REDIRECT_URI = import.meta.env.VITE_TWITCH_REDIRECT_URI

/**
 * Redirects user to Twitch OAuth using Implicit Grant Flow
 */
export const loginWithTwitch = () => {
  const twitchAuthUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${encodeURIComponent(TWITCH_REDIRECT_URI)}&response_type=code&scope=user:read:email`

  window.location.href = twitchAuthUrl // Redirect user to Twitch
}



/**
 * Extracts access token from URL after Twitch redirects back
 */
export const getTwitchAccessToken = () => {
  const hash = window.location.hash.substring(1) // Remove #
  const params = new URLSearchParams(hash)
  return params.get("access_token") // Extract token from URL
}

/**
 * Fetch Twitch user data using the access token
 */
export const getTwitchUserData = async (accessToken) => {
  if (!accessToken) {
    console.error("❌ No Twitch access token found")
    return null
  }


  if (!accessToken) {
    console.error("No Twitch access token found")
    return null
  }

  try {
    const response = await fetch("https://api.twitch.tv/helix/users", {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return await response.json()
  } catch (error) {
    console.error("Error fetching Twitch user data:", error)
    return null
  }
}
