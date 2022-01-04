# portfolio-project
My simple portfolio, quite small shop template with basic functionality.

# setup
I chose `yarn` as package manager so you must have it installed. To add all packages run ```yarn setup``` in the root directory.

# database
Project uses PostgreSQL 13.4 or higher. Database dump is in **./backend/sql**. 
To restore data create database with name **ygportfoliodb** and run in terminal:
```
psql -f "abs path to the db_restore file" ygportfoliodb
```
Edit *.env*-file, which placed in **./backend/.env**, expecially `# postgres role config` and set them according to your own prefferences and system settings.