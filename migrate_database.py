import os
import sys
import subprocess
import datetime

def migrate_database():
    """
    Script to migrate complete data and database structure to a new database.
    This will:
    1. Create a backup of the current database
    2. Create a new database (if specified)
    3. Apply migrations to the new database
    4. Load data from the backup into the new database
    """
    # Get current timestamp for backup filename
    timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_file = f"database_backup_{timestamp}.json"
    
    print(f"Starting database migration process...")
    
    # Step 1: Create a backup of the current database
    print(f"Creating backup of current database to {backup_file}...")
    try:
        subprocess.run(
            ["python", "manage.py", "dumpdata", "--exclude", "contenttypes", "--exclude", "auth.permission", 
             "--indent", "4", "-o", backup_file],
            check=True
        )
        print(f"Backup created successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error creating backup: {e}")
        return False
    
    # Step 2: Ask if user wants to switch to a new database
    use_new_db = input("Do you want to switch to a new database? (yes/no): ").lower() == 'yes'
    
    if use_new_db:
        # Update settings to point to the new database
        print("Please update your database settings in settings.py manually.")
        input("Press Enter when you've updated the settings...")
    
    # Step 3: Apply migrations to the new database
    print("Applying migrations to the database...")
    try:
        subprocess.run(["python", "manage.py", "migrate"], check=True)
        print("Migrations applied successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error applying migrations: {e}")
        return False
    
    # Step 4: Load data from the backup
    print(f"Loading data from backup {backup_file}...")
    try:
        subprocess.run(["python", "manage.py", "loaddata", backup_file], check=True)
        print("Data loaded successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error loading data: {e}")
        return False
    
    print("Database migration completed successfully!")
    return True

if __name__ == "__main__":
    # Make sure we're in the Django project directory
    if not os.path.exists("manage.py"):
        print("Error: This script must be run from the Django project directory.")
        sys.exit(1)
    
    migrate_database()