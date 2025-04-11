import spacy
from config import Config

nlp = spacy.load(Config.SPACY_MODEL)

def match_faq(query, intent, faqs):
    query_doc = nlp(query)
    intent_faqs = [f for f in faqs if f["intent"] == intent]
    if not intent_faqs:
        return "Sorry, I don’t know that yet!"
    best_match = max(intent_faqs, key=lambda x: query_doc.similarity(nlp(x["question"])))
    score = query_doc.similarity(nlp(best_match["question"]))
    return best_match["answer"] if score > 0.85 else "Sorry, I don’t know that yet!"