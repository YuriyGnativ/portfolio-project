# portfolio-project
My simple portfolio, quite small shop with basic functionality.

# setup
To install all packages run ```yarn setup``` in the root directory

# database
Project uses PostgreSQL 13.4 or higher. All mock data is in backend/sql/db_restore. 
To restore data from dump create database with name ygportfoliodb and run in terminal:
```
psql -f "abs path to the db_restore file" ygportfoliodb
```
Edit .env file in backend dir if needed