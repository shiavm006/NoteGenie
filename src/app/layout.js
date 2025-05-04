import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Textbook Companion",
  description: "Your study companion for textbooks",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="layout">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
