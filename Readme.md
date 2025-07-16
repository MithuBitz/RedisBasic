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
- Lets solve the problem without using redis. Just create a hash map to store the total page count of each book. and check if the total page count is already cached then no need to fetch it again.
- So why use Redis than?
- At this moment the fetch data store inside the local mechine and it will be removed if the server is restarted and also server never access this local data. Also we must need to implement clear, LRU, server crash, etc to handle the data inside the cache.
- ANd here comes redis, it will help us to store the data inside the Redis and also we can fetch the data from the Redis and also we can clear the data from the Redis.
- To implement the redis with help of docker first create a `docker-compose.yml` file where we set the services with redis image and ports. and run `docker compose up -d`
- We need some SDK to connect with redis. The best is ioredis. Lets install it and then setup it with help of redis.
- If we run the server in multiple port by using `export PORT=8000 && npm run dev` then also we can access the redis data like act as a distributed cacheing.
- 
