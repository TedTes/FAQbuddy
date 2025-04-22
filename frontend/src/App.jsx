import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import FaqList from "./components/FaqList";
import Overview from "./components/Overview";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./auth/ProtectedRoute";

// // AppLayout.jsx
// import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = ({ onLogout }) => {
  return (
    <div className="flex h-screen">
      <Sidebar onLogout={onLogout} />
      <main className="flex-1 bg-gray-100 p-4">
        <Outlet /> {/* This renders the nested route content */}
      </main>
    </div>
  );
};



function App() {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    window.location.href = "/login";
  };

  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute/>}>
        <Route element={<AppLayout onLogout={logout} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/faqs" element={<FaqList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
        </Route>
      </Routes>
  );
}

export default App;
