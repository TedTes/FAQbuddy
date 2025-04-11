from flask import Blueprint, request, jsonify, session
from app.nlp.intent_classifier import predict_intent
from app.nlp.similarity_matcher import match_faq
from app.data.faq_manager import load_faqs, save_faqs


bp = Blueprint("routes", __name__)


@bp.route("/ask", methods=["POST"])
def ask():
    query = request.json.get("query")
    intent = predict_intent(query)
    session["last_intent"] = intent
    answer = match_faq(query, intent)
    return jsonify({"answer": answer})