import {useRef,useContext,useEffect} from 'react'
import { AppContent } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


const Emailverify = () => {

    axios.defaults.withCredentials = true;

    const {isLoggedIn,backendURL,getUserData,userData} = useContext(AppContent)
    const navigate = useNavigate()

    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

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

    const onSubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        try{
            e.preventDefault();

            const otpArray = inputRefs.current.map((input) => input?.value || '');
            const otp = otpArray.join('')

            const res = await axios.post(backendURL + '/api/auth/verify-account',{otp})

            if (res.status === 200) {
                toast.success("Email verified successfully")
                getUserData()
                navigate('/dashboard')
            }
        }
        catch(err){
            console.log(`Error while email verificaiton: ${err}`)
        }
    }

    // useEffect(() => {
    //     if (!isLoggedIn){
    //         navigate('/login')
    //     }
    // },[isLoggedIn,navigate])

    useEffect(() => {
        isLoggedIn && userData && userData.isAccountVerified && navigate("/dashboard")
    },[isLoggedIn,userData])


    return(
        <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-[#e0f7fa] via-[#ffffff] to-[#e0f2f1]">
            <div 
                className="
                            absolute left-5 sm:left:20  top-5 
                            w-46 sm:w-46 text-2xl font-semibold cursor-pointer">
                            🧠  <span className="bg-gradient-to-r from-emerald-400 via-sky-500 to-red-600 
                            bg-clip-text text-transparent">Second Brain</span>
            </div>
            <form className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm" onSubmit={onSubmitHandler}>
                <h2 className="text-white text-2xl font-semibold text-center mb-4">Email Verification</h2>
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
                <button className=" w-full py-3 bg-gradient-to-r from-indigo-500 to-teal-900 text-white rounded-full">Verify email</button>
            </form>
        </div>
    )
}

export default Emailverify