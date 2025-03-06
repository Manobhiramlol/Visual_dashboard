from db_config import db  # Import db from db_config

class DashboardData(db.Model):
    __tablename__ = "dashboard_data"

    id = db.Column(db.Integer, primary_key=True)
    intensity = db.Column(db.Float)
    likelihood = db.Column(db.Float)
    relevance = db.Column(db.Float)
    year = db.Column(db.Integer)
    country = db.Column(db.String(100))
    topic = db.Column(db.String(100))
    region = db.Column(db.String(100))
    city = db.Column(db.String(100))
    sector = db.Column(db.String(100))
    pestle = db.Column(db.String(100))
    source = db.Column(db.String(255))
    swot = db.Column(db.String(100))
