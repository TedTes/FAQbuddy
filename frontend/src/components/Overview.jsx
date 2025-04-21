import {useEffect, useState} from 'react';

const  Overview = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        
        fetch(`${SERVER_URI}/faqs`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => setFaqs(data))
                .catch(err => console.error("Error fetching FAQs:", err));
        
       
    }, [faqs]);

    return <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <h3 className="text-lg font-semibold">Recent FAQs</h3>
        <ul className="mt-2">
            {faqs.map(faq => (
                <li key={faq.id} className="p-2 border-b">{faq.question}</li>
            ))}
        </ul>
        <p className="mt-4">Analytics coming soon...</p>
    </div>
};

export default Overview