import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ThemeToggle from "../components/ThemeToggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Note-Ginie",
  description: "Your study companion for textbooks",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="layout">
          <Navbar />
          <div className="theme-toggle-container" style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}>
            <ThemeToggle />
          </div>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
