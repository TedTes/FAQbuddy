from app import create_app
from flask import render_template,jsonify
from flask_jwt_extended.exceptions import NoAuthorizationError, InvalidHeaderError, JWTExtendedException
from werkzeug.exceptions import UnprocessableEntity,HTTPException
app = create_app()


@app.errorhandler(Exception)
def handle_all_errors(e):
    print("Unhandled Exception:", str(e))

    if isinstance(e, HTTPException):
        return jsonify({"error": e.description}), e.code
    else:
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(debug=True)