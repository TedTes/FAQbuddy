import apiClient from "../api/apiClient";
import {useState,useEffect} from 'react';
import {
  Navigate,
} from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  
    const [authenticated, setAuthenticated] = useState(null);
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response =  await apiClient.get('/auth/check'); 
          console.log("from server")
          console.log(response);
          setAuthenticated(true);
        } catch {
          setAuthenticated(false);
        }
      };
      checkAuth();
    }, []);
  
    if (authenticated === null) return <div>Loading...</div>;
    return authenticated ? children : <Navigate to="/login" />;
  };
  
  export default ProtectedRoute