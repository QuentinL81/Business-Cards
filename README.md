# Business-cards

## Starting a the project in local

### Launch Docker

To launch the docker container, you can run:

#### `cd docker/local`
#### `docker compose up -d`

Now the database was online.


### Launch the expressjs server

#### `cd server`
#### `npm install`
#### `npm run start`

Open [http://localhost:8080/api/cards](http://localhost:8080/api/cards) to see all cards

### Launch the react app

#### `cd react`
#### `npm install`
#### `npm run start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Server

### See all cards : GET [http://localhost:8080/api/cards](http://localhost:8080/api/cards)

### See a card : GET [http://localhost:8080/api/cards/:id](http://localhost:8080/api/cards/:id)

### Create a card : POST [http://localhost:8080/api/cards/](http://localhost:8080/api/cards/)

### Update a card : PUT [http://localhost:8080/api/cards/:id](http://localhost:8080/api/cards/:id)

### Architecture

Define database configuration : [db.config.js](app/config/db.config.js)

Configure route : [card.routes.js](app/routes/card.routes.js)

Apply endpoint rule : [card.controller.js](app/controllers/card.controller.js)

Define mapper between api dto and model : [card.controller.js](app/mappers/card.mapper.js)

Define database layer : [card.controller.js](app/models/card.model.js)