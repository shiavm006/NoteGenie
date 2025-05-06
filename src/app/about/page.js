import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>About NoteGinie</h1>
        <p className={styles.subtitle}>
          Your ultimate digital companion for organizing books, notes, and knowledge. 
          Discover how NoteGinie can transform your learning and reading experience.
        </p>
      </header>

      <div className={styles.sectionGrid}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span>📚</span> Our Mission
          </h2>
          <p className={styles.sectionContent}>
            NoteGinie was created with a simple yet powerful mission: to help readers, 
            students, and knowledge enthusiasts organize their books and notes in one 
            centralized, easy-to-access platform. We believe that knowledge should be 
            accessible and well-organized, enabling you to focus on learning rather than 
            searching for information.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span>💡</span> What We Offer
          </h2>
          <p className={styles.sectionContent}>
            NoteGinie provides a comprehensive solution for managing your books, 
            creating detailed notes, and connecting ideas across different sources. 
            Our platform features intuitive organization tools, powerful search capabilities, 
            and seamless integration with your reading workflow.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span>🚀</span> Our Vision
          </h2>
          <p className={styles.sectionContent}>
            We envision a world where knowledge management is effortless and enjoyable. 
            NoteGinie aims to become the go-to platform for readers and learners worldwide, 
            continuously evolving with new features and improvements based on user feedback 
            and technological advancements.
          </p>
        </div>
      </div>

      <section className={styles.teamSection}>
        <h2 className={styles.teamTitle}>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <div className={styles.avatar} style={{ backgroundColor: '#e0e0e0', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '40px' }}>👩‍💻</span>
            </div>
            <h3 className={styles.memberName}>Alex Johnson</h3>
            <p className={styles.memberRole}>Founder & Lead Developer</p>
            <p className={styles.memberBio}>
              With over 10 years of experience in software development, Alex leads our 
              technical team with passion and innovation.
            </p>
          </div>

          <div className={styles.teamMember}>
            <div className={styles.avatar} style={{ backgroundColor: '#e0e0e0', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '40px' }}>👨‍🎨</span>
            </div>
            <h3 className={styles.memberName}>Sarah Chen</h3>
            <p className={styles.memberRole}>UX/UI Designer</p>
            <p className={styles.memberBio}>
              Sarah brings her artistic vision and user-centered design approach to create 
              intuitive and beautiful interfaces.
            </p>
          </div>

          <div className={styles.teamMember}>
            <div className={styles.avatar} style={{ backgroundColor: '#e0e0e0', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '40px' }}>👨‍💼</span>
            </div>
            <h3 className={styles.memberName}>Michael Rodriguez</h3>
            <p className={styles.memberRole}>Product Manager</p>
            <p className={styles.memberBio}>
              Michael ensures that NoteGinie meets the needs of our users through strategic 
              planning and feature prioritization.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.contactSection}>
        <h2 className={styles.contactTitle}>Get in Touch</h2>
        <p className={styles.contactText}>
          Have questions, suggestions, or feedback? We'd love to hear from you! 
          Our team is dedicated to improving NoteGinie based on user input.
        </p>
        <Link href="/contact" className={styles.button}>
          Contact Us
        </Link>
      </section>
    </div>
  );
}