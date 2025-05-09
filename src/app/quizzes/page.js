import styles from './page.module.css';

export default function QuizzesPage() {
  // Sample quiz data
  const quizzes = [
    { id: 1, title: 'Literature Basics', questions: 10, difficulty: 'Easy', category: 'Literature' },
    { id: 2, title: 'Advanced Mathematics', questions: 15, difficulty: 'Hard', category: 'Mathematics' },
    { id: 3, title: 'World History', questions: 12, difficulty: 'Medium', category: 'History' },
    { id: 4, title: 'Science Fundamentals', questions: 8, difficulty: 'Easy', category: 'Science' },
    { id: 5, title: 'Geography Challenge', questions: 20, difficulty: 'Medium', category: 'Geography' },
    { id: 6, title: 'Computer Science Basics', questions: 15, difficulty: 'Medium', category: 'Computer Science' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>INTERACTIVE QUIZZES</h1>
        <p className={styles.subtitle}>Test your knowledge with our collection of quizzes across various subjects</p>
      </header>

      <div className={styles.filterContainer}>
        <button className={styles.filterButton}>Filter Quizzes</button>
        <button className={styles.clearButton}>Clear Filters</button>
      </div>

      <section className={styles.quizCollection}>
        <h2 className={styles.sectionTitle}>Available Quizzes</h2>
        <p className={styles.sectionDescription}>Browse through our collection of quizzes</p>
        
        <div className={styles.quizGrid}>
          {quizzes.map(quiz => (
            <div key={quiz.id} className={styles.quizCard}>
              <div className={styles.quizHeader}>
                <span className={styles.quizCategory}>{quiz.category}</span>
                <span className={styles.quizDifficulty}>{quiz.difficulty}</span>
              </div>
              <h3 className={styles.quizTitle}>{quiz.title}</h3>
              <p className={styles.quizDetails}>{quiz.questions} Questions</p>
              <div className={styles.quizActions}>
                <button className={styles.startButton}>Start Quiz</button>
                <button className={styles.bookmarkButton}>Save</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
