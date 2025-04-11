import pickle
from sklearn.pipeline import make_pipeline

def load_classifier():
    with open("models/classifier.pkl", "rb") as f:
        return pickle.load(f)

def predict_intent(query):
    classifier = load_classifier()
    return classifier.predict([query])[0]