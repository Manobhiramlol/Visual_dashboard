import db_config # Import first
from db_config import db, app
import json


# Load JSON data
with open("data/jsondata.json", "r", encoding="utf-8") as f:
    data = json.load(f)

class DashboardData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    intensity = db.Column(db.Float)
    likelihood = db.Column(db.Float)
    relevance = db.Column(db.Float)
    year = db.Column(db.Integer)
    country = db.Column(db.String(255))
    topic = db.Column(db.String(255))
    region = db.Column(db.String(255))
    city = db.Column(db.String(255))

# Function to safely convert values to float
def convert_to_float(value):
    try:
        return float(value) if value not in ('', None) else None
    except ValueError:
        return None  # Return None if conversion fails

# Convert JSON data values before inserting into the database
for record in data:
    record['intensity'] = convert_to_float(record.get('intensity'))
    record['likelihood'] = convert_to_float(record.get('likelihood'))
    record['relevance'] = convert_to_float(record.get('relevance'))

# Insert data into the database
with app.app_context():
    db.create_all()  # Ensure tables exist
    for entry in data:
        db_data = DashboardData(
            intensity=entry.get("intensity"),
            likelihood=entry.get("likelihood"),
            relevance=entry.get("relevance"),
            year=entry.get("year"),
            country=entry.get("country"),
            topic=entry.get("topic"),
            region=entry.get("region"),
            city=entry.get("city"),
        )
        db.session.add(db_data)
    
    try:
        db.session.commit()
        print("Data loaded successfully!")
    except Exception as e:
        db.session.rollback()
        print(f"Error inserting data: {e}")
