from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# ✅ Convert database path to absolute path
db_path = os.path.abspath("data/dashboard.db")
print("Database path:", db_path)

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # Suppress warnings

# ✅ Initialize the database BEFORE defining models
db = SQLAlchemy(app)

# ✅ Define Database Model AFTER initializing db
class DashboardData(db.Model):  # Updated class name to match actual table
    __tablename__ = "dashboard_data"  # Explicitly define the table name

    id = db.Column(db.Integer, primary_key=True)
    intensity = db.Column(db.Float)
    likelihood = db.Column(db.Float)
    relevance = db.Column(db.Float)
    year = db.Column(db.Integer)
    country = db.Column(db.String(50))
    topic = db.Column(db.String(100))
    region = db.Column(db.String(100))
    city = db.Column(db.String(100))

# ✅ Create tables inside the application context
with app.app_context():
    db.create_all()

# ✅ Load JSON data AFTER defining the model
json_data = []
json_file_path = "data/jsondata.json"
if os.path.exists(json_file_path):
    with open(json_file_path, "r", encoding="utf-8") as file:
        json_data = json.load(file)
    print("Loaded JSON Data:", json_data[:5])  # ✅ Print only first 5 items for debugging
else:
    print(f"⚠️ Warning: {json_file_path} not found!")

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Blackcoffer Dashboard API!"})

@app.route("/dashboard", methods=["GET"])
def dashboard():
    return render_template("index.html")  # ✅ This serves the HTML file

# ✅ Corrected API to fetch all database records (Removed Duplicate)
@app.route('/filtered-data', methods=['GET'])
def get_filtered_dashboard_data():
    try:
        data = DashboardData.query.all()  # ✅ Use correct model name
        return jsonify([{
            "id": entry.id,
            "intensity": entry.intensity,
            "likelihood": entry.likelihood,
            "relevance": entry.relevance,
            "year": entry.year if entry.year is not None else 0,  # Replace None with 0
            "country": entry.country if entry.country else "Unknown",
            "topic": entry.topic if entry.topic else "Unknown",
            "region": entry.region if entry.region else "Unknown",
            "city": entry.city if entry.city else "Unknown"
        } for entry in data])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
