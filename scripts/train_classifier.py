from sentence_transformers import SentenceTransformer
from sklearn.linear_model import LogisticRegression
import pickle, json
from config import Config

model = SentenceTransformer(Config.SENTENCE_TRANSFORMER_MODEL)

def train_classifier():
    # Load training data
    with open("models/training_data.json", "r") as f:
        data = json.load(f)
    
    # Extract queries and intents
    queries = [item["query"] for item in data]
    intents = [item["intent"] for item in data]
    
    # Create and train pipeline
    query_embeddings = model.encode(queries)
    classifier = LogisticRegression()
    classifier.fit(query_embeddings, intents)
    
    # Save to classifier.pkl
    with open("models/classifier.pkl", "wb") as f:
        pickle.dump(classifier, f)
    print("Classifier trained and saved to models/classifier.pkl")

if __name__ == "__main__":
    train_classifier()