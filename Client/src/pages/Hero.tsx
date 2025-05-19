
import { useNavigate} from 'react-router-dom'
import {assets} from '../assets/assets'

const Hero = () => {

    const navigate = useNavigate();
    return(
        <div className="">
            <button onClick={() => navigate("/")}>Login <span>{assets.arrow_icon}</span></button>
            
        </div>
    )
}

export default Hero