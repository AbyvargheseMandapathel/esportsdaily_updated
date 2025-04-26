import sqlite3
import csv

# Connect to SQLite
sqlite_conn = sqlite3.connect('db.sqlite3')  # Path to your SQLite DB
sqlite_cursor = sqlite_conn.cursor()

# Set the table we want to export
table = 'tournament_score'
print(f"Exporting table: {table} to CSV")

# Fetch all data from SQLite for the `tournament_score` table
sqlite_cursor.execute(f"SELECT * FROM {table}")
rows = sqlite_cursor.fetchall()

# Get column names for `tournament_score`
sqlite_cursor.execute(f"PRAGMA table_info({table})")
columns = [info[1] for info in sqlite_cursor.fetchall()]

# Specify the CSV file path where data will be saved
csv_file_path = f"{table}.csv"

# Write the data to a CSV file
try:
    with open(csv_file_path, mode='w', newline='', encoding='utf-8') as csv_file:
        csv_writer = csv.writer(csv_file)
        
        # Write the header (column names)
        csv_writer.writerow(columns)
        
        # Write the rows of data
        csv_writer.writerows(rows)
        
    print(f"🎉 {table} table exported successfully to {csv_file_path}")
except Exception as e:
    print(f"❌ Error exporting table to CSV: {e}")

# Close the SQLite connection
sqlite_conn.close()
