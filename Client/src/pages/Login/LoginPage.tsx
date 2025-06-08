import {useState, useContext, useEffect} from 'react'
import {assets} from "../../assets/assets"
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../../context/AppContext';
import axios from 'axios'
import {toast} from 'react-toastify';


export const LoginPage = () => {
    const navigate = useNavigate();
    const {backendURL, setIsLoggedIn, getUserData} = useContext(AppContent);
    const [state, setState] = useState('Sign in');
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [redirectToHome, setRedirectToHome] = useState(false);

    useEffect(() => {
        // Reset form state when toggling between Sign In and Sign Up
        setUsername("");
        setEmail("");
        setPassword("");
    }, [state]);

    useEffect(() => {
        if (redirectToHome) {
            navigate("/dashboard");
        }
    }, [redirectToHome]);


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return; // Prevent multiple submissions
        
        setIsSubmitting(true);
        try {
            axios.defaults.withCredentials = true;

            const lowerCaseEmail = email.trim().toLowerCase();

            if (state === 'Sign Up') {
                const response = await axios.post(`${backendURL}/api/auth/signup`, {
                        username:username,
                        email:lowerCaseEmail,
                        passowrd:password
                    },{
                    withCredentials: true}
                );

                if (response.data.status === 201) {
                    toast.success(response.data.message);
                    // First set user logged in
                    setIsLoggedIn(true);
                    // Then fetch user data
                    await getUserData();
                    // Then navigate
                    // navigate("/");
                    setRedirectToHome(true);
                } else {
                    toast.error(response.data.message || "Signup failed");
                }
            } else {
                const response = await axios.post(`${backendURL}/api/auth/signin`, {
                    email:lowerCaseEmail,
                    password:password
                },
                {
                    withCredentials: true}
            );
                // console.log("response from login function login page",response)

                if (response.status === 200) {
                    toast.success(response.data.message || "Login successful");
                    // First set user logged in
                    setIsLoggedIn(true);
                    // Then fetch user data
                    await getUserData();
                    // Then navigate
                    // setTimeout(() => navigate("/"),100);
                    setRedirectToHome(true);
                } else {
                    toast.error(response.data.message || "Login failed");
                }
            }
        } catch (error) {
            console.error("Authentication error:", error);
            toast.error("Authentication failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen sm:px-0 bg-gradient-to-br from-[#e0f7fa] via-[#ffffff] to-[#e0f2f1]">
            {/* <img onClick={() => navigate("/")} src={assets.logo} alt="" className="absolute left-5 sm:left:20 top-5 w-28 sm:w-32 cursor-pointer" /> */}
            <div 
                className="
                            absolute left-5 sm:left:20  top-5 
                            w-46 sm:w-46 text-2xl font-semibold cursor-pointer">
                            🧠  <span className="bg-gradient-to-r from-emerald-400 via-sky-500 to-red-600 
                            bg-clip-text text-transparent">Second Brain</span>
            </div>
            <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-92 sm:w-96 text-indigo-300 text-sm">
                <h2 className="text-3xl font-semibold text-white text-center mb-3">{state === 'Sign Up'? 'Sign Up':'Sign In' }</h2>
                <p className="text-center text-sm mb-6">  {state === 'Sign Up'? 'Create your account':'Login to your account!' }</p>                
                <form onSubmit={handleSubmit}>
                    {state === 'Sign Up' && (
                        <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                            <img src={assets.person_icon} alt="person icon" />
                            <input 
                                onChange={e => setUsername(e.target.value)} 
                                value={username} 
                                className="w-full bg-transparent outline-none text-white" 
                                type="text" 
                                placeholder="Full Name" 
                                required 
                            />
                        </div>
                    )}
                    
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.mail_icon} alt="person icon" />
                        <input 
                            onChange={e => setEmail(e.target.value.toLowerCase())} 
                            value={email}
                            className="w-full bg-transparent outline-none text-white" 
                            type="email" 
                            placeholder="your@email.com" 
                            required 
                        />
                    </div>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.lock_icon} alt="lock icon" />
                        <input 
                            onChange={e => setPassword(e.target.value)} 
                            value={password}
                            className="w-full bg-transparent outline-none text-white" 
                            type="password" 
                            placeholder="password" 
                            required 
                        />
                    </div>
                    { state === "Sign in" && <p onClick={() => navigate('/reset-password')} className="mb-4 text-indigo-500 cursor-pointer">Forgot password?</p>}
                    <button 
                        className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-teal-900 text-white font-medium"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : state}
                    </button>
                </form>
                {state === 'Sign Up' ? (
                    <p className="text-gray-400 text-center text-xs mt-4">
                        Already have an account?{' '}
                        <span onClick={() => setState('Sign in')} className="text-blue-400 cursor-pointer underline">Login here</span>
                    </p>
                ) : (
                    <p className="text-gray-400 text-center text-xs mt-4">
                        Don't have an account?{' '}
                        <span onClick={() => setState('Sign Up')} className="text-blue-400 cursor-pointer underline">Sign up</span>
                    </p>
                )} 
            </div>
        </div>
    )
}