import Link from "next/link"
import styles from "./Footer.module.css"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>&copy; {currentYear} NOTE-GINIE. All rights reserved.</div>
        <div className={styles.links}>
          <Link href="/privacy-policy" className={styles.link}>
            Privacy Policy
          </Link>
          <Link href="/terms-of-use" className={styles.link}>
            Terms of Use
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  )
}
