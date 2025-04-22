from flask import Flask
from .faq import faq_bp
from .auth import auth_bp
from .index import index_bp
API_PREFIX = "/api/v1"

def register_routes(app:Flask):
    app.register_blueprint(faq_bp,url_prefix = f"{API_PREFIX}")
    app.register_blueprint(auth_bp,url_prefix = f"{API_PREFIX}/auth")
    app.register_blueprint(index_bp)