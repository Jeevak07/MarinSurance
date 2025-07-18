import { useEffect, useState } from 'react'
import api from '../../services/api'
import { getToken, clearAuth } from '../../utils/authUtils'
import { useNavigate } from 'react-router-dom'
import './custStyle/profileCust.css'

const ProfileCust = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('overview')
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken()
        const res = await api.get('/profile', {
          headers: { 'authorization': `Bearer ${token}` }
        })
        setProfile(res.data)
        setFormData(res.data)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch profile:', err)
        alert('Session expired. Please login again.')
        navigate('/login')
      }
    }
    fetchProfile()
  }, [navigate])

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('authChanged'))
    clearAuth()
    navigate('/')
  }

  const handleEdit = () => setEditing(true)
  const handleCancel = () => {
    setEditing(false)
    setFormData(profile)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    try {
      const token = getToken()
      const res = await api.put(`/update/${profile._id}`, formData, {
        headers: { 'authorization': `Bearer ${token}` }
      })
      setProfile(res.data)
      setEditing(false)
      alert('Profile updated successfully')
    } catch (err) {
      console.error('Failed to update profile:', err)
      alert('Update failed')
    }
  }

  if (loading) return <p className="profile-loading">Loading Profile...</p>

  return (
    <div className="profile-layout">
      <aside className="profile-sidebar">
        <div className="profile-avatar">
          {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <h3>{profile.name}</h3>
        <p>{profile.email}</p>

        <nav className="profile-nav">
          <button onClick={() => setActiveSection('overview')}>Personal Details</button>
          <button onClick={() => setActiveSection('policies')}>Policy Summary</button>
          <button onClick={() => setActiveSection('account')}>Account</button>
          {/* <button onClick={handleLogout}>Logout</button> */}
        </nav>
      </aside>

      <main className="profile-main">
        {activeSection === 'overview' && (
          <div>
            <h2>Personal Details</h2>
            <p><strong>Name:</strong> {editing ? <input name="name" value={formData.name} onChange={handleChange} /> : profile.name}</p>
            <p><strong>Phone:</strong> {editing ? <input name="phone" value={formData.phone || ''} onChange={handleChange} /> : (profile.phone || 'Not Provided')}</p>
            <p><strong>Address:</strong> {editing ? <input name="address" value={formData.address || ''} onChange={handleChange} /> : (profile.address || 'Not Provided')}</p>
            <p><strong>DOB:</strong> {editing ? (
              <input
                type="date"
                name="dob"
                value={formData.dob ? formData.dob.slice(0, 10) : ''}
                max={new Date().toISOString().split('T')[0]}
                onChange={handleChange}
              />
            ) : (profile.dob ? profile.dob.slice(0, 10) : 'Not Set')}</p>

            {editing ? (
              <div className="profile-actions">
                <button onClick={handleSave} className="btn-primary">Save</button>
                <button onClick={handleCancel} className="btn-secondary">Cancel</button>
              </div>
            ) : (
              <button onClick={handleEdit} className="btn-primary">Edit Profile</button>
            )}
          </div>
        )}

        {activeSection === 'policies' && (
          <div>
            <h2>Policy Summary</h2>
            <p><strong>Active Policies:</strong> 2</p>
            <p><strong>Pending Applications:</strong> 1</p>
            <p><strong>Rejected Applications:</strong> 0</p>
          </div>
        )}
        {activeSection === 'account' && (
  <div>
    <h2>Account Settings</h2>

    <p><strong>Email:</strong> {profile.email}</p>
    <p><strong>Joined On:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>

    <div className="account-settings-group">
      <label>Receive Email Notifications</label>
      <input type="checkbox" checked={true} readOnly />
    </div>

    <div className="account-settings-group">
      {/* <label>Change Password</label> */}
      {/* <button className="btn-secondary" disabled>Coming Soon</button> */}
    </div>

    <div style={{ marginTop: '20px' }}>
      <button onClick={handleLogout} className="btn-primary">Logout</button>
    </div>
  </div>
)}

      </main>
    </div>
  )
}

export default ProfileCust
