// Landing page for the site.

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
    <div className={styles.title}>Landing Page.</div>
    <SpotifyPlayer />
    <CiderPlayer />
    </>
  )
}

export default Landing