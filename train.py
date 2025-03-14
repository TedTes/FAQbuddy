import json
from sklearn.model_selection import train_test_split

with open("data/faqs.json", "r") as f:
    faqs = json.load(f)

X = [get_embedding(preprocess_text(faq["question"])) for faq in faqs]
y = [faq["id"] for faq in faqs]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)