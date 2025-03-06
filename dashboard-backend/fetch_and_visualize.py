import matplotlib.pyplot as plt
import pandas as pd
from app import app, db  # Import Flask app
from models import DashboardData  # Import model

# Ensure app context is available
with app.app_context():
    data = DashboardData.query.all()

    # Convert data to Pandas DataFrame
    df = pd.DataFrame([
        {
            "intensity": record.intensity,
            "likelihood": record.likelihood,
            "relevance": record.relevance,
            "year": record.year,
            "country": record.country,
            "topic": record.topic,
            "sector": record.sector,
            "pestle": record.pestle
        }
        for record in data
    ])

# Visualization: Distribution of Intensity
plt.figure(figsize=(10, 5))
plt.hist(df["intensity"].dropna(), bins=20, color="blue", alpha=0.7)
plt.xlabel("Intensity")
plt.ylabel("Frequency")
plt.title("Distribution of Intensity")
plt.show()
