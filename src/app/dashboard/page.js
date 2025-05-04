"use client"

import { useState, useEffect } from "react"
import styles from "./page.module.css"

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Simulate checking authentication status
  useEffect(() => {
    // In a real app, you would check if the user is logged in
    // For demo purposes, we'll just set it to true
    setIsLoggedIn(true)
  }, [])

  // Mock user data
  const userData = {
    name: "User's Name",
    profileImage: "/placeholder.jpg",
    bio: "Welcome to your personalized dashboard.",
  }

  // Mock recently viewed books
  const recentBooks = [
    { id: 1, title: "Book Title A", author: "Author A" },
    { id: 2, title: "Book Title B", author: "Author Y" },
    { id: 3, title: "Book Title C", author: "Author Z" },
  ]

  // Mock saved notes
  const savedNotes = [
    { id: 1, title: "Note on Chapter 3", book: "Book Title A" },
    { id: 2, title: "Note on Chapter 5", book: "Book Title B" },
  ]

  // Mock completed quizzes
  const completedQuizzes = [
    { id: 1, title: "Physics Quiz", score: "80%" },
    { id: 2, title: "Biology Quiz", score: "90%" },
    { id: 3, title: "Math Quiz", score: "75%" },
  ]

  // If not logged in, show login prompt
  if (!isLoggedIn) {
    return (
      <div className={styles.loginPrompt}>
        <h1>Please Log In</h1>
        <p>You need to be logged in to view your dashboard.</p>
        <button
          className={styles.loginButton}
          onClick={() => setIsLoggedIn(true)} // For demo purposes
        >
          Log In
        </button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.dashboardHeader}>
        <div className={styles.welcomeBanner}>
          <div className={styles.bannerContent}>
            <h1>Welcome back!</h1>
            <p>Track your progress here.</p>
          </div>
        </div>
      </div>

      <div className={styles.dashboardContent}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Recently Viewed Books</h2>
          <div className={styles.booksGrid}>
            {recentBooks.map((book) => (
              <div key={book.id} className={styles.bookCard}>
                <div className={styles.bookIcon}>📚</div>
                <div className={styles.bookInfo}>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookAuthor}>Author: {book.author}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Saved Notes</h2>
          <div className={styles.notesGrid}>
            {savedNotes.map((note) => (
              <div key={note.id} className={styles.noteCard}>
                <div className={styles.noteIcon}>📝</div>
                <div className={styles.noteInfo}>
                  <h3 className={styles.noteTitle}>{note.title}</h3>
                  <p className={styles.noteBook}>Book: {note.book}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Completed Quizzes</h2>
          <div className={styles.quizzesGrid}>
            {completedQuizzes.map((quiz) => (
              <div key={quiz.id} className={styles.quizCard}>
                <div className={styles.quizIcon}>✓</div>
                <div className={styles.quizInfo}>
                  <h3 className={styles.quizTitle}>{quiz.title}</h3>
                  <p className={styles.quizScore}>Score: {quiz.score}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.userSection}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}></div>
            <h2 className={styles.userName}>{userData.name}</h2>
            <p className={styles.userBio}>{userData.bio}</p>
            <div className={styles.userActions}>
              <button className={styles.logoutButton}>Logout</button>
              <button className={styles.editProfileButton}>Edit Profile</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
