import {assets} from '../../assets/assets'
import {useContext} from 'react';
import {AppContent} from "../../context/AppContext"

const Header = () => {
    const {userData, loadingUserData, isLoggedIn, logout} = useContext(AppContent);

    console.log("Header userData state:", userData);
    console.log("Header isLoggedIn state:", isLoggedIn);
    console.log("Header loadingUserData state:", loadingUserData);

    if (loadingUserData) {
        return (
            <div className="flex justify-center items-center mt-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-3 text-gray-500">Loading user data...</p>
            </div>
        );
    }

    if (!isLoggedIn || !userData) {
        return (
            <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
                <img src={assets.header_img} alt="header image" className="w-36 h-36 rounded-full mb-6" />
                <h2 className="text-3xl sm:text-5xl font-semibold mb-4">Welcome {userData ? userData.name : 'Guest' }!</h2>
                <p className="mb-8 max-w-md">Please sign in to access all features</p>
                <a href="/login" className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-green-100 transition-all">
                    Sign In
                </a>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
            <img src={assets.header_img} alt="header image" className="w-36 h-36 rounded-full mb-6" />

            <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
                Hey {userData.name}! 
                <img className="w-8 aspect-square" src={assets.hand_wave} alt="hand wave" />
            </h1>
            <h2 className="text-3xl sm:text-5xl font-semibold mb-4">Welcome to our app</h2>
            <p className="mb-8 max-w-md">Let's start with a quick product tour and we will have you up and running in no time!</p>
            
            <div className="flex gap-4">
                <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-green-100 transition-all">
                    Get Started
                </button>
                <button 
                    onClick={logout}
                    className="border border-red-500 text-red-500 rounded-full px-8 py-2.5 hover:bg-red-100 transition-all"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Header