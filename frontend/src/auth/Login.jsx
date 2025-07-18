import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import './styles/login.css'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.user.role)
      window.dispatchEvent(new Event('authChanged'))
      // alert('Login successful!')
      navigate('/')
      console.log('Token stored:', localStorage.getItem('token'));
      console.log('Role stored:', localStorage.getItem('role'));
      
    } catch (err) {
      alert(err.response.data)
      console.error('Login error:', err)
    }
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
