"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const ioredis_1 = __importDefault(require("ioredis"));
const app = (0, express_1.default)();
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
// interface CacheStore {
//   totalPageCount: number;
// }
// // Create a hash map to store the total page count of each book
// const cacheStore: CacheStore = {
//   totalPageCount: 0,
// };
// Set up the redis
const redis = new ioredis_1.default({ host: "localhost", port: Number(6379) });
app.get("/", (req, res) => {
    return res.json({ status: "success" });
});
app.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get("https://api.freeapi.app/api/v1/public/books");
    return res.json(response.data);
}));
app.get("/books/total", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // If the total page count is already cached then no need to fetch it again
    //   if (cacheStore.totalPageCount) {
    //     console.log("Cached HIT");
    var _a, _b, _c;
    //     return res.json({ totalPageCount: Number(cacheStore.totalPageCount) });
    //   }
    // Lets use Redis to solve the problem
    const cachedValue = yield redis.get("totalPageValue");
    if (cachedValue) {
        console.log("Cached HIT");
        return res.json({ totalPageCount: Number(cachedValue) });
    }
    const response = yield axios_1.default.get("https://api.freeapi.app/api/v1/public/books");
    const totalPageCount = (_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.reduce((acc, curr) => { var _a, _b; return !((_a = curr.volumeInfo) === null || _a === void 0 ? void 0 : _a.pageCount) ? 0 : ((_b = curr.volumeInfo) === null || _b === void 0 ? void 0 : _b.pageCount) + acc; }, 0);
    // Set the cached total page count
    //   cacheStore.totalPageCount = Number(totalPageCount);
    // Set the cached value with help of redis
    yield redis.set("totalPageValue", totalPageCount);
    console.log("Cached MISS");
    return res.json({ totalPageCount });
}));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
