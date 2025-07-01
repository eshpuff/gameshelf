from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from .db import db
from .routes import main_bp

def create_app():
    app = Flask(__name__, static_folder='../frontend', static_url_path='')
    app.config.from_object('config.Config')

    db.init_app(app)
    CORS(app)

    app.register_blueprint(main_bp)

    with app.app_context():
        db.create_all()

    return app