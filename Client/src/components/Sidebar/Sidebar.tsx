import {useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {MdMenuOpen} from "react-icons/md"
import { LuBrainCircuit } from "react-icons/lu";
import { FaUserCircle,FaFolderOpen} from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { SiMedium,SiNotion } from "react-icons/si";
import { SlDocs } from "react-icons/sl";
import { AiOutlineLogout } from "react-icons/ai";
import { VscUnverified } from "react-icons/vsc";
import { AppContent } from '../../context/AppContext';
import axios from 'axios';
import {toast} from 'react-toastify';


const menuItems = [
    {
        icons:<FaFolderOpen size={26} className="text-green-600 object-contain" />,
        label:'Show All'
    },
    {
        icons:<IoLogoYoutube size={26} className="text-red-600 object-contain" />,
        label:'YouTube'
    },
    {
        icons:<FaXTwitter size={24} />,
        label:'Twitter'
    },
    {
        icons:<SiMedium size={24} />,
        label:'Medium'
    },
    {
        icons:<SlDocs size={24} />,
        label:'Docs'
    },
    {
        icons:<SiNotion size={24} />,
        label:'Notion'
    },

]

export default function Sidebar() {

    const navigate = useNavigate()

    const [open,setOpen] = useState(true)

    const {userData,backendURL,logout} = useContext(AppContent)

    const sendVerificationOtp = async () =>{
        try{
            axios.defaults.withCredentials = true;

            const res = await axios.post(backendURL + '/api/auth/send-verify-otp')

            console.log(res)
            if (res.status===200){
                toast.success(res.data.message)
                navigate("/email-verify")
            }
        }
        catch(err){
            console.log(`Error in email verification process: ${err}`)
        }
    }

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <nav className={`shadow-md h-screen p-2 bg-emerald-200 duration-300 flex flex-col ${open ? 'w-50' : 'w-16'}`}>

            {/* header */}

            <div className="flex justify-between items-center py-2 px-3 h-20">
                {/* <img src={logo} alt="logo" className={`${open ? 'w-10' : 'w-0'} rounded-md } />*/}
                <LuBrainCircuit size={30} className={`${open ? 'w-10' : 'w-0'}`} />
                {/* <p className={`flex justify-center items-center bg-teal-600 rounded-[100%] ${open ? 'w-7' : 'w-0'}`} >K</p> */}
                <div><MdMenuOpen size={30} className={` transition-all duration-500 cursor-pointer text-green-900 ${!open && ' rotate-180'}`} onClick={()=>setOpen(!open)} /></div>
            </div>

            {/* body */}

            <ul className="flex-1">
                {
                    menuItems.map((item,index) => {
                        return (
                            <li key={index} className="group flex gap-2 px-3 my-2 py-2 hover:bg-blue-500 rounded-md transition-all duration-300 cursor-pointer"> 
                                <div className="pr-2">{item.icons}</div>
                                <p
                                    className={`
                                        transition-all duration-500 overflow-hidden
                                        ${open ? 'max-w-xs opacity-100 scale-100 ml-0' : 'max-w-0 opacity-0 scale-95 ml-6'}
                                        whitespace-nowrap 
                                    `}
                                >
                                    {item.label}
                                </p>
                                {!open && (
                                    <span className="absolute left-16 z-50 whitespace-nowrap bg-white text-black rounded-md px-2 py-1 shadow-md scale-0 group-hover:scale-100 origin-left transition-transform duration-300">
                                        {item.label}
                                    </span>
                                )}

                            </li>
                        )
                    })
                }
            </ul>

            {/* footer */}

            <div className="flex gap-2 items-center px-3 py-2">
                {/* Profile Icon with dropdown on hover */}
                <div className="relative group">
                    <FaUserCircle size={32} />

                    {/* Dropdown */}
                    <div className="absolute bottom-8 left-0 mt-2 z-10 w-40 bg-white shadow-md rounded-md py-2 text-sm text-black hidden group-hover:block transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                    <ul>
                        {!userData?.isAccountVerified && <li className="flex gap-2 px-4 py-2 hover:bg-gray-200 cursor-pointer" onClick={sendVerificationOtp}><span><VscUnverified size={20} /></span>Verify Email</li>}
                        <li className="flex gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}><span><AiOutlineLogout size={20} /></span>Logout</li>
                    </ul>
                    </div>
                </div>

                {/* Name & Email */}
                <div className={`leading-5 transition-all duration-500 ${!open && 'w-0 translate-x-24 overflow-hidden'}`}>
                    <p className="py-1 text-md">{userData?.name ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1).toLowerCase() : ''}</p>
                    {/* <span className="text-xs block overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">
                    kalyannism@gmail.com
                    </span> */}
                </div>
            </div>
        </nav>
    )
}