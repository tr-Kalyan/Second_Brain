import HeroNavbar from "../components/HeroNavbar/HeroNavbar"
import Header from "../components/Header/Header"

const Hero = () => {
    return(
        <div className="flex items-center justify-center flex-col min-h-screen bg-[url('/bg_img.png')] bg-cover bg-center">
            <HeroNavbar />
            <Header />
        </div>
    )
}

export default Hero