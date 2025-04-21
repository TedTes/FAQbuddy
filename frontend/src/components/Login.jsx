
import {useState} from 'react';

const Login = () => {
    
    const [auth, setAuth] = useState({ email: "", password: "", business_name: "" });

    const login = () => {
        fetch(`${SERVER_URI}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email: auth.email, password: auth.password })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) alert(data.error);
                else {
                    localStorage.setItem("token", data.access_token);
                    setUser({ business_id: data.business_id });
                    setRoute("overview");
                }
            });
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
                No account? <button onClick={() => setRoute("register")} className="text-blue-600">Register</button>
            </p>
        </div>
    </div>
};

export default Login