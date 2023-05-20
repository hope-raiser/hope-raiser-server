# HopeRaiser Server

This is a backend for HopeRaiser using Express.js and Prisma ORM.

## Installation 
Install dependencies by running:
```bash
npm install
# OR
yarn install
```

Create an `.env` file before migrating the database. Refer to the `.envexample` for guidance.

Migrate database and initial seed by running:
```bash
npx prisma migrate dev
```

Run the server locally by running:
```bash
nodemon index.js
```

The server will run at [http://localhost:3000](http://localhost:3001)
