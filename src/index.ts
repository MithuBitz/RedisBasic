import express from "express";
import axios from "axios";

import Redis from "ioredis";

const app = express();

const PORT = process.env.PORT ?? 8080;

// interface CacheStore {
//   totalPageCount: number;
// }

// // Create a hash map to store the total page count of each book
// const cacheStore: CacheStore = {
//   totalPageCount: 0,
// };

// Set up the redis
const redis = new Redis({ host: "localhost", port: Number(6379) });

app.get("/", (req, res) => {
  return res.json({ status: "success" });
});

app.get("/books", async (req, res) => {
  const response = await axios.get(
    "https://api.freeapi.app/api/v1/public/books"
  );
  return res.json(response.data);
});

app.get("/books/total", async (req, res) => {
  // If the total page count is already cached then no need to fetch it again
  //   if (cacheStore.totalPageCount) {
  //     console.log("Cached HIT");

  //     return res.json({ totalPageCount: Number(cacheStore.totalPageCount) });
  //   }

  // Lets use Redis to solve the problem
  const cachedValue = await redis.get("totalPageValue");
  if (cachedValue) {
    console.log("Cached HIT");
    return res.json({ totalPageCount: Number(cachedValue) });
  }

  const response = await axios.get(
    "https://api.freeapi.app/api/v1/public/books"
  );

  const totalPageCount = response?.data?.data?.data?.reduce(
    (acc: number, curr: { volumeInfo?: { pageCount?: number } }) =>
      !curr.volumeInfo?.pageCount ? 0 : curr.volumeInfo?.pageCount + acc,
    0
  );

  // Set the cached total page count
  //   cacheStore.totalPageCount = Number(totalPageCount);

  // Set the cached value with help of redis
  await redis.set("totalPageValue", totalPageCount);

  console.log("Cached MISS");
  return res.json({ totalPageCount });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
