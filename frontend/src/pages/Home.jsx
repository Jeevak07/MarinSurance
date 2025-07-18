import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './home.css'

const Home = () => {
  const role = localStorage.getItem('role')
  const token = localStorage.getItem('token')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('http://localhost:3000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        setName(data.name)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    if (token) {
      fetchUserData()
    }
  }, [token])

  return (
    <div className="page-container">
    
      <div className="hero-section">
        <h1 className="main-title">Welcome to MarinSurance</h1>
        <p className="hero-desc">
          India’s premier marine insurance platform — protecting every voyage, every time.
          We secure your cargo, hull, and marine liabilities so you can sail with confidence.
        </p>
      </div>

      <div className="trust-strip">
        ⭐ 2,000+ reviews · Trusted by 500,000+ marine businesses & travelers
      </div>

      <h2>
        {role === 'admin'
          ? `Welcome back, ${name}!`
          : role === 'customer'
          ? `Welcome aboard, ${name}!`
          : ''}
      </h2>


      <div className="btn-group">
        {!token && (
          <>
            <button onClick={() => navigate('/login')}>Get Quote</button>
            <button onClick={() => navigate('/login')}>See All Coverages</button>
          </>
        )}
      </div>

      <div className="info-section">
        <h2>How MarinSurance Works</h2>
        <div className="card-grid">
          <div className="card">
            <h3>⚓ Plan Your Voyage</h3>
            <p>Select your destination and shipment details.</p>
          </div>
          <div className="card">
            <h3>💸 Get Instant Quotes</h3>
            <p>Compare tailored insurance options in seconds.</p>
          </div>
          <div className="card">
            <h3>📝 Buy Your Policy</h3>
            <p>Purchase securely online with transparent pricing.</p>
          </div>
          <div className="card">
            <h3>📃 File a Claim</h3>
            <p>Hassle-free online claim management anytime.</p>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>Why MarinSurance?</h2>
        <ul>
          <li>⚓ Trusted by top marine logistics firms.</li>
          <li>💸 Instant online policy quotes & purchase.</li>
          <li>📃 Hassle-free application management.</li>
          <li>🛡️ Coverage for Cargo, Hull, Freight, and Liabilities.</li>
          <li>👨‍✈️ Dedicated customer support for policyholders.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials">
          <div className="testimonial-card">
            <p>
              “MarinSurance made my cargo cover super simple. Getting my policy
              took less than 5 minutes!”
            </p>
            <span>- Alex R.</span>
          </div>
          <div className="testimonial-card">
            <p>
              “Had to file a claim when my shipment got delayed — processed
              smoothly without hassle.”
            </p>
            <span>- Priya M.</span>
          </div>
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <p>👉 Is MarinSurance suitable for both solo shippers and large fleets?</p>
        <p>✅ Yes — we cover individuals and businesses alike.</p>
        <p>👉 How fast can I get a quote?</p>
        <p>✅ In under 60 seconds via our instant quote tool.</p>
        <p>👉 Can I file a claim online?</p>
        <p>✅ Yup, 24/7 through your profile dashboard.</p>
      </div>


      <footer className="footer">
        <p>Contact: +91 98765 43210 | marineSurance@marinSurance.in</p>
        <p>© 2025 MarinSurance. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home
