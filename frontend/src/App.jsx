import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoutes';
import CreatePolicy from './pages/admin/CreatePolicy';
import AvailPolicyCust from './pages/customer/AvailPolicyCust';
import DashboardCust from './pages/customer/DashboardCust';
import MyApplicationCust from './pages/customer/MyApplicationCust';
import ManageUsers from './pages/admin/ManageUsers';
import ManageApplication from './pages/admin/ManageApplication';
import ProfileCust from './pages/customer/ProfileCust';
import ProfileAdmin from './pages/admin/ProfileAdmin';
import QuoteForm from './pages/customer/QuoteForm';
import './styles/theme.css'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
          <Route path="/dashboard" element={<DashboardCust />} />
          <Route path="/available-policy" element={<AvailPolicyCust/>} />
          <Route path="/myapplication" element={<MyApplicationCust/>}/>
          <Route path="/customer-profile" element={<ProfileCust />} />
          <Route path='/quote' element={<QuoteForm/>}/>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/create-policy" element={<CreatePolicy />} />
          <Route path='/manage-users' element={<ManageUsers/>}/>
          <Route path='/manage-application' element={<ManageApplication/>}/>
          <Route path="/admin-profile" element={<ProfileAdmin />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin', 'customer']} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;