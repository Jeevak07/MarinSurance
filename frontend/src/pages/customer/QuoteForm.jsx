import React, { useState } from 'react';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    insuranceType: '',
    cargoValue: '',
    origin: '',
    destination: '',
    voyageDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can call your backend API to calculate premium
    console.log('Form Submitted:', formData);
    // Maybe navigate to a 'Quote Result' page or show result here
  };

  return (
    <div className="quote-form">
      <h2>Get Your Instant Quote</h2>
      <form onSubmit={handleSubmit}>
        <select name="insuranceType" onChange={handleChange}>
          <option value="">Select Insurance Type</option>
          <option value="Cargo">Cargo Insurance</option>
          <option value="Hull">Hull Insurance</option>
          <option value="Freight">Freight Insurance</option>
        </select>

        <input
          type="text"
          name="cargoValue"
          placeholder="Cargo Value (₹)"
          onChange={handleChange}
        />
        <input
          type="text"
          name="origin"
          placeholder="Origin Port"
          onChange={handleChange}
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination Port"
          onChange={handleChange}
        />
        <input
          type="date"
          name="voyageDate"
          onChange={handleChange}
        />

        <button type="submit">Get Quote</button>
      </form>
    </div>
  );
};

export default QuoteForm;
