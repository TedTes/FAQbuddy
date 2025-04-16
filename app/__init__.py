from flask import Flask
from config import Config
from app.data.faq_manager import load_faqs
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.faqs = load_faqs()
    from app import routes
    app.register_blueprint(routes.bp)
    return app