import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";

const ProtectedRoute = ({children}:{children:React.ReactNode}) =>{
    const {isLoggedIn,loadingUserData} = useContext(AppContent)


    if (loadingUserData) return <div>Loading...</div>

    if (!isLoggedIn) return <Navigate to="/login" replace />

    return <>{children}</>
}

export default ProtectedRoute