import {useState} from 'react';
import apiClient from '../api/apiClient';
import {
    useNavigate,
  } from "react-router-dom";
const Register = () => {
    const [auth, setAuth] = useState({ email: "", password: "", business_name: "" });
    const navigate = useNavigate();
    const register = async () => {
        try {
            const response = await apiClient.post('/auth/register',{email:auth.email, password:auth.password, business_name: auth.business_name});
            console.log("response")
            console.log(response);
        } catch(error) {
            console.log("error");
           console.log(error);
        }
  
    };

   return <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
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
                <input
                    type="text"
                    placeholder="Business Name"
                    value={auth.business_name}
                    onChange={e => setAuth({ ...auth, business_name: e.target.value })}
                    className="p-2 border rounded w-full mb-2"
                />
                <button onClick={register} className="bg-blue-600 text-white p-2 rounded w-full">Register</button>
                <p className="mt-2 text-center">
                    Have an account? <button onClick={() => navigate("/login")} className="text-blue-600">Login</button>
                </p>
            </div>
    </div>
};

export default Register;