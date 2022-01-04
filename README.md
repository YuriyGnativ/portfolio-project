# portfolio-project
My simple portfolio, quite small shop template with basic functionality.

# setup
Project uses `NodeJS` v14+ and `Yarn` as package manager so you must have it installed as well. To add all packages run ```yarn setup``` in the root directory.

# database
Project also uses PostgreSQL 13.4 or higher. Database dump is in **./backend/sql**. 
To restore data create database with name **ygportfoliodb** and run in terminal:
```
psql -f "abs path to the db_restore file" ygportfoliodb
```
Edit *.env*-file, which placed in **./backend/.env**, expecially `# postgres role config` and set them according to your own prefferences and system settings.