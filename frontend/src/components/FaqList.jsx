
import {useEffect, useState} from 'react';

const SERVER_URI = `https://faqbuddy.onrender.com/api/v1`;

const FaqList = () => {
    const [newFaq, setNewFaq] = useState({ question: "", answer: "", intent: "" });
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
            fetch(`${SERVER_URI}/faqs`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => setFaqs(data))
                .catch(err => console.error("Error fetching FAQs:", err));
    
   
    }, [newFaq]);

    const addFaq = () => {
        fetch(`${SERVER_URI}/faqs`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify(newFaq)
        })
            .then(res => res.json())
            .then(data => {
                setFaqs([...faqs, data]);
                setNewFaq({ question: "", answer: "", intent: "" });
            });
    };
    const updateFaq = (id, updatedFaq) => {
        fetch(`${SERVER_URI}/faqs/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify(updatedFaq)
        })
            .then(() => setFaqs(faqs.map(f => f.id === id ? updatedFaq : f)));
    };

    const deleteFaq = (id) => {
        fetch(`${SERVER_URI}/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
            .then(() => setFaqs(faqs.filter(f => f.id !== id)));
    };
   return <div className="p-6">
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
};

export default  FaqList