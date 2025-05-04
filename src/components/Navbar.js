"use client"

import { useState } from "react"
import Link from "next/link"
import styles from "./Navbar.module.css"
import AuthModal from "./AuthModal"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState("login") // 'login' or 'signup'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openLoginModal = () => {
    setAuthMode("login")
    setIsAuthModalOpen(true)
  }

  const openSignupModal = () => {
    setAuthMode("signup")
    setIsAuthModalOpen(true)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <div className={styles.logoWrapper}>
              <div className={styles.logoCircle}></div>
              <span className={styles.logoText}>Textbook Companion App</span>
            </div>
          </Link>
        </div>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.active : ""}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/books" className={styles.navLink}>
                Books
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/quizzes" className={styles.navLink}>
                Quizzes
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/about" className={styles.navLink}>
                About
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.searchContainer}>
            <input type="text" placeholder="Search in site" className={styles.searchInput} />
            <button className={styles.searchButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          <div className={styles.authButtons}>
            <button onClick={openLoginModal} className={styles.loginButton}>
              Log In
            </button>
            <button onClick={openSignupModal} className={styles.signupButton}>
              Sign Up
            </button>
          </div>
          <button className={styles.menuButton} onClick={toggleMenu}>
            <span className={styles.menuIcon}></span>
          </button>
        </div>
      </div>

      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          mode={authMode}
          setMode={setAuthMode}
        />
      )}
    </header>
  )
}
