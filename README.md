# portfolio-project
My simple portfolio, quite small shop template with basic functionality.

# setup
App uses `NodeJS` v14+ and `Yarn` as package manager so you must have it installed as well. To install the dependencies run ```yarn setup``` in the root dir.

# database
Project also uses PostgreSQL 13.4 or higher. Database dump is in **./backend/sql**. 
To restore data create database with name **ygportfoliodb** and run in terminal:
```
psql -f **"path to the db dump"** ygportfoliodb
```
Edit *.env*-file, which placed in **./backend/.env**, expecially `# postgres role config` and set them according to your own prefferences and system settings.