// Landing page for the site


// --- IMPORTS ---
import React from 'react'
import backgroundVideoUrl from '/assets/video-signup.mp4'


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
      <source src={backgroundVideoUrl} type="video/mp4" />
    </video>
    <div className={styles.title}>Landing Page.</div>
    </>
  )
}

export default Landing