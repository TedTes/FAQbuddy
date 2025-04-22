import {useEffect, useState} from 'react';
import apiClient from '../api/apiClient';
const Settings = () => {
    const [config, setConfig] = useState({ theme: "blue", logo: "", hours: "" });
    const  [faqs, setFaqs] = useState([]);
 
    useEffect(() => {
        const fetchConfig = async () => {
          try {
            const response = await apiClient.get("/config");
            setFaqs(response.data); 
          } catch (err) {
            console.error("Failed to fetch FAQs", err);
          }
        };
      
        fetchConfig();
      }, []);
    const updateConfig = async () => {
        try {
            const response = await apiClient.patch(`/config`,config);
        } catch(error) {
           console.log("update config",error);
        }
   
    };


    return <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="mb-4">
                <label className="block mb-1">Widget Theme</label>
                <select
                    value={config.theme}
                    onChange={e => setConfig({ ...config, theme: e.target.value })}
                    className="p-2 border rounded w-full"
                >
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block mb-1">Logo URL</label>
                <input
                    type="text"
                    value={config.logo}
                    onChange={e => setConfig({ ...config, logo: e.target.value })}
                    className="p-2 border rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Business Hours</label>
                <input
                    type="text"
                    value={config.hours}
                    onChange={e => setConfig({ ...config, hours: e.target.value })}
                    placeholder="e.g., 9 AM - 5 PM"
                    className="p-2 border rounded w-full"
                />
            </div>
            <button onClick={updateConfig} className="bg-blue-600 text-white p-2 rounded">Save Settings</button>
    </div>
};

export default Settings;