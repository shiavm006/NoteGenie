"use client"

import { useState } from 'react'
import styles from './AuthModal.module.css'

export default function AuthModal({ isOpen, onClose, mode, setMode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Authentication logic would go here
    console.log('Form submitted:', { email, password, name })
    onClose()
  }

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2 className={styles.modalTitle}>
          {mode === 'login' ? 'Log In' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === 'signup' && (
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        <p className={styles.toggleText}>
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
          <button onClick={toggleMode} className={styles.toggleButton}>
            {mode === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  )
}
