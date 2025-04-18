from sentence_transformers import SentenceTransformer, util
from config import Config
from db import get_db
model = SentenceTransformer(Config.SENTENCE_TRANSFORMER_MODEL)
def match_faq(query, intent):
  try: 
        with get_db as conn:
            faqs = conn.execute("SELECT * FROM faqs").fetchall()
        faqs = [dict(faq) for faq in faqs]
        query_embedding = model.encode(query, convert_to_tensor=True)
        faq_embeddings = [model.encode(faq["question"], convert_to_tensor=True) for faq in faqs]
        similarities = [util.cos_sim(query_embedding, faq_emb).item() for faq_emb in faq_embeddings]
        max_idx = similarities.index(max(similarities)) if similarities else -1
        if max_index >=0 and similarities[max_idx] > 0.80:  
            return faqs[max_idx]["answer"]
        return "Sorry, I don’t know!"
   except Exception as e:
        print(f"error at match faq method:{str(e)}")
        raise RuntimeError(f"error at match faq error")

    