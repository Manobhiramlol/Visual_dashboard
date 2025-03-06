from flask import Flask, jsonify, request
import json

app = Flask(__name__)

# Load JSON data
with open("data/jsondata.json", "r", encoding="utf-8") as file:
    json_data = json.load(file)


@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Blackcoffer Dashboard API!"})

@app.route("/data")
def get_data():
    return jsonify(json_data)  # Return the entire JSON data

@app.route("/filtered-data")
def get_filtered_data():
    year = request.args.get("year")
    country = request.args.get("country")
    topic = request.args.get("topic")

    filtered_data = [
        item for item in json_data
        if (not year or str(item.get("year")) == year) and
           (not country or item.get("country") == country) and
           (not topic or item.get("topic") == topic)
    ]

    return jsonify(filtered_data)

if __name__ == "__main__":
    app.run(debug=True)
