import { useState } from 'react'
import api from '../services/api'
import './styles/register.css'


const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/signup', form)
      alert('User registered successfully!')
    } catch (err) {
      alert(err.response?.data || 'Registration failed')
    }
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" required />
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" required />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
        <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address" />
        <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
