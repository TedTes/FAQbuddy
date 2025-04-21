from flask import Blueprint,jsonify,render_template,current_app



index_bp = Blueprint("index_bp",__name__)

@index_bp.route("/health",methods=["GET"])
def check_health():
    return jsonify({"status":"ok"})

@index_bp.route("/", methods=["GET"])
def index():
    return current_app.send_static_file("index.html")