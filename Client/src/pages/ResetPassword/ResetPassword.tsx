import { useNavigate } from "react-router-dom"
import { useState,useRef,useContext } from "react"
import {assets} from "../../assets/assets"
import { AppContent } from "../../context/AppContext"
import axios from 'axios'
import {toast} from 'react-toastify'

const ResetPassword = () => {

    const [email,setEmail] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [isEmailSent,setIsEmailSent] = useState(false)
    const [otp,setOtp] = useState("")
    const [isOtpSubmitted,setIsOtpSubmitted] = useState(false)

    const {backendURL} = useContext(AppContent)

    axios.defaults.withCredentials = true

    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    const navigate = useNavigate()

    const handleInput = (e:React.FormEvent<HTMLInputElement>,index:number) => {

        const value = e.currentTarget.value;

        if (value && /^\d$/.test(value)) {
        // Move to next input
            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
        // Handle backspace
        if (value === '') {
            const nativeEvent = (e.nativeEvent as InputEvent);
            if (nativeEvent.inputType === 'deleteContentBackward' && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData('text')

        const pasteArray = paste.split("");

        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index] && /^\d$/.test(char)) {
                inputRefs.current[index]!.value = char;
            }
        });
    }

    const onSubmitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try{
            const res = await axios.post(backendURL+'/api/auth/send-reset-otp',{email})
            console.log(res)
            if (res.status === 202){
                toast.success(res.data.message)
                setIsEmailSent(true)
            }else{
                toast.error(res.data.message)
            }
        }
        catch(err){
            console.log(`Reset password process error: ${err}`)
        }
    }

    const onSubmitOTP = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        const otpArray = inputRefs.current.map((input) => input?.value || '');

        const otp = otpArray.join('')
        setOtp(otp)
        setIsOtpSubmitted(true)

    }   

    const onSubmitNewPassword = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        try{

            const res = await axios.post(backendURL + '/api/auth/reset-password',{email,otp,newPassword})

            if (res.status === 200){
                toast.success(res.data.message)
                navigate('/login')
            }else{
                toast.error(res.data.message)
            }

        }

        catch(err){
            console.log(`New password process error: ${err}`)
        }



    }

    return(
        <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-[#e0f7fa] via-[#ffffff] to-[#e0f2f1]">
            
            <div 
                className="
                            absolute left-5 sm:left:20  top-5 
                            w-46 sm:w-46 text-2xl font-semibold cursor-pointer">
                            🧠  <span className="bg-gradient-to-r from-emerald-400 via-sky-500 to-red-600 
                            bg-clip-text text-transparent">Second Brain</span>
            </div>

            
            {/* Enter email id */}

            {!isEmailSent && 
                <form onSubmit={onSubmitEmail}  className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
                    <h2 className="text-white text-2xl font-semibold text-center mb-4">Reset password</h2>
                    <p className="text-center mb-6 text-indigo-300">Enter your registered email address</p>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.mail_icon} alt="mail icon" className="w-3 h-3"/>
                        <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="bg-transparent outline-none text-white" />
                    </div>
                    <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-teal-900 rounded-full text-white mt-3">Submit</button>
                </form>
            }



            {/* otp input form */}
            {!isOtpSubmitted && isEmailSent && 

                <form onSubmit={onSubmitOTP} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm" >
                    <h2 className="text-white text-2xl font-semibold text-center mb-4">Reset password OTP</h2>
                    <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email id.</p>
                    <div className="flex justify-between mb-8" onPaste={handlePaste}>
                        {Array(6).fill(0).map((_,index) => (
                            <input inputMode="numeric"
                                pattern="[0-9]*" maxLength={1} key={index} 
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (!/^\d?$/.test(value)) {
                                    e.target.value = ""; // Clear if not a digit
                                    }
                                }}
                                required 
                            className="w-11 h-11 bg-[#333A5C] rounded-md text-white text-center text-xl" 
                            ref = {(e) => {inputRefs.current[index] = e}}
                            onInput={(e) => handleInput(e,index)}
                            />
                            
                        ))}
                    </div>
                    <button className=" w-full py-2.5 bg-gradient-to-r from-indigo-500 to-teal-900 text-white rounded-full">Submit</button>
                </form>
            }

            {/* enter new password */}

            {isOtpSubmitted && isEmailSent && 

                <form onSubmit={onSubmitNewPassword} className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm">
                    <h2 className="text-white text-2xl font-semibold text-center mb-4">New password</h2>
                    <p className="text-center mb-6 text-indigo-300">Enter the new password below</p>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.lock_icon} alt="mail icon" className="w-3 h-3"/>
                        <input type="password" placeholder="new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="bg-transparent outline-none text-white" />
                    </div>
                    <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-teal-900 rounded-full text-white mt-3">Submit</button>
                </form>
            }
        </div>
    )
}

export default ResetPassword