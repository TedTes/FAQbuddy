from flask import Flask, request , jsonify
import spacy
import json

app = Flask(__name__)
nlp = spacy.load("en_core_web_lg")

with open("./data/faqs.json", "r") as f:
    faqs = json.load(f)

@app.route("/",methods=["GET"])
def home():
    return "<div>hello world</div>"

@app.route("/ask", methods = ["POST"])
def ask():
    query = request.json.get("query")
    query_doc = nlp(query)
    best_match = max(faqs, key=lambda x: query_doc.similarity(nlp(x["question"])))
    score = query_doc.similarity(nlp(best_match["question"]))
    if score > 0.8:
        return jsonify({"answer": best_match["answer"]})
    return jsonify({"answer": "Sorry, I don’t know that yet!"})

if __name__ == "__main__":
    app.run(debug=True)
