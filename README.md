# portfolio-project
My simple portfolio, quite small shop with basic functionality.

# database
Project uses PostgreSQL 13.4 or higher. All mock data is in backend/sql/db_restore. 
To restore data from dump create database with name YGPortfolioDB and run in terminal:
```
psql -f "abs path to the db_restore file" YGPortfolioDB
```