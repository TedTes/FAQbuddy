import apiClient from "../api/apiClient";
import { Navigate, Outlet } from "react-router-dom";
import {useState,useEffect} from 'react';

const ProtectedRoute = () => {
    const [authenticated, setAuthenticated] = useState(null);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response =  await apiClient.get('/auth/check'); 
          setAuthenticated(true);
        } catch(error) {
          console.error("Auth check failed:", error);
          setAuthenticated(false);
        }
      };
      checkAuth();
    }, []);
  
    if (authenticated === null) {
      return (
        <div className="flex h-screen items-center justify-center">
          <div className="text-lg font-semibold text-gray-700">Checking Auth...</div>
        </div>
      );
    }
    return authenticated ? <Outlet /> : <Navigate to="/login" />;
  };
  
  export default ProtectedRoute