import json

def log_feedback(query, answer, helpful):
    with open("data/feedback.json", "a") as f:
        json.dump({"query": query, "answer": answer, "helpful": helpful}, f)
        f.write("\n")