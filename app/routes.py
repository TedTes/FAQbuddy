from flask import Blueprint, request, jsonify, session,current_app
from app.nlp.intent_classifier import predict_intent
from app.nlp.similarity_matcher import match_faq
from app.nlp.dynamic_logic import handle_dynamic
from app.data.faq_manager import load_faqs, save_faqs


bp = Blueprint("routes", __name__)


@bp.route("/ask", methods=["POST"])
def ask():
    query = request.json.get("query")
    intent = predict_intent(query)
    session["last_intent"] = intent
    answer = match_faq(query, intent,current_app.faqs)
    final_answer = handle_dynamic(query, intent, answer)
    return jsonify({"answer": answer})