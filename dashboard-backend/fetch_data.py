from db_config import app, db
from models import DashboardData  # Import models after db is initialized

with app.app_context():  # Ensure the app context is active
    records = DashboardData.query.all()
    for record in records:
        print({
            "id": record.id,
            "intensity": record.intensity,
            "likelihood": record.likelihood,
            "relevance": record.relevance,
            "year": record.year,
            "country": record.country,
            "topic": record.topic,
            "region": record.region,
            "city": record.city,
            "sector": record.sector,
            "pestle": record.pestle,
            "source": record.source,
            "swot": record.swot
        })
