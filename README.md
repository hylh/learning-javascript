# learning-javascript
Game creation with JS and PIXI

Run http-server with "npm start"

## Commands

### Heroku
Push to Heroku
git push heroku master

Push to GitHub
git push

Start 1 web node at Heroku
heroku ps:scale web=1

Stop every Heroku web node
heroku ps:scale web=0

View Heroku logs
heroku logs --tail

Open Heroku live site
heroku open

### Postgres
Open interactive shell on heroku
heroku pg:psql

Open interactive local shell
psql 'database name'

List all databases 
\l

Quit interactive shell
\q

Run migrations
psql "db" < migrations/schema_up.sql
psql "db" < migrations/schema_down.sql
psql "db" < migrations/seeds.sql

Send to heroku
heroku pg:push mylocaldb HEROKU_POSTGRESQL_MAGENTA