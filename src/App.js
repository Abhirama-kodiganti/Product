import React from "react"
import { FaSearch, FaHome, FaUpload, FaFileAlt } from "react-icons/fa"

const categories = [
  { name: "Cakes & Bakes", image: "/placeholder.svg", href: "/categories/cakes-bakes" },
  { name: "Biscuits", image: "/placeholder.svg", href: "/categories/biscuits" },
  { name: "Breakfast & Spreads", image: "/placeholder.svg", href: "/categories/breakfast-spreads" },
  { name: "Chocolates & Desserts", image: "/placeholder.svg", href: "/categories/chocolates-desserts" },
  { name: "Snacks & Namkeen", image: "/placeholder.svg", href: "/categories/snacks-namkeen" },
  { name: "Beverages", image: "/placeholder.svg", href: "/categories/beverages" },
  { name: "Dairy Products", image: "/placeholder.svg", href: "/categories/dairy" },
  { name: "Ready to Cook", image: "/placeholder.svg", href: "/categories/ready-to-cook" },
]

function App() {
  return (
    <div className="container">
      <header className="header">
        <div className="header-text">
          <h1>Abhiram</h1>
          <h2>Welcome to TruthIn</h2>
        </div>
        <div className="user-info">
          <span className="badge">Basic</span>
          <div className="avatar">
            <img src="/placeholder.svg" alt="User avatar" />
          </div>
        </div>
      </header>

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="search"
          placeholder="Search for Packaged Foods"
          className="search-input"
          aria-label="Search for Packaged Foods"
        />
      </div>

      <div className="promo-banner">
        <div className="banner-content">
          <div className="banner-text">
            <h3>LABEL</h3>
            <p>
              Samjhega
              <br />
              India
            </p>
            <button className="scan-button">
              Scan Now
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="banner-image">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-26%20at%2011.20.49_b26f19db.jpg-M0AQ8P5urAZcen8gAR8cBY1Sxi18lh.jpeg"
              alt="Promotional banner showing packaged food products"
            />
          </div>
        </div>
      </div>

      <section className="categories">
        <h2>All Categories</h2>
        <div className="category-grid">
          {categories.map((category) => (
            <a key={category.name} href={category.href} className="category-card">
              <div className="category-image">
                <img src={category.image || "/placeholder.svg"} alt={`${category.name} category`} />
              </div>
              <h3 className="category-name">{category.name}</h3>
            </a>
          ))}
        </div>
      </section>

      <nav className="bottom-nav">
        <div className="nav-items">
          <a href="/" className="nav-item active">
            <FaHome aria-hidden="true" />
            <span>Home</span>
          </a>
          <a href="/search" className="nav-item">
            <FaSearch aria-hidden="true" />
            <span>Search</span>
          </a>
          <a href="/scan" className="nav-item">
            <div className="scan-button-nav">
              <div aria-hidden="true"></div>
            </div>
            <span>Scan</span>
          </a>
          <a href="/upload" className="nav-item">
            <FaUpload aria-hidden="true" />
            <span>Upload</span>
          </a>
          <a href="/list" className="nav-item">
            <FaFileAlt aria-hidden="true" />
            <span>Shop List</span>
          </a>
        </div>
      </nav>
    </div>
  )
}

export default App

