"use client"

import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function DashboardPage() {
  // This would normally come from an authentication system
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Mock user data
  const userData = {
    name: "Alex Johnson",
    email: "alex@example.com",
    joinDate: "January 2023",
    recentBooks: [
      { id: 1, title: "The Great Gatsby", lastAccessed: "2 days ago" },
      { id: 2, title: "To Kill a Mockingbird", lastAccessed: "1 week ago" },
      { id: 3, title: "1984", lastAccessed: "2 weeks ago" },
    ],
    recentQuizzes: [
      { id: 1, title: "Literature Basics", score: "8/10", date: "3 days ago" },
      { id: 2, title: "Science Fundamentals", score: "7/8", date: "1 week ago" },
    ]
  };

  // For demo purposes, toggle login state
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  if (!isLoggedIn) {
    return (
      <div className={styles.container}>
        <div className={styles.loginPrompt}>
          <h1>Please Log In</h1>
          <p>You need to be logged in to view your dashboard.</p>
          <button onClick={toggleLogin} className={styles.loginButton}>
            Log In (Demo)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.dashboardHeader}>
        <div className={styles.welcomeBanner}>
          <div className={styles.bannerContent}>
            <h1>Welcome back, {userData.name}!</h1>
            <p>Member since {userData.joinDate}</p>
          </div>
        </div>
      </header>

      <div className={styles.dashboardGrid}>
        <section className={styles.dashboardSection}>
          <h2 className={styles.sectionTitle}>Recent Books</h2>
          <div className={styles.sectionContent}>
            {userData.recentBooks.map(book => (
              <div key={book.id} className={styles.dashboardCard}>
                <h3>{book.title}</h3>
                <p>Last accessed: {book.lastAccessed}</p>
                <Link href={`/books/${book.id}`} className={styles.cardLink}>
                  Continue Reading
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.dashboardSection}>
          <h2 className={styles.sectionTitle}>Recent Quizzes</h2>
          <div className={styles.sectionContent}>
            {userData.recentQuizzes.map(quiz => (
              <div key={quiz.id} className={styles.dashboardCard}>
                <h3>{quiz.title}</h3>
                <p>Score: {quiz.score}</p>
                <p>Completed: {quiz.date}</p>
                <Link href={`/quizzes/${quiz.id}`} className={styles.cardLink}>
                  Review Quiz
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.dashboardSection}>
          <h2 className={styles.sectionTitle}>Quick Actions</h2>
          <div className={styles.actionButtons}>
            <Link href="/books" className={styles.actionButton}>
              Browse Books
            </Link>
            <Link href="/quizzes" className={styles.actionButton}>
              Take a Quiz
            </Link>
            <button onClick={toggleLogin} className={styles.logoutButton}>
              Log Out (Demo)
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
