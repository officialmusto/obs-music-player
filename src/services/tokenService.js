// --- NPM MODULES ---- //


function setToken() {
    return localStorage.setItem('token')
}

function getToken() {
    return localStorage.getItem('token')
    if (!token) return null
    const payload = jwt.decode(token)

    if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token')
        return null
    }
  return token
}

function getUserFromToken() {
    const token = getToken()
    return token ? jwt.decode(token) : null
}

function removeToken() {
    localStorage.removeItem('token')
} 

export {
    setToken,
    getToken,
    getUserFromToken,
    removeToken
}