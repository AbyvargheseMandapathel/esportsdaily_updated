import sqlite3
import psycopg2

# Connect to SQLite
sqlite_conn = sqlite3.connect('db.sqlite3')  # Path to your SQLite DB
sqlite_cursor = sqlite_conn.cursor()

# Connect to PostgreSQL
pg_conn = psycopg2.connect(
    dbname='postgres',
    user='postgres.mtxjaqvodwllwzqthdbg',
    password='6L]kRxIpzgc/3A9q8^U=',
    host='aws-0-ap-south-1.pooler.supabase.com',
    port='5432'
)
pg_cursor = pg_conn.cursor()

# Set the table we want to transfer
table = 'tournament_score'
print(f"Transferring table: {table}")

# Fetch all data from SQLite for the `tournament_score` table
sqlite_cursor.execute(f"SELECT * FROM {table}")
rows = sqlite_cursor.fetchall()

# Get column names for `tournament_score`
sqlite_cursor.execute(f"PRAGMA table_info({table})")
columns = [info[1] for info in sqlite_cursor.fetchall()]

# Exclude the 'id' column from the insert statement if it's auto-incremented
if 'id' in columns:
    columns.remove('id')

# Prepare the column names and placeholders for the insert query
columns_list = ', '.join(columns)
placeholders = ', '.join(['%s'] * len(columns))

# Debug: Print the first 5 rows to check for column mismatch
for row in rows[:5]:  # Print the first 5 rows for inspection
    print(f"Row: {row}, Expected columns: {len(columns)}, Found values: {len(row)}")

# Bulk insert data into PostgreSQL
try:
    # Convert 'wwcd' column from integer to boolean if needed
    for i in range(len(rows)):
        # Convert integer to boolean for 'wwcd' column, if it exists
        if 'wwcd' in columns:
            wwcd_index = columns.index('wwcd')
            rows[i] = (
                *rows[i][:wwcd_index],
                bool(rows[i][wwcd_index]),
                *rows[i][wwcd_index + 1:]
            )

    # Insert rows into PostgreSQL
    pg_cursor.executemany(
        f"INSERT INTO {table} ({columns_list}) VALUES ({placeholders})", rows
    )
    pg_conn.commit()
    print("🎉 Tournament score table transferred successfully!")
except Exception as e:
    print(f"❌ Error inserting into tournament_score: {e}")
    pg_conn.rollback()

# Close the connections
sqlite_conn.close()
pg_conn.close()
