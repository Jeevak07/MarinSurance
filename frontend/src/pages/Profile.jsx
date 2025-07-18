import { useEffect, useState } from 'react'
import api from '../services/api'
import { getToken } from '../utils/authUtils'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();
        console.log('Token:', token);

        const res = await api.get('/profile', {
          headers: {
            'authorization': `Bearer ${token}`
          }
        });
  
        setProfile(res.data);
        setLoading(false);
        console.log(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:',err);
        alert('Failed to fetch profile. Please login again.');
        navigate('/profile');
      }
    };
  
    fetchProfile();
  }, [navigate]);
  

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading your profile...</p>

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Your Profile</h2>
        <div><strong>Name:</strong> {profile.name}</div>
        <div><strong>Email:</strong> {profile.email}</div>
        <div><strong>Role:</strong> {profile.role}</div>
        <div><strong>Phone:</strong> {profile.phone || 'Not Provided'}</div>
        <div><strong>Address:</strong> {profile.address || 'Not Provided'}</div>
        <div><strong>Gender:</strong> {profile.gender || 'Not Specified'}</div>
        <div><strong>DOB:</strong> {profile.dob || 'Not Set'}</div>
        <div><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  )
}

export default Profile
