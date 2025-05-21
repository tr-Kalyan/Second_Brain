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
    logout:() => Promise<void>;
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
    logout:async () => {},
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
            console.log(res)
            if (res.status === 200){
                setIsLoggedIn(true)
                await getUserData()
            }
            else {
                setIsLoggedIn(false);
                setUserData(null);
        setLoadingUserData(false);
            }


        }
        catch(err){
            setIsLoggedIn(false);
            setUserData(null);
        setLoadingUserData(false); 
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
            console.error('getUserData error - AppContent', err);
            setIsLoggedIn(false);
            setUserData(null)
        }finally{
            setLoadingUserData(false)
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
                toast.success("Logged out")
            } catch(err) {
                console.error("Error during logout:", err);
            }
    }


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
        logout  
    }
    
    return (
        <AppContent.Provider value={value}>
            {children}
        </AppContent.Provider>
    )
}