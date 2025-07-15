# Redis Besic Playground

## This is a basic playground for redis concept

## Techstack used - Typescript, Node.j, express@4.x, axios.

## Used a great open source project from great Hitesh ji "freeApi" to get the book data to play with redis.

## Redis helps to manage the primary data storage for the application.

# Steps to Follow:

- Install typescript and run `tsc --init` to create tsconfig.json file. and then modify the config file like uncomment the `rootDir` and set it to "./src" and `outdir` to "./dist".
- Now create a src folder where create a index.ts file where we need to code for redis.
- Implement a simple code with help of express and create a "/" route and return a success message.
- Create two script in package.json file like `start` and `build`.
- ALso we need to install tsc-watch library as a dev dependency to auto execute the code and also create a dev script to run it.
- With help of axios get all books data from the freeApi.
- We also create a `/books/total` route to get the total page count of all books. It will gives the total page count of all books. And to fetch this data from freeapi it takes some time because each time it will go to the api and get the data. Here comes Redis to solve the problem.
- 
