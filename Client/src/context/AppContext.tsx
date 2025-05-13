import {createContext, useState, useEffect} from 'react'
import type {ReactNode} from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'

interface AppContextType{
    backendURL:string;
    isLoggedIn:boolean;
    setIsLoggedIn:(value:boolean) => void;
    userData:{
        name:string;
        isAccountVerified:boolean;
    }|null;
    setUserData: (data: { name: string; isAccountVerified: boolean } | null) => void;
    getUserData: () => Promise<void>;
    loadingUserData: boolean; 
    setLoadingUserData: (value: boolean) => void;
    logout: () => Promise<void>; // Added logout function
}

const defaultValue:AppContextType = {
    backendURL: '',
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    userData: null,
    setUserData: () => {},
    getUserData: async () => {},
    loadingUserData: false,
    setLoadingUserData: () => {},
    logout: async () => {},
}

export const AppContent = createContext<AppContextType>(defaultValue)

export const AppContextProvider = ({children}:{children:ReactNode}) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userData, setUserData] = useState<{
        name: string;
        isAccountVerified: boolean;
    } | null>(null);
    const [loadingUserData, setLoadingUserData] = useState(true);

    const getUserData = async() => {
        setLoadingUserData(true); // Set loading to true before fetching
        try {
            const res = await axios.get(`${backendURL}/api/auth/data`, {
                withCredentials: true
            });
            
            console.log("from context", res.data);
            
            if (res.data.status === 200 && res.data.userData) {
                setUserData(res.data.userData);
                setIsLoggedIn(true);
                return res.data.userData; // Return the user data
            } else {
                setIsLoggedIn(false);
                setUserData(null);
                return null;
            }
        } catch(err) {
            console.error("Error fetching user data:", err);
            setIsLoggedIn(false);
            setUserData(null);
            return null;
        } finally {
            setLoadingUserData(false);
        }
    }

    // Add logout function
    const logout = async() => {
        try {
            await axios.post(`${backendURL}/api/auth/logout`, {}, {
                withCredentials: true
            });
            setIsLoggedIn(false);
            setUserData(null);
        } catch(err) {
            console.error("Error during logout:", err);
        }
    }

    useEffect(() => {
        // Check authentication status on mount
        const checkAuth = async () => {
            await getUserData();
        };
        
        checkAuth();
    }, []);

    const value:AppContextType = {
        backendURL,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
        loadingUserData, 
        setLoadingUserData,
        logout
    }
    
    return (
        <AppContent.Provider value={value}>
            {children}
        </AppContent.Provider>
    )
}