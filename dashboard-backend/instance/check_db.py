import sqlite3

conn = sqlite3.connect("../instance/dashboard.db")  # Try checking this location
cursor = conn.cursor()

cursor.execute("SELECT * FROM datapoint")
rows = cursor.fetchall()
print("Data in instance/dashboard.db:", rows)

conn.close()
