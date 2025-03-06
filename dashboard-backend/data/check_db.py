import sqlite3

conn = sqlite3.connect("dashboard.db")  # Since you are already inside 'data' folder
cursor = conn.cursor()

cursor.execute("SELECT * FROM datapoint")  # Check if table has data
rows = cursor.fetchall()
print("Data in dashboard.db:", rows)

conn.close()
