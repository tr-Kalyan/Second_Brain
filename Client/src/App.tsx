import {useState} from 'react';
import {ToastContainer} from 'react-toastify'
import {Routes,Route} from 'react-router-dom'
import Emailverify from './pages/EmailVerify/EmailVerify'
import {LoginPage} from './pages/Login/LoginPage'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './pages/ProtectedRoute'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/main'
import SharedView from './components/Main/SharedView';
import Hero from './pages/Hero';

export default function App(){

  const [selectedMenu,setSelectedMenu] = useState<string>("Show All");
  return(
    <div>
      <ToastContainer autoClose={1000} theme="dark" />
      <Routes>
        
        {/* Hero Page (Landing Page) */}
        <Route path="/" element={<Hero />} />

        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <div className="flex h-screen overflow-hidden w-full">
                <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />

                <Main selectedMenu={selectedMenu} />
              </div>
              
            </ProtectedRoute>
          } 
        />

        {/* Shared View */}
        <Route path="/shared/:token" element={<SharedView />} />

        {/* Email Verify */}
        <Route 
          path="/email-verify" 
          element={
            <ProtectedRoute>
              <Emailverify />
            </ProtectedRoute>
          } 
        />

        {/* Reset Password */}
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  )
}