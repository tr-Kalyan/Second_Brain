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


    const getAuthState = async () => {
    try{
        const res = await axios.get(backendURL + '/api/auth/is-auth',{
            withCredentials:true
        })

        if (res.status === 200){
            setIsLoggedIn(true)
            getUserData()
        }


    }
    catch(err){
        toast.error("Authentication state went wrong")
    }
}


    const getUserData = async() => {
        setLoadingUserData(true); // Set loading to true before fetching
        try {
            const res = await axios.get(`${backendURL}/api/auth/data`, {
                withCredentials: true
            });
            
            console.log("from context", res,res.status);
            
            if (res.status === 200 && res.data.userData) {
                const user = {
                    name: res.data.userData.name,
                    isAccountVerified: res.data.userData.isAccountVerified
                }
                setUserData(user);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                setUserData(null);
                
            }
        } catch(err) {
            toast.error("Error fetching user data");
            setIsLoggedIn(false);
            setUserData(null);
            
        } 
    }

    // Add logout function
    

    useEffect(() => {
        // Check authentication status on mount
        const checkAuth = async () => {
            await getUserData();
        };
        
        checkAuth();
    }, []);

    useEffect(()=>{
        getAuthState()
    },[])

    const value:AppContextType = {
        backendURL,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
        loadingUserData, 
        setLoadingUserData,
        
    }
    
    return (
        <AppContent.Provider value={value}>
            {children}
        </AppContent.Provider>
    )
}