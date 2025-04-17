import pickle
from sentence_transformers import SentenceTransformer
from config import Config

model = SentenceTransformer(Config.SENTENCE_TRANSFORMER_MODEL)

def load_classifier():
    with open("models/classifier.pkl", "rb") as f:
        return pickle.load(f)

def predict_intent(query):
    query_embedding = model.encode(query)
    classifier = load_classifier()
    return classifier.predict([query_embedding])[0]