import { useNavigate} from 'react-router-dom'
import {assets} from '../../assets/assets'



const HeroNavbar = () => {


    const navigate = useNavigate()

    

    return (
        <div className="">
            <button>Login <span>{assets.arrow_icon}</span></button>
            
        </div>
    )
}

export default HeroNavbar