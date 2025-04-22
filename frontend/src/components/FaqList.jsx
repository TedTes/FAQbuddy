import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';


const FaqList = () => {
  const [newFaq, setNewFaq] = useState({ question: "", answer: "", intent: "" });
  const [faqs, setFaqs] = useState([]);


  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await apiClient.get("/faqs");
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setFaqs(response.data); 
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchFaqs();
  }, []);

  const addFaq = async () => {
    try {
      const response = await apiClient.post("/faqs", newFaq);
      setFaqs([...faqs, response.data]);
      setNewFaq({ question: "", answer: "", intent: "" });
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const updateFaq = async (id, updatedFaq) => {
    try {
      await apiClient.put(`/faqs/${id}`, updatedFaq);
      setFaqs(faqs.map(f => f.id === id ? updatedFaq : f));
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const deleteFaq = async (id) => {
    try {
      await apiClient.delete(`/faqs/${id}`);
      setFaqs(faqs.filter(f => f.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
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
        <button onClick={addFaq} className="bg-blue-600 text-white p-2 rounded">
          Add FAQ
        </button>
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
              <button
                onClick={() => deleteFaq(faq.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FaqList;
