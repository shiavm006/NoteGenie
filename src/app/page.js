"use client";
import Link from "next/link"
import styles from "./page.module.css"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  // Stats data
  const stats = [
    { id: 1, number: "10K+", label: "Active Students" },
    { id: 2, number: "50K+", label: "Notes Created" },
    { id: 3, number: "95%", label: "Success Rate" },
    { id: 4, number: "24/7", label: "AI Support" },
  ]

  // Sample data for featured notes
  const featuredNotes = [
    { 
      id: 1, 
      title: "Calculus Made Easy", 
      subject: "Math", 
      grade: 12, 
      image: "/placeholder.jpg", 
      tag: "AI Enhanced",
      description: "Interactive notes with AI-generated explanations",
      stats: {
        views: "2.5K",
        saves: "1.2K",
        rating: 4.9
      }
    },
    { 
      id: 2, 
      title: "Biology Concepts", 
      subject: "Science", 
      grade: 10, 
      image: "/placeholder.jpg", 
      tag: "Smart Notes",
      description: "Visual diagrams and key concepts highlighted",
      stats: {
        views: "1.8K",
        saves: "900",
        rating: 4.8
      }
    },
    { 
      id: 3, 
      title: "World History Timeline", 
      subject: "History", 
      grade: 11, 
      image: "/placeholder.jpg", 
      tag: "Interactive",
      description: "Chronological notes with AI-powered summaries",
      stats: {
        views: "3.1K",
        saves: "1.5K",
        rating: 4.9
      }
    },
  ]

  // Sample data for testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Medical Student",
      university: "Harvard University",
      text: "Note-Ginie's AI features help me organize complex medical concepts. The smart summaries are a game-changer!",
      rating: 5,
      image: "/avatar1.jpg"
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      role: "Engineering Student",
      university: "MIT",
      text: "The AI-powered note organization and automatic concept linking have saved me hours of study time.",
      rating: 5,
      image: "/avatar2.jpg"
    },
    {
      id: 3,
      name: "Priya Singh",
      role: "High School Student",
      university: "Delhi Public School",
      text: "I love how easy it is to find and review my notes before exams. The quizzes are super helpful!",
      rating: 4,
      image: "/avatar3.jpg"
    },
    {
      id: 4,
      name: "Michael Brown",
      role: "History Major",
      university: "Oxford University",
      text: "The concept mapping and AI summaries make studying so much more efficient. Highly recommended!",
      rating: 5,
      image: "/avatar4.jpg"
    },
    {
      id: 5,
      name: "Emily Wang",
      role: "Biology Student",
      university: "Stanford University",
      text: "The clean design and smart features make Note-Ginie my favorite study tool.",
      rating: 5,
      image: "/avatar5.jpg"
    },
    {
      id: 6,
      name: "Lucas Meyer",
      role: "Computer Science Student",
      university: "TU Munich",
      text: "The AI-powered summaries and analytics help me focus on what matters most. Love the interface!",
      rating: 5,
      image: "/avatar6.jpg"
    },
  ]

  // Sample data for features
  const features = [
    { 
      id: 1, 
      name: "AI Note Organization", 
      icon: "🤖", 
      description: "Smart categorization and linking of related concepts",
      benefits: ["Automatic tagging", "Concept linking", "Smart folders"]
    },
    { 
      id: 2, 
      name: "Smart Summaries", 
      icon: "📝", 
      description: "Automatic generation of concise study summaries",
      benefits: ["Key points extraction", "Custom summary length", "Topic highlighting"]
    },
    { 
      id: 3, 
      name: "Concept Mapping", 
      icon: "🗺️", 
      description: "Visual representation of connected ideas",
      benefits: ["Interactive mind maps", "Relationship visualization", "Custom layouts"]
    },
    { 
      id: 4, 
      name: "Study Analytics", 
      icon: "📊", 
      description: "Track your learning progress and focus areas",
      benefits: ["Progress tracking", "Study patterns", "Performance insights"]
    },
  ]

  // Carousel logic for infinite loop
  const [current, setCurrent] = useState(0)
  const [visibleCount, setVisibleCount] = useState(2)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const testimonialCount = testimonials.length
  const intervalRef = useRef()
  const carouselRef = useRef()

  // Responsive visibleCount
  useEffect(() => {
    function updateVisibleCount() {
      if (window.innerWidth < 768) {
        setVisibleCount(1)
      } else {
        setVisibleCount(2)
      }
    }
    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)
    return () => window.removeEventListener('resize', updateVisibleCount)
  }, [])

  // Infinite loop logic
  const slides = [
    ...testimonials.slice(-visibleCount),
    ...testimonials,
    ...testimonials.slice(0, visibleCount)
  ]
  const slideCount = slides.length
  const realSlideStart = visibleCount
  const realSlideEnd = testimonialCount + visibleCount

  // Set up auto-scroll
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)
      setCurrent((prev) => prev + 1)
    }, 4000)
    return () => clearInterval(intervalRef.current)
  }, [visibleCount, testimonialCount])

  // Handle transition end for infinite loop
  useEffect(() => {
    if (!isTransitioning) return
    const handle = setTimeout(() => {
      setIsTransitioning(false)
      if (current >= realSlideEnd) {
        setCurrent(realSlideStart)
      } else if (current < realSlideStart) {
        setCurrent(realSlideEnd - 1)
      }
    }, 700)
    return () => clearTimeout(handle)
  }, [current, isTransitioning, realSlideEnd, realSlideStart])

  // Initialize current index
  useEffect(() => {
    setCurrent(realSlideStart)
  }, [visibleCount, realSlideStart])

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroImageBehind}>
          <img src="/ai-notes-app.jpg" alt="AI Notes App" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit'}} />
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>AI-Powered Note Taking</div>
          <h1 className={styles.heroTitle}>Welcome to Note-Ginie!</h1>
          <p className={styles.heroSubtitle}>Your AI-powered note-taking companion for academic success.</p>
          <div className={styles.heroSearch}>
            <input type="text" placeholder="Search your notes or ask AI..." className={styles.searchInput} />
            <button className={styles.searchButton}>Ask AI</button>
          </div>
          <div className={styles.heroButtons}>
            <Link href="/books" className={styles.btnSecondary}>
              See How It Works
            </Link>
            <Link href="/books" className={styles.btnPrimary}>
              Start Taking Smart Notes
            </Link>
          </div>
          <div className={styles.heroStats}>
            {stats.map((stat) => (
              <div key={stat.id} className={styles.statItem}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Smart Features</h2>
          <p className={styles.sectionSubtitle}>Experience the power of AI in your note-taking</p>
        </div>
        <div className={styles.featureGrid}>
          {features.map((feature) => (
            <div key={feature.id} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureName}>{feature.name}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
              <ul className={styles.featureBenefits}>
                {feature.benefits.map((benefit, index) => (
                  <li key={index} className={styles.benefitItem}>
                    <span className={styles.benefitIcon}>✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Notes Section */}
      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Notes</h2>
          <p className={styles.sectionSubtitle}>Discover AI-enhanced study materials</p>
          <Link href="/books" className={styles.viewAllLink}>
            Browse All Notes
          </Link>
        </div>

        <div className={styles.featuredGrid}>
          {featuredNotes.map((note) => (
            <div key={note.id} className={styles.bookCard}>
              <div className={styles.bookTag}>{note.tag}</div>
              <div className={styles.bookImageContainer}>
                <div className={styles.bookImagePlaceholder}></div>
              </div>
              <div className={styles.bookInfo}>
                <h3 className={styles.bookTitle}>{note.title}</h3>
                <p className={styles.bookDetails}>
                  Subject: {note.subject}, Grade: {note.grade}
                </p>
                <p className={styles.noteDescription}>{note.description}</p>
                <div className={styles.noteStats}>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>👁️</span>
                    {note.stats.views}
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>💾</span>
                    {note.stats.saves}
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statIcon}>⭐</span>
                    {note.stats.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Student Success Stories</h2>
          <p className={styles.sectionSubtitle}>See how Note-Ginie is transforming study habits</p>
          <button className={styles.reviewButton}>Share Your Success Story</button>
        </div>
        <div className={styles.testimonialGrid} style={{overflow: 'hidden', position: 'relative'}}>
          <div
            ref={carouselRef}
            style={{
              display: 'flex',
              transition: isTransitioning ? 'transform 0.7s cubic-bezier(0.4,0,0.2,1)' : 'none',
              transform: `translateX(-${current * (100 / visibleCount)}%)`,
              width: `${(slideCount / visibleCount) * 100}%`
            }}
          >
            {slides.map((testimonial, idx) => (
              <div
                key={testimonial.id + '-' + idx}
                className={styles.testimonialCard}
                style={{
                  minWidth: `calc(${100 / slideCount}% - 30px)`,
                  marginRight: 30,
                  opacity: idx >= current && idx < current + visibleCount ? 1 : 0.7,
                  transition: 'opacity 0.5s'
                }}
              >
                <div className={styles.testimonialHeader}>
                  <div className={styles.testimonialAvatar}>
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className={styles.testimonialInfo}>
                    <div className={styles.testimonialName}>{testimonial.name}</div>
                    <div className={styles.testimonialRole}>{testimonial.role}</div>
                    <div className={styles.testimonialUniversity}>{testimonial.university}</div>
                  </div>
                  <div className={styles.testimonialRating} aria-label={`Rated ${testimonial.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} style={{ color: i < testimonial.rating ? '#FFD600' : '#E0E0E0', fontSize: '1.2em', marginRight: 2 }}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className={styles.testimonialText}>{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}