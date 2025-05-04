"use client"

import { useState } from "react"
import styles from "./AuthModal.module.css"

export default function AuthModal({ isOpen, onClose, mode, setMode }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Here you would typically handle authentication
    console.log("Form submitted:", formData)

    // For demo purposes, just close the modal
    onClose()
  }

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login")
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.modalContent}>
          <h2 className={styles.modalTitle}>{mode === "login" ? "Log In" : "Sign Up for Access"}</h2>
          <p className={styles.modalSubtitle}>
            {mode === "login" ? "Welcome back!" : "Create an account to access all features"}
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {mode === "signup" && (
              <div className={styles.formGroup}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Enter your username"
                  required
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter your password"
                required
              />
            </div>

            {mode === "signup" && (
              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Re-enter your password"
                  required
                />
              </div>
            )}

            <div className={styles.buttonGroup}>
              {mode === "login" ? (
                <>
                  <button type="submit" className={styles.submitButton}>
                    Log In
                  </button>
                  <button type="button" onClick={toggleMode} className={styles.switchButton}>
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <button type="submit" className={styles.submitButton}>
                    Create Account
                  </button>
                  <button type="button" onClick={toggleMode} className={styles.switchButton}>
                    Log In
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
