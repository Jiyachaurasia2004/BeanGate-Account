import { useEffect } from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const LogOut =()=>{
    const {LogoutToken} = useAuth();
  
    useEffect(()=>{
        LogoutToken();

    },[LogoutToken])
  return <Navigate to ="/login" />;
}