# Authentication - Proof of Concept

[![Continuous Integration](https://github.com/szabikr/move-to-done/actions/workflows/ci-pipeline.yml/badge.svg?branch=main)](https://github.com/szabikr/move-to-done/actions/workflows/ci-pipeline.yml)

### Install dependencies

Run `$ yarn install` in root folder. The project is using `yarn workspaces` so all packages will have their dependencies installed

### Establish Database connection

- Login to MongoDB Atlas
- Give access to your current IP address
- Acquire Database Connection String
- Set `DB_CONNECTION_STRING` in `.env` files

## Utils Package

It is a command line interface that has the ability to execute a few database opperations:

- `help` - list all the available opperations
- `count users` - will return the number of users in the database
- `delete e2e test users` - delete all users that start with `e2e-test`

Uses the [NodeJS readline library](https://nodejs.org/api/readline.html) for user input and connects to MongoDB instance via [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/v4.3/)

Prerequisites

- Dependencies must be installed
- `DB_CONNECTION_STRING` has to be defined as an environment variable

Run package

- `$ yarn workspace @auth/utils start` in order to start Utils CLI
- `$ yarn workspace @auth/utils dev` in order to start the development environment

## Server package

The project achitecture follows the traditional Client Server Database approach so the `server` is responsible for exposing an API via ExpressJS .
