import Link from "next/link"
import styles from "./page.module.css"

export default function QuizzesPage() {
  // Sample data for quizzes
  const quizzes = [
    {
      id: 1,
      title: "Physics Quiz",
      subject: "Physics",
      difficulty: "Easy",
      questions: 10,
    },
    {
      id: 2,
      title: "Math Quiz",
      subject: "Math",
      difficulty: "Hard",
      questions: 15,
    },
    {
      id: 3,
      title: "Biology Quiz",
      subject: "Biology",
      difficulty: "Easy",
      questions: 8,
    },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Quizzes</h1>
        <p className={styles.subtitle}>Test your knowledge with subject/topic-based quizzes.</p>

        <div className={styles.filterContainer}>
          <button className={styles.clearButton}>Clear Filters</button>
          <button className={styles.filterButton}>Filter</button>
        </div>
      </div>

      <div className={styles.quizCollection}>
        <h2 className={styles.sectionTitle}>Quiz Collection</h2>
        <p className={styles.sectionDescription}>Explore available quizzes below.</p>

        <div className={styles.quizActions}>
          <button className={styles.bookmarkButton}>Bookmark Quiz</button>
          <button className={styles.startButton}>Start Quiz</button>
        </div>

        <div className={styles.quizGrid}>
          {quizzes.map((quiz) => (
            <div key={quiz.id} className={styles.quizCard}>
              <div className={styles.quizImage}>
                <div className={styles.imagePlaceholder}></div>
              </div>
              <div className={styles.quizInfo}>
                <h3 className={styles.quizTitle}>{quiz.title}</h3>
                <p className={styles.quizSubject}>Subject: {quiz.subject}</p>
                <p className={styles.quizDifficulty}>Difficulty: {quiz.difficulty}</p>
                <p className={styles.quizQuestions}>Questions: {quiz.questions}</p>
                <Link href={`/quizzes/${quiz.id}`} className={styles.startQuizButton}>
                  Start Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.quizDemo}>
        <h2 className={styles.sectionTitle}>Quiz Results</h2>
        <p className={styles.sectionDescription}>Review your quiz performance and check the correct answers.</p>

        <div className={styles.resultsContainer}>
          <div className={styles.scoreSection}>
            <h3 className={styles.scoreTitle}>Your Score</h3>
            <div className={styles.scoreValue}>7/10</div>
          </div>

          <div className={styles.answersSection}>
            <h3 className={styles.answersTitle}>Correct Answers</h3>
            <div className={styles.answersGrid}>
              <div className={styles.answerItem}>Q1: A</div>
              <div className={styles.answerItem}>Q2: C</div>
              <div className={styles.answerItem}>Q3: B</div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.retryButton}>Retry Quiz</button>
            <button className={styles.submitButton}>Submit</button>
          </div>
        </div>
      </div>

      <div className={styles.actionsSection}>
        <h2 className={styles.sectionTitle}>Actions</h2>
        <div className={styles.actionCard}>
          <div className={styles.actionIcon}>📝</div>
          <div className={styles.actionContent}>
            <h3 className={styles.actionTitle}>Take Quiz</h3>
            <p className={styles.actionDescription}>Start a new quiz to test your knowledge.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
