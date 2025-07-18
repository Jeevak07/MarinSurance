import { useState } from 'react';
import React from 'react';
import api from '../../services/api';
import { getToken } from '../../utils/authUtils';
import '../../createPolicy.css';
// import '../../App.css'


const CreatePolicy = () => {
  const [form, setForm] = useState({
    title: '',
    coverageAmount: '',
    premium: '',
    tenure: '',
    description: ''
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('policy/create', form, {
        headers: { authorization: `Bearer ${getToken()}` },
      });
      alert('Policy created successfully!');
      setForm({
        title: '',
        coverageAmount: '',
        premium: '',
        tenure: '',
        description: ''
      });
    } catch (err) {
      console.error('Error creating policy:', err);
      alert('Failed to create policy.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Create New Policy</h2>

        <label>Policy Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Policy Title"
          required
        />

        <label>Coverage Amount (₹)</label>
        <input
          name="coverageAmount"
          value={form.coverageAmount}
          type="number"
          min="0"
          onChange={handleChange}
          placeholder="Coverage Amount"
          required
        />

        <label>Premium (₹)</label>
        <input
          name="premium"
          value={form.premium}
          type="number"
          min="0"
          onChange={handleChange}
          placeholder="Premium"
          required
        />

        <label>Tenure (years)</label>
        <input
          name="tenure"
          value={form.tenure}
          type="number"
          min="1"
          onChange={handleChange}
          placeholder="Tenure"
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (optional)"
          rows="4"
        />

        <button type="submit">Create Policy</button>
      </form>
    </div>
  );
};

export default CreatePolicy;
