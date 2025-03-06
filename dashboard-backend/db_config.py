from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)  # Ensure 'app' is correctly initialized

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///dashboard.db"  # or your database URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)  # Ensure 'db' is also correctly initialized
