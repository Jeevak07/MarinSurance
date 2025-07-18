import React, { useEffect, useState } from 'react'
import api from '../../services/api';
import { getToken } from '../../utils/authUtils';
import './adminStyle/manageApplications.css'
const ManageApplication = () => {
  const [applications,setApplications] = useState([]);

    useEffect(()=>{
        const fetchApplications = async () => {
            try {
                const res = await api.get('/admin/application-list',{
                    headers:{Authorization: `Bearer ${getToken()}`}     
                })
                setApplications(res.data);
            } catch (error) {
                console.error('Error fetching applications:', error);

            }
        }
        fetchApplications();
    },[])

    const handleApprove = async (id) => {
        try {
          await api.put(`/admin/update-application/${id}`, { status: 'Approved' }, {
            headers: { Authorization: `Bearer ${getToken()}` }
          });
          alert('Application Approved Successfully!');
          window.location.reload();
        } catch (error) {
          console.error('Error approving application:', error);
          alert('Error approving application. Please try again.');
        }
      };
      
      const handleReject = async (id) => {
        try {
          await api.put(`/admin/update-application/${id}`, { status: 'Rejected' }, {
            headers: { Authorization: `Bearer ${getToken()}` }
          });
          alert('Application Rejected Successfully!');
          window.location.reload();
        } catch (error) {
          console.error('Error rejecting application:', error);
          alert('Error rejecting application. Please try again.');
        }
      };
      
  return (
    <>
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="applications-grid">
      {applications.map((app) => (
        <div key={app._id} className="application-card">
            <h3>{app.policyId.title}</h3>
            <p><b>Customer:</b> {app.userId ? `${app.userId.name} (${app.userId.email})` : 'N/A'}</p>
            <p><b>Coverage:</b> ₹{app.policyId.coverageAmount}</p>
            <p><b>Premium:</b> ₹{app.policyId.premium}</p>
            <p><b>Tenure:</b> {app.policyId.tenure} years</p>
            <p><b>Status:</b> <span className={`status ${app.status.toLowerCase()}`}>{app.status}</span></p>
            <div className="action-btns">
            {app.status === 'Pending' && (
                <>
                <button className="approve-btn" onClick={() => handleApprove(app._id)}>Approve</button>
                <button className="reject-btn" onClick={() => handleReject(app._id)}>Reject</button>
                </>
            )}
            </div>
            <p><small>Applied at: {new Date(app.appliedAt).toLocaleString()}</small></p>
        </div>
    ))}
      </div>
    </div>
    </>
  )
}

export default ManageApplication
