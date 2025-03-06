import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

# Ensure the data directory exists
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(DATA_DIR, "dashboard.db")
SQLALCHEMY_TRACK_MODIFICATIONS = False
