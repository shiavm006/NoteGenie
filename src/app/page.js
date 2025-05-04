import Link from "next/link"
import styles from "./page.module.css"

export default function Home() {
  // Sample data for featured textbooks
  const featuredBooks = [
    { id: 1, title: "Textbook A", subject: "Math", grade: 10, image: "/placeholder.jpg", tag: "New Release" },
    { id: 2, title: "Textbook B", subject: "Science", grade: 8, image: "/placeholder.jpg", tag: "Bestseller" },
    { id: 3, title: "Textbook C", subject: "History", grade: 12, image: "/placeholder.jpg", tag: "Recommended" },
  ]

  // Sample data for testimonials
  const testimonials = [
    {
      id: 1,
      name: "Jane Doe",
      text: "Fantastic textbooks! They helped me understand complex concepts easily.",
      rating: 5,
    },
    { id: 2, name: "John Smith", text: "Great variety of textbooks and excellent study materials.", rating: 5 },
  ]

  // Sample data for subject categories
  const categories = [
    { id: 1, name: "Mathematics", icon: "📘", description: "Explore math textbooks" },
    { id: 2, name: "Science", icon: "🔬", description: "Discover science textbooks" },
    { id: 3, name: "History", icon: "🌍", description: "Find history textbooks" },
    { id: 4, name: "Art", icon: "🎨", description: "Explore art textbooks" },
  ]

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to our Textbook Companion App!</h1>
          <p className={styles.heroSubtitle}>Access a wide range of educational resources and tools.</p>
          <div className={styles.heroSearch}>
            <input type="text" placeholder="Search textbooks..." className={styles.searchInput} />
          </div>
          <div className={styles.heroButtons}>
            <Link href="/books" className={styles.btnSecondary}>
              Learn More
            </Link>
            <Link href="/books" className={styles.btnPrimary}>
              Explore
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.imagePlaceholder}></div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <p className={styles.sectionSubtitle}>Discover our top picks for textbooks.</p>
          <Link href="/books" className={styles.viewAllLink}>
            View All Products
          </Link>
        </div>

        <div className={styles.featuredGrid}>
          {featuredBooks.map((book) => (
            <div key={book.id} className={styles.bookCard}>
              <div className={styles.bookTag}>{book.tag}</div>
              <div className={styles.bookImageContainer}>
                <div className={styles.bookImagePlaceholder}></div>
              </div>
              <div className={styles.bookInfo}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookDetails}>
                  Subject: {book.subject}, Grade: {book.grade}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Customer Reviews</h2>
          <p className={styles.sectionSubtitle}>See what our users are saying about our textbooks.</p>
          <button className={styles.reviewButton}>Write a Review</button>
        </div>

        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.testimonialHeader}>
                <div className={styles.testimonialAvatar}></div>
                <div className={styles.testimonialName}>{testimonial.name}</div>
                <div className={styles.testimonialRating}>{"★".repeat(testimonial.rating)}</div>
              </div>
              <p className={styles.testimonialText}>{testimonial.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Quick Links</h2>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <Link
              href={`/books?category=${category.name.toLowerCase()}`}
              key={category.id}
              className={styles.categoryCard}
            >
              <div className={styles.categoryIcon}>{category.icon}</div>
              <h3 className={styles.categoryName}>{category.name}</h3>
              <p className={styles.categoryDescription}>{category.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}