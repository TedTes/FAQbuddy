from flask import Flask
from config import Config
from app.routes import register_routes
from flask_jwt_extended import  JWTManager
from flask_cors import CORS

jwt = JWTManager()

def create_app():
    app = Flask(__name__, static_folder="static", static_url_path="/")
    app.config.from_object(Config)
    jwt.init_app(app)
    CORS(app, supports_credentials=True)
    register_routes(app)
    return app