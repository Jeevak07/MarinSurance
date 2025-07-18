import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getToken, getRole } from '../utils/authUtils'
// import clearAuth from '../utils/clearAuth'
import '../App.css'
import './navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const [token, setToken] = useState(getToken())
  const [role, setRole] = useState(getRole())
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // const handleLogout = () => {
  //   clearAuth()
  //   setToken(null)
  //   setRole(null)
  //   alert('Logged out!')
  //   navigate('/')
  // }

  useEffect(() => {
    const handleAuthChange = () => {
      setToken(getToken())
      setRole(getRole())
    }
    window.addEventListener('authChanged', handleAuthChange)
    return () => window.removeEventListener('authChanged', handleAuthChange)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <img
            onClick={() => navigate('/')}
            src="/src/assets/MarinSurance_Icon_Logo.jpg"
            alt="MarinSurance"
            className="nav-logo"
          />

          <div className="nav-links">
            <NavLink to="/" className="nav-link">Home</NavLink>

            {token && role === 'customer' && (
              <>
                <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                <NavLink to="/available-policy" className="nav-link">Available Policies</NavLink>
                <NavLink to="/myapplication" className="nav-link">My Applications</NavLink>
              </>
            )}

            {token && role === 'admin' && (
              <>
                <NavLink to="/admin-dashboard" className="nav-link">Dashboard</NavLink>
                <NavLink to="/create-policy" className="nav-link">Create Policy</NavLink>
                <NavLink to="/manage-users" className="nav-link">Manage Users</NavLink>
                <NavLink to="/manage-application" className="nav-link">Manage Applications</NavLink>
              </>
            )}
          </div>

          <div 
            className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
        </div>

        <div className="nav-right">
          {token ? (
            <>
              <div
                className="profile-btn"
                onClick={() => {
                  if (role === 'admin') navigate('/admin-profile')
                  else if (role === 'customer') navigate('/customer-profile')
                }}
              >
                👤
              </div>
              {/* <button onClick={handleLogout}>Logout</button> */}
            </>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">Login</NavLink>
              <NavLink to="/register" className="nav-link">Sign Up</NavLink>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={closeMobileMenu}>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          <NavLink to="/" className="nav-link" onClick={handleLinkClick}>Home</NavLink>

          {token && role === 'customer' && (
            <>
              <NavLink to="/dashboard" className="nav-link" onClick={handleLinkClick}>Dashboard</NavLink>
              <NavLink to="/available-policy" className="nav-link" onClick={handleLinkClick}>Available Policies</NavLink>
              <NavLink to="/myapplication" className="nav-link" onClick={handleLinkClick}>My Applications</NavLink>
            </>
          )}

          {token && role === 'admin' && (
            <>
              <NavLink to="/admin-dashboard" className="nav-link" onClick={handleLinkClick}>Dashboard</NavLink>
              <NavLink to="/create-policy" className="nav-link" onClick={handleLinkClick}>Create Policy</NavLink>
              <NavLink to="/manage-users" className="nav-link" onClick={handleLinkClick}>Manage Users</NavLink>
              <NavLink to="/manage-application" className="nav-link" onClick={handleLinkClick}>Manage Applications</NavLink>
            </>
          )}

          <div className="mobile-nav-right">
            {token ? (
              <>
                <div
                  className="profile-btn"
                  onClick={() => {
                    if (role === 'admin') navigate('/admin-profile')
                    else if (role === 'customer') navigate('/customer-profile')
                    setIsMobileMenuOpen(false)
                  }}
                >
                  👤
                </div>
                {/* <button onClick={handleLogout}>Logout</button> */}
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-link" onClick={handleLinkClick}>Login</NavLink>
                <NavLink to="/register" className="nav-link" onClick={handleLinkClick}>Sign Up</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar