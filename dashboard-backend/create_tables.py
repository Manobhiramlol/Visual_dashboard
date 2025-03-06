from db_config import app, db
from models import DashboardData  # Import your model

with app.app_context():  # Ensure app context
    db.create_all()  # Create tables
    print("Tables created successfully!")
