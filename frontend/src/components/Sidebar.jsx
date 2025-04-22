
import { useNavigate } from "react-router-dom";
const Sidebar = ({ onLogout }) => {
    const navigate = useNavigate();
    return (
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">FAQBuddy</h1>
        <nav>
          <button onClick={() => navigate("/dashboard")} className="block p-2 hover:bg-gray-700 rounded">Dashboard</button>
          <button onClick={() => navigate("/overview")} className="block p-2 hover:bg-gray-700 rounded">Overview</button>
          <button onClick={() => navigate("/faqs")} className="block p-2 hover:bg-gray-700 rounded">FAQs</button>
          <button onClick={() => navigate("/settings")} className="block p-2 hover:bg-gray-700 rounded">Settings</button>
          <button onClick={() => navigate("/analytics")} className="block p-2 hover:bg-gray-700 rounded">Analytics</button>
          <button onClick={()=>onLogout()} className="block p-2 hover:bg-gray-700 rounded mt-4">Logout</button>
        </nav>
      </aside>
    );
  };

  export default Sidebar;