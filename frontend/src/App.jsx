import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import FaqList from "./components/FaqList";
import Overview from "./components/Overview";
import Analytics from "./components/Analytics";
import Settings from "./components/Settings";

const App = () => {
  const [route, setRoute] = useState(localStorage.getItem("token") ? "overview" : "login");
  const [user, setUser] = useState(null);
  const SERVER_URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${SERVER_URI}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem("token");
          setRoute("login");
        });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setRoute("login");
  };

  if (route === "login") return <Login setRoute={setRoute} />;
  if (route === "register") return <Register setRoute={setRoute} />;

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">FAQBuddy</h1>
        <nav>
          <button onClick={() => setRoute("overview")} className="block p-2 hover:bg-gray-700 rounded">Overview</button>
          <button onClick={() => setRoute("faqs")} className="block p-2 hover:bg-gray-700 rounded">FAQs</button>
          <button onClick={() => setRoute("settings")} className="block p-2 hover:bg-gray-700 rounded">Settings</button>
          <button onClick={() => setRoute("analytics")} className="block p-2 hover:bg-gray-700 rounded">Analytics</button>
          <button onClick={logout} className="block p-2 hover:bg-gray-700 rounded mt-4">Logout</button>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-4">
        {route === "overview" && <Overview />}
        {route === "faqs" && <FaqList />}
        {route === "settings" && <Settings />}
        {route === "analytics" && <Analytics />}
      </main>
    </div>
  );
};

export default App;
