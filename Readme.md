# EVERYMUNDO API

## Description

This API is a microservice that will receive a country and currency combination and will return the formatted fare.

The API allows to perform the following operations:

- CRUD operations on the countries and currencies.
- Create formats for a given country and currency combination.
- CRUD operations on the formats.
- Get the formatted fare for a given country and currency combination.

## Install

Install the dependencies

    npm install

## Test

    npm run test

## Running the app on development mode

To run the app locally update the `.env` file with the correct values and run the following command:

    npm run dev

The server will start on port 3000 by default, you can change this value.

## Deploy on production mode

To Deploy to aws lambda using serverless framework, update the `.env` file with the correct values and run the following command:

    npm run deploy

The api will be deployed on aws lambda and the endpoint will be printed on the console.

## REST API

The api is available on the following url: https://d2w2imhjn0.execute-api.us-east-1.amazonaws.com/

Swagger Documentation is available on the following url: https://d2w2imhjn0.execute-api.us-east-1.amazonaws.com/docs/static/index.html

When using the swagger documentation remember to set the Schema to: HTTPS
