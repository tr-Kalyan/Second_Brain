// import ButtonUI from './components/ButtonUI/Button'
// import PlusIcon from './components/Icons/PlusIcon'
// import {RegisterPage} from './pages/Register/RegisterPage'
// import Card from './components/CardUI/Card'
import Emailverify from './pages/EmailVerify/EmailVerify'
import Hero from './pages/Hero'
import {LoginPage} from './pages/Login/LoginPage'
import {Routes,Route} from 'react-router-dom'
import ResetPassword from './pages/ResetPassword/ResetPassword'

export default function App(){
  return(
    <div>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/email-verify" element={<Emailverify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  )
}