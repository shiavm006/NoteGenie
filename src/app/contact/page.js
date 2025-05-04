"use client"

import { useState } from "react"
import styles from "./page.module.css"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: "",
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

    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    })

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.description}>
        Have questions, feedback, or need assistance? We're here to help! Fill out the form below and we'll get back to
        you as soon as possible.
      </p>

      <div className={styles.contactContent}>
        <div className={styles.contactForm}>
          {formStatus.submitted && (
            <div className={`${styles.formMessage} ${formStatus.success ? styles.success : styles.error}`}>
              {formStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="Your name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="Your email address"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={styles.input}
                placeholder="Subject of your message"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Your message"
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>

        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <h2 className={styles.infoTitle}>Contact Information</h2>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📧</div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoLabel}>Email</h3>
                <p className={styles.infoText}>support@textbookcompanion.com</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📱</div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoLabel}>Phone</h3>
                <p className={styles.infoText}>+1 (123) 456-7890</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>🏢</div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoLabel}>Address</h3>
                <p className={styles.infoText}>123 Education St, Learning City, ED 12345</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>⏰</div>
              <div className={styles.infoContent}>
                <h3 className={styles.infoLabel}>Hours</h3>
                <p className={styles.infoText}>Monday - Friday: 9AM - 5PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
