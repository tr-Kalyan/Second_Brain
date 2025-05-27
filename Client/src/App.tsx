// import ButtonUI from './components/ButtonUI/Button'
// import PlusIcon from './components/Icons/PlusIcon'
// import {RegisterPage} from './pages/Register/RegisterPage'
// import Card from './components/CardUI/Card'
import Emailverify from './pages/EmailVerify/EmailVerify'
// import Hero from './pages/Hero'
import {LoginPage} from './pages/Login/LoginPage'
import {Routes,Route} from 'react-router-dom'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './pages/ProtectedRoute'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/main'

export default function App(){
  return(
    <div>
      <ToastContainer autoClose={1000} theme="dark" />
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <div className="flex h-screen overflow-hidden w-full">
                <Sidebar />

                <Main />
              </div>
              
            </ProtectedRoute>
          } 
        />


        <Route 
          path="/email-verify" 
          element={
            <ProtectedRoute>
              <Emailverify />
            </ProtectedRoute>
          } 
        />


        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  )
}