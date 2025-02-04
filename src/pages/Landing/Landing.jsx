// Landing page for the site


// --- IMPORTS ---
import React from 'react'



// --- COMPONENTS ---


// --- PAGES ---

import SpotifyPlayer from '../SpotifyPlayer/SpotifyPlayer'
import CiderPlayer from '../CiderPlayer/CiderPlayer'

// --- CSS ---
import styles from './Landing.module.css'


const Landing = () => {
  return (
    <>
    <video autoPlay loop muted className={styles.videoBackground}>
    </video>
    <div className={styles.title}>Landing Page.</div>
    </>
  )
}

export default Landing