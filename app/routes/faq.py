from flask import Blueprint, request, jsonify, session,current_app,render_template
from app.nlp.intent_classifier import predict_intent
from app.nlp.similarity_matcher import match_faq
from app.nlp.dynamic_logic import process_dynamic
from app.data.faq_manager import load_faqs, save_faqs
from app.services.faq_service import add_faq,update_faq,delete_faq
from app.services.config_service import get_config,update_config

from flask_jwt_extended import  jwt_required, get_jwt_identity


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
@jwt_required()
def add_faq():
    user_id = get_jwt_identity()
    data = request.get_json()
    faq_id = add_faq(user_id,data)
    return jsonify({"id": faq_id, **data}), 201


@faq_bp.route("/faqs/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_faq(id):
    try:
        user_id = get_jwt_identity()
        delete_faq(user_id,id)
        return jsonify({"message": "Deleted"}), 204
    except ValueError  as ve:
        return jsonify({"error": str(ve)}), 404
    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500

@faq_bp.route("/config/<int:user_id>", methods=["GET"])
def get_config():
    try:  
        config = get_config()
        response = dict(config) if config else {"theme": "blue", "logo": "https://cafe.com/logo.png"}
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500


@faq_bp.route("/faqs", methods=["GET"])
@jwt_required()
def list_faqs():
    try:
        user_id = get_jwt_identity()
        faqs = list_faqs(user_id)
        return jsonify([dict(faq) for faq in faqs])
    except Exception as e:
        return jsonify({"error": "Internal Server Error"}), 500


@faq_bp.route("/api/config/<int:user_id>", methods=["PATCH"])
@jwt_required()
def update_config():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        update_config(user_id, data)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error updating config": "Internal Server Error"}), 500

@faq_bp.route("/faqs/<int:id>", methods=["PUT"])
@jwt_required()
def update_faq(id):
    try:
       user_id = get_jwt_identity()
       data = request.get_json()
       update_faq(user_id,id,data)
       return jsonify(data)
    except Exception as e:
        return jsonify({"update faq error": "Internal Server Error"}), 500
    
   
