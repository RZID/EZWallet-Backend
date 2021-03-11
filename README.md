# EZ WALLET

EZ (Easy) Wallet is an application that provides a transfer feature between users.
This is the backend service for this app. You can see the frontend service [here](https://github.com/RZID/EZWallet-Frontend).

## Modules

1. [Bcrypt](https://www.npmjs.com/package/bcrypt)
2. [Body-parser](https://www.npmjs.com/package/body-parser)
3. [Cors](https://www.npmjs.com/package/cors)
4. [Dotenv](https://www.npmjs.com/package/dotenv)
5. [Express](https://www.npmjs.com/package/express)
6. [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
7. [Multer](https://www.npmjs.com/package/multer)
8. [Mysql2](https://www.npmjs.com/package/mysql2)
9. [Nodemon](https://www.npmjs.com/package/nodemon)

## How to use?

1. Clone this repository with `git clone https://github.com/RZID/EZWallet-Backend`.
2. Run `npm install` to install modules required.
3. Import database provided (wallet.sql) to your SQL DBMS.
4. Set .env file in root:
   - `PORT` = fill to set the API running port.
   - `DB_HOST` = fill with HOSTNAME in your database configuration.
   - `DB_USER` = fill with USERNAME in your database configuration.
   - `DB_PASSWORD` = fill with PASSWORD in your database configuration (or leave it null if your database doesn't have password).
   - `JWT_SECRET` = fill with the unique value due to signature verifier on JWT.
5. Run `npm run start` or `nodemon`

## Documentation

- [Postman](https://documenter.getpostman.com/view/13713483/TWDZGvp8)
- [Deploy](http://3.92.79.15:4001)

## Frontend

[Frontend](https://github.com/RZID/EZWallet-Frontend.git)
