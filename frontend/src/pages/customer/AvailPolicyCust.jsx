import React, { useEffect, useState } from 'react'
import api from '../../services/api';
import { getToken } from '../../utils/authUtils';
import '../customer/custStyle/availPolicy.css'


const AvailPolicyCust = () => {
  const [policies , setPolicies] = useState([]);

  useEffect(()=>{
    const fetchPolicies = async ()=>{
      try {
        const policies = await api.get('/policy/available', {
          headers: { Authorization: `Bearer ${getToken()}` }
        })
        setPolicies(policies.data);
      } catch (error) {
        console.error('Error fetching policies:', error);
        alert('Failed to fetch policies.');
      }
    }
    fetchPolicies();
  },[])

  const handleApply = async (policyId)=>{
    try {
      await api.post('/applications/apply', { policyId }, {
        headers:{Authorization: `Bearer ${getToken()}`}
      })
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying for policy:', error);
      alert('Failed to apply for policy.');
    }
  }

  return (
    <div className="page-container">
      <h2>Available Policies</h2>
      {policies.length === 0 ? (
        <p>No policies available right now.</p>
      ) :(
        <div className="policy-card-grid">
  {policies.map((policy) => (
    <div className="policy-card" key={policy._id}>
      <h3>{policy.title}</h3>
      <p><b>Coverage:</b> ₹{policy.coverageAmount}</p>
      <p><b>Premium:</b> ₹{policy.premium}</p>
      <p><b>Tenure:</b> {policy.tenure} year(s)</p>
      <p>{policy.description}</p>
      <button onClick={() => handleApply(policy._id)}>Apply Now</button>
      {/* <button>Apply Now</button> */}
    </div>
  ))}
</div>
      )}
    </div>
  )
}

export default AvailPolicyCust;
