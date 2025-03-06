from app import db, DataPoint

with db.app.app_context():
    data = DataPoint.query.all()
    if data:
        print("Data Exists:", data)
    else:
        print("No Data Found!")
