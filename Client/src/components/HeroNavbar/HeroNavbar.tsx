import { useNavigate } from 'react-router-dom'
import {assets} from '../../assets/assets'

const HeroNavbar = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
            <img src={assets.logo} alt="" className="w-28 sm:w-32"/>
            <button onClick={()=>navigate('/login')}
            className="flex items-center gap-2 border border-gray-500 rounded-full py-2 px-6 text-gray-800 hover:bg-green-100 transition-all ">Login <img src={assets.arrow_icon} alt="arrow icon" /></button>
        </div>
    )
}

export default HeroNavbar