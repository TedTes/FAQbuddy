from flask import Flask
from config import Config
from app.routes import register_routes
from flask_jwt_extended import  JWTManager

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    jwt.init_app(app)
    register_routes(app)
    return app