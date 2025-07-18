import { useEffect, useState } from 'react'
import api from '../../services/api'
import { getToken } from '../../utils/authUtils'
import { useNavigate } from 'react-router-dom'
import './adminStyle/adminProfile.css'

const ProfileAdmin = () => {
  const [profile, setProfile] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken()

        const profileRes = await api.get('/profile', {
          headers: { 'authorization': `Bearer ${token}` }
        })
        setProfile(profileRes.data)

        const statsRes = await api.get('/admin/dashboard-stats', {
          headers: { 'authorization': `Bearer ${token}` }
        })
        setStats(statsRes.data)

        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch admin data:', err)
        alert('Session expired. Please login again.')
        navigate('/login')
      }
    }

    fetchData()
  }, [navigate])

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('authChanged'))
    navigate('/');
    alert('Logged out!');
  }

  if (loading) return <p className="profile-loading">Loading Admin Profile...</p>

  return (
    <div className="profile-layout">
      {/* Sidebar */}
      <div className="profile-sidebar">
        <div className="profile-avatar">
          {profile?.name ? profile.name.charAt(0).toUpperCase() : 'A'}
        </div>
        <h3>{profile?.name || 'Admin'}</h3>
        <p>{profile?.email || 'admin@example.com'}</p>
        <p className="role-badge">{profile?.role || 'Administrator'}</p>
        
        <div className="profile-nav">
          <button 
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'stats' ? 'active' : ''}
            onClick={() => setActiveTab('stats')}
          >
            Statistics
          </button>
          <button 
            className={activeTab === 'applications' ? 'active' : ''}
            onClick={() => setActiveTab('applications')}
          >
            Applications
          </button>
          <button 
            className={activeTab === 'activity' ? 'active' : ''}
            onClick={() => setActiveTab('activity')}
          >
            Activity Logs
          </button>
          <button 
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        <div className="profile-actions" style={{ marginTop: '2rem' }}>
          <button className="btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-main">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <h2>Admin Overview</h2>
            <p>
              <strong>Name:</strong>
              <span>{profile?.name || 'Not specified'}</span>
            </p>
            <p>
              <strong>Email:</strong>
              <span>{profile?.email || 'Not specified'}</span>
            </p>
            <p>
              <strong>Role:</strong>
              <span>{profile?.role || 'Administrator'}</span>
            </p>
            <p>
              <strong>Account Created:</strong>
              <span>{profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Not available'}</span>
            </p>
            <p>
              <strong>Last Login:</strong>
              <span>{profile?.lastLogin ? new Date(profile.lastLogin).toLocaleDateString() : 'Not available'}</span>
            </p>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div>
            <h2>Platform Statistics</h2>
            <p>
              <strong>Total Users:</strong>
              <span>{stats?.totalUsers || 0}</span>
            </p>
            <p>
              <strong>Total Policies:</strong>
              <span>{stats?.totalPolicies || 0}</span>
            </p>
            <p>
              <strong>Total Applications:</strong>
              <span>{stats?.totalApplications || 0}</span>
            </p>
            <p>
              <strong>Pending Applications:</strong>
              <span>{stats?.pending || 0}</span>
            </p>
            <p>
              <strong>Approved Applications:</strong>
              <span>{stats?.approved || 0}</span>
            </p>
            <p>
              <strong>Rejected Applications:</strong>
              <span>{stats?.rejected || 0}</span>
            </p>
            <p>
              <strong>Active Policies:</strong>
              <span>{stats?.activePolicies || 0}</span>
            </p>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div>
            <h2>Application Management</h2>
            <p>
              <strong>Feature Status:</strong>
              <span>Coming Soon</span>
            </p>
            <p>
              <strong>Description:</strong>
              <span>This section will allow you to manage all user applications, review pending requests, and track application statuses.</span>
            </p>
            <p>
              <strong>Planned Features:</strong>
              <span>Application review, bulk actions, status updates, and detailed application views.</span>
            </p>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div>
            <h2>Activity Logs</h2>
            <p>
              <strong>System Status:</strong>
              <span>Active</span>
            </p>
            <p>
              <strong>Log Tracking:</strong>
              <span>Implementation in progress</span>
            </p>
            <p>
              <strong>Description:</strong>
              <span>This section will display recent system activities, user actions, and administrative operations.</span>
            </p>
            <p>
              <strong>Planned Features:</strong>
              <span>Real-time activity feeds, user action tracking, system event logs, and audit trails.</span>
            </p>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <h2>Admin Settings</h2>
            <p>
              <strong>Account Management:</strong>
              <span>Full Access</span>
            </p>
            <p>
              <strong>System Configuration:</strong>
              <span>Available</span>
            </p>
            <p>
              <strong>User Management:</strong>
              <span>Enabled</span>
            </p>
            <p>
              <strong>Security Settings:</strong>
              <span>Active</span>
            </p>
            
            <div className="account-settings-group">
              <label>Enable Email Notifications</label>
              <input type="checkbox" defaultChecked />
            </div>
            
            <div className="account-settings-group">
              <label>Enable System Alerts</label>
              <input type="checkbox" defaultChecked />
            </div>
            
            <div className="account-settings-group">
              <label>Auto-approve Applications</label>
              <input type="checkbox" />
            </div>

            <div className="profile-actions">
              <button className="btn-primary">Save Settings</button>
              <button className="btn-secondary">Reset to Default</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileAdmin