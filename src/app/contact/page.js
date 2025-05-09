import styles from './page.module.css';

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>
          Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </header>

      <div className={styles.contactContent}>
        <form className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Your Name</label>
            <input type="text" id="name" className={styles.input} required />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input type="email" id="email" className={styles.input} required />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.label}>Subject</label>
            <input type="text" id="subject" className={styles.input} required />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.label}>Message</label>
            <textarea id="message" className={styles.textarea} rows="5" required></textarea>
          </div>
          
          <button type="submit" className={styles.submitButton}>Send Message</button>
        </form>
        
        <div className={styles.infoCard}>
          <h2 className={styles.infoTitle}>Get in Touch</h2>
          
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>📧</div>
            <div className={styles.infoContent}>
              <h3 className={styles.infoLabel}>Email</h3>
              <p className={styles.infoText}>Shivammittal42006@gmail.com</p>
            </div>
          </div>
          
          <div className={styles.infoItem}>
            <div className={styles.infoIcon}>📱</div>
            <div className={styles.infoContent}>
              <h3 className={styles.infoLabel}>Phone</h3>
              <p className={styles.infoText}>+91 9810571604</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
