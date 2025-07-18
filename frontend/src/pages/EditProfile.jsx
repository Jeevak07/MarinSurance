import { useEffect, useState } from 'react'
import api from '../services/api'
import { getToken } from '../utils/authUtils'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    address: '',
    gender: '',
    dob: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/profile', {
          headers: { 'authorization': getToken() }
        })
        setProfile(res.data)
      } catch (err) {
        alert('Failed to fetch profile',err)
        navigate('/login')
      }
    }
    fetchProfile()
  }, [navigate])

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/update/${profile._id}`, profile, {
        headers: { 'authorization': getToken() }
      })
      alert('Profile updated successfully!')
      navigate('/profile')
    } catch (err) {
      alert(err.response?.data || 'Update failed')
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" />
        <input type="text" name="address" value={profile.address} onChange={handleChange} placeholder="Address" />
        <select name="gender" value={profile.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="date" name="dob" value={profile.dob} onChange={handleChange} />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  )
}

export default EditProfile
