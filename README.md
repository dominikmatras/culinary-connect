## About application

App Name: **👨🏻‍🍳 Culinary Connect**

An application written by us for efficient restaurant service.

## Technologies .

### Backend

Backend in our application is build in Node.js with framework Express.js. The database engine is MongoDB with framework Mongoose

- Node.js - v20.9.0
- MongoDB - 7.0.11 Atlas

### Frontend

We used React.js library witch Vite engine to write a frontend. Less.js is responsible for the styles.

- React.js - 18.2.0
- Less.js - 4.2.0

## Culinary Connect API

[Documentation API](/api-documentation.md)

## Startup

At first you need package manager - **Bun** ([Download](https://bun.sh/))

When you install Bun, `/backend`,

```console
dominik@culinary-connect:~$ cd backend
```

You must install all packages, using:

```console
dominik@culinary-connect:~$ bun i
```

And you can run backend aplication

```console
dominik@culinary-connect:~$ bun start
```

Now you need to repeat the same thing in the folder `/fronend`:

```console
dominik@culinary-connect:~$ cd ../frontend
```

```console
dominik@culinary-connect:~$ bun i
```

```console
dominik@culinary-connect:~$ bun start
```

## Run tests

```console
dominik@culinary-connect:~$ bun test
```
