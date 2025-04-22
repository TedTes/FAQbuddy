
import {useState} from 'react';
import {
    useNavigate,
  } from "react-router-dom";
import apiClient from '../api/apiClient';
const Login = () => {
  
    const [auth, setAuth] = useState({ email: "", password: "", business_name: "" });
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const login = async () => {
            try {
                const response = await apiClient.post('/auth/login',{email: auth.email, password: auth.password});
              
                if (response.data.error) {
                    alert(response.data.error);
                  } else {
                    setUser({ business_id: response.data.business_id });
                    navigate("/dashboard");
                  }
            } catch(error) {
               console.log("login error :",error)
            }
      
  
  
    };
   return  <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={auth.email}
                onChange={e => setAuth({ ...auth, email: e.target.value })}
                className="p-2 border rounded w-full mb-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={auth.password}
                onChange={e => setAuth({ ...auth, password: e.target.value })}
                className="p-2 border rounded w-full mb-2"
            />
            <button onClick={login} className="bg-blue-600 text-white p-2 rounded w-full">Login</button>
            <p className="mt-2 text-center">
                No account? <button onClick={() => navigate("/register")} className="text-blue-600">Register</button>
            </p>
        </div>
    </div>
};

export default Login