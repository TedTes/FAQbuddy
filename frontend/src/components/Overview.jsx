import {useEffect, useState} from 'react';
import apiClient from '../api/apiClient';
const  Overview = () => {
    const [faqs, setFaqs] = useState([]);
    useEffect(() => {
        const fetchFaqs = async () => {
          try {
            const response = await apiClient.get("/faqs");
            setFaqs(response.data);
          } catch (err) {
            console.error("Failed to fetch FAQs", err);
          }
        };
      
        fetchFaqs();
      }, []);

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