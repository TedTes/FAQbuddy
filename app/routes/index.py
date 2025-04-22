from flask import Blueprint,jsonify,render_template,current_app,send_from_directory
import os
index_bp = Blueprint("index_bp",__name__)

@index_bp.route("/health",methods=["GET"])
def check_health():
    return jsonify({"status":"ok"})

@index_bp.route("/", defaults={"path": ""})
@index_bp.route("/<path:path>")
def catch_all(path):
    print("catch_all hit:", path)

    # Serve static files if they exist
    full_path = os.path.join(current_app.static_folder, path)
    if os.path.isfile(full_path):  # Only serve if the path is a file
        return send_from_directory(current_app.static_folder, path)

    # Otherwise, serve index.html for React to handle routing
    return current_app.send_static_file("index.html")
