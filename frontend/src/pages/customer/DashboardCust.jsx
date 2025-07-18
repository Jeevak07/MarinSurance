import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { getToken } from '../../utils/authUtils';
import './custStyle/dashboard.css';

const CustomerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/applications/my-applications', {
          headers: { Authorization: `Bearer ${getToken()}` }
        });
        setApplications(res.data);

        const recent = res.data
          .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
          .slice(0, 5)
          .map(app => ({
            title: app.policyId.title,
            status: app.status,
            time: new Date(app.appliedAt).toLocaleString()
          }));
        setRecentActivity(recent);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchApplications();
  }, []);

  // summary counts
  const total = applications.length;
  const pending = applications.filter(app => app.status === 'Pending').length;
  const rejected = applications.filter(app => app.status === 'Rejected').length;
  const approved = applications.filter(app => app.status === 'Approved').length;
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="summary-cards">
        <div className="card">Applications <b>{total}</b></div>
        <div className="card">Pending <b>{pending}</b></div>
        <div className="card">Rejected <b>{rejected}</b></div>
        <div className="card">Approved <b>{approved}</b></div>
      </div>

      <h3>Recent Activity</h3>
      <div className="recent-activity">
        {recentActivity.length === 0 ? (
          <p>No recent activities.</p>
        ) : (
          recentActivity.map((activity, idx) => (
            <div key={idx} className="activity-item">
              <p>{activity.status === 'Pending' ? 'Applied for' : 'Application ' + activity.status + ':'} <b>{activity.title}</b></p>
              <small>{activity.time}</small>
            </div>
          ))
        )}
      </div>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          className="btn-primary"
          onClick={() => window.location.href='/myapplication'}
        >
          See All Applications
        </button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
