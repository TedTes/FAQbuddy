from sentence_transformers import SentenceTransformer, util
from config import Config

model = SentenceTransformer(Config.SENTENCE_TRANSFORMER_MODEL)
def match_faq(query, intent, faqs):
    query_embedding = model.encode(query, convert_to_tensor=True)
    faq_embeddings = [model.encode(faq["question"], convert_to_tensor=True) for faq in faqs]
    similarities = [util.cos_sim(query_embedding, faq_emb).item() for faq_emb in faq_embeddings]
    max_idx = similarities.index(max(similarities))

    if similarities[max_idx] > 0.80:  
        return faqs[max_idx]["answer"]
    return "Sorry, I don’t know!"