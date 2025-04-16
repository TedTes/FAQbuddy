import json
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline

def train_classifier():
    # Load training data
    with open("models/training_data.json", "r") as f:
        data = json.load(f)
    
    # Extract queries and intents
    queries = [item["query"] for item in data]
    intents = [item["intent"] for item in data]
    
    # Create and train pipeline
    classifier = make_pipeline(
        TfidfVectorizer(),
        LogisticRegression()
    )
    classifier.fit(queries, intents)
    
    # Save to classifier.pkl
    with open("models/classifier.pkl", "wb") as f:
        pickle.dump(classifier, f)
    print("Classifier trained and saved to models/classifier.pkl")

if __name__ == "__main__":
    train_classifier()