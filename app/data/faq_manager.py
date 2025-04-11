import json
import csv

def load_faqs():
    with open("data/faqs.json", "r") as f:
        return json.load(f)

def save_faqs(faqs):
    with open("data/faqs.json", "w") as f:
        json.dump(faqs, f)

def import_csv(file):
    faqs = load_faqs()
    with open(file, "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            faqs.append({"question": row["question"], "answer": row["answer"], "intent": row.get("intent", "general")})
    save_faqs(faqs)