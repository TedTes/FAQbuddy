from flask import Blueprint, request, jsonify, session,current_app,render_template
from app.nlp.intent_classifier import predict_intent
from app.nlp.similarity_matcher import match_faq
from app.nlp.dynamic_logic import process_dynamic
from app.data.faq_manager import load_faqs, save_faqs
from flask import jsonify
from app.services.faq_service import add_faq,update_faq

bp = Blueprint("routes", __name__,url_prefix="/api/v1")


@bp.route("/ask", methods=["POST"])
def ask():
    query = request.json.get("query")
    intent = predict_intent(query)
    session["last_intent"] = intent
    answer = match_faq(query, intent,current_app.faqs)
    final_answer = process_dynamic(query, intent, answer)
    return jsonify({"answer": final_answer})

@bp.route("/api/faqs", methods=["POST"])
def add_faq():
    data = request.get_json()
    faq_id = faq_service(data)
    return jsonify({"id": faq_id, **data}), 201

@bp.route("/health",methods=["GET"])
def check_health():
    return jsonify({"status":"ok"})

@bp.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@bp.route("/config", methods=["GET"])
def get_config():
    # TODO: Fetch from database
    return jsonify({"theme": "blue", "logo": "https://cafe.com/logo.png"})

@bp.route("/")
def index():
    return render_template("index.html")

@bp.route("/api/faqs/<int:id>", methods=["PUT"])
def update_faq(id):
    data = request.get_json()
    update_faq(id,data)
    return jsonify(data)