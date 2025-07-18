import React, { useEffect, useState } from 'react'
import api from '../../services/api';
import { getToken } from '../../utils/authUtils';
import '../customer/custStyle/myApplications.css'

const MyApplicationCust = () => {

  const [application,setApplication] = useState([]);

  useEffect(()=>{
    const fetchApplication = async () => {
      try {
        const res = await api.get('/applications/my-applications',{
          headers: {Authorization: `Bearer ${getToken()}`}
        });
        setApplication(res.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
        alert('Failed to fetch applications.');
      }
    }
    fetchApplication();
  },[])
  return (
    <>
      <div className="page-container">
        <h2>My Applications</h2>
        {application.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <div className="application-card-grid">
          {application.map((app) => (
            <div key={app._id} className="application-card">
              <h3>{app.policyId?.title}</h3>
              <p><b>Coverage:</b> ₹{app.policyId?.coverageAmount}</p>
              <p><b>Premium:</b> ₹{app.policyId?.premium}</p>
              <p><b>Tenure:</b> {app.policyId?.tenure} years</p>
              <p><b>Status:</b> {app.status}</p>
              <p><small>Applied at: {new Date(app.appliedAt).toLocaleString()}</small></p>
            </div>
          ))}
        </div>
        )}
      </div>
    </>
  )
}

export default MyApplicationCust
