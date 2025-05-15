import {assets} from '../../assets/assets'
import {useContext} from 'react';
import {AppContent} from "../../context/AppContext"

const Header = () => {
    const {userData, loadingUserData} = useContext(AppContent);

    console.log("Header userData state:", userData);
    console.log("Header loadingUserData state:", loadingUserData);



    return (
        <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
            <img src={assets.header_img} alt="header image" className="w-36 h-36 rounded-full mb-6" />

            <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
                Hey {userData ? userData.name : "Guest"}! 
                <img className="w-8 aspect-square" src={assets.hand_wave} alt="hand wave" />
            </h1>
            <h2 className="text-3xl sm:text-5xl font-semibold mb-4">Welcome to our app</h2>
            <p className="mb-8 max-w-md">Let's start with a quick product tour and we will have you up and running in no time!</p>
            
            <div className="flex gap-4">
                <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-green-100 transition-all">
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default Header