import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Profile from './components/profile/Profile'
import PrivateRoute from './components/routing/PrivateRoute'
import Events from "./components/Events"
import './App.css'
import NewEvent from './components/NewEvent'
import Ticket from './components/ticket/Ticket'
import { StateProvider } from './context/StateContext'
import Analytics from './components/analytics/Analytics'
import EventApproval from './components/admin/EventApproval'
import UpdateProfile from './components/profile/UpdateProfile'
import Dashboard from './components/user/Dashboard'
import Organizerdashboard from './components/organizer/Organizerdashboard'
import UpdateEvent from './components/organizer/UpdateEvent'
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme(); 
function App() {

  return (
    <ThemeProvider theme={theme}>
    <AuthProvider>
      <StateProvider>
        <Layout/>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/events" element={<PrivateRoute><Events /></PrivateRoute>} />
            <Route path="/newevent" element={<PrivateRoute><NewEvent /></PrivateRoute>} />
            <Route path="/ticket/:eventId" element={<PrivateRoute><Ticket /></PrivateRoute>} />
            <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
            <Route path="/eventApproval" element={<PrivateRoute><EventApproval /></PrivateRoute>} />
            <Route path="/approving/:eventId" element={<PrivateRoute><EventApproval /></PrivateRoute>} />
            <Route path="/updateProfile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/organizerdashboard" element={<PrivateRoute><Organizerdashboard /></PrivateRoute>} />
            <Route path="/updateEvent/:eventId" element={<PrivateRoute><UpdateEvent /></PrivateRoute>} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
          </StateProvider>
    </AuthProvider>
    </ThemeProvider>
  )
}

export default App