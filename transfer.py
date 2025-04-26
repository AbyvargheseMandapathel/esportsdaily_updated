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

# --- Fetch all table names from SQLite ---
sqlite_cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = [row[0] for row in sqlite_cursor.fetchall()]

print(f"Tables found: {tables}")

for table in tables:
    if table == 'django_migrations':  # (optional) skip if you want
        continue

    print(f"Transferring table: {table}")

    # Fetch all data from SQLite
    sqlite_cursor.execute(f"SELECT * FROM {table}")
    rows = sqlite_cursor.fetchall()

    # Get column names
    sqlite_cursor.execute(f"PRAGMA table_info({table})")
    columns = [info[1] for info in sqlite_cursor.fetchall()]
    columns_list = ', '.join(columns)
    placeholders = ', '.join(['%s'] * len(columns))

    # Insert data into Postgres
    for row in rows:
        try:
            pg_cursor.execute(
                f"INSERT INTO {table} ({columns_list}) VALUES ({placeholders})",
                row
            )
        except Exception as e:
            print(f"❌ Error inserting into {table}: {e}")

    pg_conn.commit()
    print(f"✅ Finished transferring {table}")

# Close connections
sqlite_conn.close()
pg_conn.close()

print("🎉 ALL TABLES transferred successfully!")
