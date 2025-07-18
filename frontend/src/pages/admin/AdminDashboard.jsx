import React, { useEffect } from 'react'
import api from '../../services/api';
import { getToken } from '../../utils/authUtils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminStyle/adminDashboard.css'

const AdminDashboard = () => {
    const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/admin/application-list', {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        setApplications(res.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
    fetchApplications();
  }, []);

  const pendingApps = applications.filter(app => app.status === 'Pending');

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-stats">
        <p>Total Applications: {applications.length}</p>
        <p>Pending: {pendingApps.length}</p>
        <p>Approved: {applications.filter(app => app.status === 'Approved').length}</p>
      </div>

      <h3>Latest Pending Applications</h3>
      <div className="applications-grid">
        {pendingApps.slice(0, 3).map(app => (
          <div key={app._id} className="application-card">
            <h4>{app.policyId.title}</h4>
            <p><b>Customer:</b> {app.userId?.name}</p>
            <p><b>Status:</b> {app.status}</p>
          </div>
        ))}
      </div>

      <button className="manage-btn" onClick={() => navigate('/manage-application')}>
        Manage Applications
      </button>
    </div>
  );
}


export default AdminDashboard;
