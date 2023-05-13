# Lost and Found API - Airport AI Technical Exercise

This repository is the implementation of the Airport AI Technical Exercise, contains a REST API developed using TypeScript and the Nest.js framework. It consists of a lost and found system for airports with several endpoints, described in the features section.

## Features
- Create/List/Update/Delete products
- Search for a product by keywords
- Search for a product by message
- Airport role based authentication (Agent/Passenger)
- Postman collection to interact with the API

## Installation

To install the dependencies, run:

```bash
  yarn install
```

## Configuration

Before start install PostgreSQL and fill correct configurations in .env file
```bash
#if you are using docker
DB_HOST=database
DB_PORT=27017
DB_USERNAME=airportai
DB_PASSWORD=airportai
DB_DATABASE=airportai
#else 
DB_HOST=localhost
DB_PORT=27017
DB_USERNAME=airportai
DB_PASSWORD=airportai
DB_DATABASE=airportai
```

Some helper script to work with database
```bash
# To create new migration file
yarn migration:create migration_name

# Truncate full database (note: it isn't deleting the database)
yarn schema:drop

# Generate migration from update of entities
yarn migration:generate 
```

## Docker
if you are familiar with docker and docker-compose then you can run built in docker-compose file, which will install and configure application and database for you.

### Docker installation
Download docker from Official website

- Mac https://docs.docker.com/docker-for-mac/install/
- Windows https://docs.docker.com/docker-for-windows/install/
- Ubuntu https://docs.docker.com/install/linux/docker-ce/ubuntu/

### Docker-compose installation
Download docker from Official website

### Run
Open terminal and navigate to project directory and run the following command.

```bash
PORT=3000 docker-compose up --build
```
Note: application will run on port 3000 (http://localhost:3000)

## Tests
To run the tests, run:
```bash
yarn run test
```

## Dev Server
Launch the dev server
```bash
yarn start:dev
```

## OpenAPI Documentation
You can access the OpenAPI documentation by accessing https://localhost:3000/api

## API endpoints

### Register Agent
`POST /auth/register`

### Login Agent
`POST /auth/login`

### List Products
`GET /products`

### Create Product
`POST /products`

### Update Product
`PUT /products/:id`

### Delete Product
`DELETE /products/:id`

### Search Product by Message
`GET /products/search`

## Author
- Author - [Nuno Félix](https://github.com/nunomfelix)