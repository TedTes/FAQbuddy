
from flask import Blueprint,jsonify,request
from werkzeug.exceptions import UnprocessableEntity
from app.services.auth_service import register_user,login_user,me
from flask_jwt_extended import  jwt_required, get_jwt_identity,set_access_cookies
import sqlite3

auth_bp = Blueprint("auth_bp",__name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        business_name = data.get("business_name")

        if not email or not password or not business_name:
            return jsonify({"error": "Missing fields"}), 400
        register_user(email,password)
        return jsonify({"message": "Registered", "business_name":business_name}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error":"Email already exits"}),400
    except Exception as e:
        return jsonify({"error" : str(e)}),500


@auth_bp.route("/login", methods=["POST"])
def login():
    try:
      
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")
        access_token , business_id = login_user(email,password)
        response = jsonify({"business_id": business_id})
        set_access_cookies(response, access_token)
        return response
    except Exception as e:
        print(f"error login: {str(e)}")
        return jsonify({"error": "Invalid credentials"}), 401
   


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    try:
        user_id = get_jwt_identity()
        user = me()
        return jsonify(dict(user) if user else {"error": "User not found"}), 200 if user else 404
    except Exception as e:
        return jsonify( {"error": "Internal server error"}), 500


@auth_bp.route('/check')
@jwt_required()
def auth_check():
    user_id = get_jwt_identity()
    return jsonify({"authenticated": True, "user": user_id})


@auth_bp.route('/logout')
def logout():
    resp = make_response(jsonify({"success": True}))
    resp.set_cookie('token', '', expires=0)
    return resp





@auth_bp.errorhandler(UnprocessableEntity)
def handle_422(e):
    return jsonify({"error": "Invalid token or malformed request"}), 422