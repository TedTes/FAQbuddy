const { useState, useEffect } = React;

    const App = () => {
        const [route, setRoute] = useState("overview");
        const [faqs, setFaqs] = useState([]);
        const [newFaq, setNewFaq] = useState({ question: "", answer: "", intent: "" });
        const [config, setConfig] = useState({ theme: "blue", logo: "", hours: "" });

        // Fetch FAQs
        useEffect(() => {
            if (route === "overview" || route === "faqs") {
                fetch("https://faqbuddy.onrender.com/api/v1/faqs")
                    .then(res => res.json())
                    .then(data => setFaqs(data))
                    .catch(err => console.error("Error fetching FAQs:", err));
            }
            if (route === "settings") {
                fetch("https://faqbuddy.onrender.com/api/v1/config")
                    .then(res => res.json())
                    .then(data => setConfig(data))
                    .catch(err => console.error("Error fetching config:", err));
            }
        }, [route]);

        // Handlers
        const addFaq = () => {
            fetch("https://faqbuddy.onrender.com/api/v1/faqs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newFaq)
            })
                .then(res => res.json())
                .then(data => {
                    setFaqs([...faqs, data]);
                    setNewFaq({ question: "", answer: "", intent: "" });
                });
        };

        const updateFaq = (id, updatedFaq) => {
            fetch(`https://faqbuddy.onrender.com/api/v1/faqs/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFaq)
            })
                .then(() => setFaqs(faqs.map(f => f.id === id ? updatedFaq : f)));
        };

        const deleteFaq = (id) => {
            fetch(`https://faqbuddy.onrender.com/api/v1/faqs/${id}`, { method: "DELETE" })
                .then(() => setFaqs(faqs.filter(f => f.id !== id)));
        };

        const updateConfig = () => {
            fetch("https://faqbuddy.onrender.com/api/v1/config", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(config)
            })
                .then(() => alert("Settings updated!"));
        };

        // Components
        const Overview = () => (
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <h3 className="text-lg font-semibold">Recent FAQs</h3>
                <ul className="mt-2">
                    {faqs.map(faq => (
                        <li key={faq.id} className="p-2 border-b">{faq.question}</li>
                    ))}
                </ul>
                <p className="mt-4">Analytics coming soon...</p>
            </div>
        );

        const Faqs = () => (
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Manage FAQs</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Question"
                        value={newFaq.question}
                        onChange={e => setNewFaq({ ...newFaq, question: e.target.value })}
                        className="p-2 border rounded w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Answer"
                        value={newFaq.answer}
                        onChange={e => setNewFaq({ ...newFaq, answer: e.target.value })}
                        className="p-2 border rounded w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Intent (e.g., hours)"
                        value={newFaq.intent}
                        onChange={e => setNewFaq({ ...newFaq, intent: e.target.value })}
                        className="p-2 border rounded w-full mb-2"
                    />
                    <button onClick={addFaq} className="bg-blue-600 text-white p-2 rounded">Add FAQ</button>
                </div>
                <ul>
                    {faqs.map(faq => (
                        <li key={faq.id} className="p-2 border-b flex justify-between">
                            <div>
                                <strong>{faq.question}</strong>: {faq.answer} ({faq.intent})
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        const updated = prompt("New question:", faq.question);
                                        if (updated) updateFaq(faq.id, { ...faq, question: updated });
                                    }}
                                    className="text-blue-600 mr-2"
                                >
                                    Edit
                                </button>
                                <button onClick={() => deleteFaq(faq.id)} className="text-red-600">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );

        const Settings = () => (
            <div className="p-6">
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
        );

        const Analytics = () => (
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Analytics</h2>
                <p>Query stats coming soon...</p>
            </div>
        );

        return (
            <div className="flex h-screen">
                <div className="w-64 bg-gray-800 text-white p-4">
                    <h1 className="text-xl font-bold mb-6">FAQBuddy</h1>
                    <nav>
                        <button onClick={() => setRoute("overview")} className="block w-full text-left p-2 hover:bg-gray-700 rounded">Overview</button>
                        <button onClick={() => setRoute("faqs")} className="block w-full text-left p-2 hover:bg-gray-700 rounded">FAQs</button>
                        <button onClick={() => setRoute("settings")} className="block w-full text-left p-2 hover:bg-gray-700 rounded">Settings</button>
                        <button onClick={() => setRoute("analytics")} className="block w-full text-left p-2 hover:bg-gray-700 rounded">Analytics</button>
                    </nav>
                </div>
                <div className="flex-1 bg-gray-100">
                    {route === "overview" && <Overview />}
                    {route === "faqs" && <Faqs />}
                    {route === "settings" && <Settings />}
                    {route === "analytics" && <Analytics />}
                </div>
            </div>
        );
    };

    ReactDOM.render(<App />, document.getElementById("root"));