from flask import Blueprint, request, jsonify, session,current_app,render_template
from app.nlp.intent_classifier import predict_intent
from app.nlp.similarity_matcher import match_faq
from app.nlp.dynamic_logic import process_dynamic
from app.data.faq_manager import load_faqs, save_faqs
from flask import jsonify
from app.services.faq_service import add_faq,update_faq,delete_faq
from app.services.config_service import get_config,update_config

faq_bp = Blueprint("faq", __name__)


@faq_bp.route("/ask", methods=["POST"])
def ask():
    try:
        query = request.json.get("query")
        intent = predict_intent(query)
        session["last_intent"] = intent
        answer = match_faq(query, intent)
        final_answer = process_dynamic(query, intent, answer)
        return jsonify({"answer": final_answer})
    except Exception as e:
        return jsonify({f"internal server error:{str(e)}"}),500
@faq_bp.route("/faqs", methods=["POST"])
def add_faq():
    data = request.get_json()
    faq_id = faq_service(data)
    return jsonify({"id": faq_id, **data}), 201


@faq_bp.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@faq_bp.route("/faqs/<int:id>", methods=["DELETE"])
def delete_faq(id):
    try:
        delete_faq(id)
        return jsonify({"message": "Deleted"}), 204
    except ValueError  as ve:
        return jsonify({"error": str(ve)}), 404
    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500

@faq_bp.route("/config/<int:user_id>", methods=["GET"])
def get_config(user_id):
    try:  
        config = get_config(user_id)
        response = dict(config) if config else {"theme": "blue", "logo": "https://cafe.com/logo.png"}
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500


@faq_bp.route("/faqs", methods=["GET"])
def list_faqs():
    try:
        faqs = list_faqs()
        return jsonify([dict(faq) for faq in faqs])
    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500


@faq_bp.route("/api/config/<int:user_id>", methods=["PATCH"])
def update_config(user_id):
    try:
        data = request.get_json()
        update_config(user_id, data)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error updating config": "Internal Server Error"}), 500

@faq_bp.route("/faqs/<int:id>", methods=["PUT"])
def update_faq(id):
    try:
       data = request.get_json()
       update_faq(id,data)
       return jsonify(data)
    except Exception as e:
        return jsonify({"update faq error": "Internal Server Error"}), 500
    
   
