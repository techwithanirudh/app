"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extraRateLimit = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rate_limit_mongo_1 = __importDefault(require("rate-limit-mongo"));
const windowMs = 10 * 60 * 1000;
const extraRateLimit = (maxRequests) => (req, res, next) => {
    if (process.env.NODE_ENV === 'dev')
        return next();
    return (0, express_rate_limit_1.default)({
        max: maxRequests,
        message: JSON.stringify({ message: 'You are being rate limited' }),
        store: new rate_limit_mongo_1.default({
            uri: process.env.MONGO_URI,
            collectionName: 'extraRateLimits',
            expireTimeMs: windowMs,
        }),
        windowMs: windowMs / 2,
    })(req, res, next);
};
exports.extraRateLimit = extraRateLimit;
exports.default = (req, res, next) => {
    if (process.env.NODE_ENV === 'dev')
        return next();
    return (0, express_rate_limit_1.default)({
        max: 5000,
        message: JSON.stringify({ message: 'You are being rate limited' }),
        store: new rate_limit_mongo_1.default({
            uri: process.env.MONGO_URI,
            expireTimeMs: windowMs,
        }),
        windowMs,
    })(req, res, next);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0ZS1saW1pdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Jlc3QvbW9kdWxlcy9yYXRlLWxpbWl0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNEVBQTJDO0FBQzNDLHdFQUE4QztBQUU5QyxNQUFNLFFBQVEsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUd6QixNQUFNLGNBQWMsR0FBRyxDQUFDLFdBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDekcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxLQUFLO1FBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUVsRCxPQUFPLElBQUEsNEJBQVMsRUFBQztRQUNmLEdBQUcsRUFBRSxXQUFXO1FBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLENBQUM7UUFDbEUsS0FBSyxFQUFFLElBQUksMEJBQWMsQ0FBQztZQUN4QixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTO1lBQzFCLGNBQWMsRUFBRSxpQkFBaUI7WUFDakMsWUFBWSxFQUFFLFFBQVE7U0FDdkIsQ0FBQztRQUNGLFFBQVEsRUFBRSxRQUFRLEdBQUcsQ0FBQztLQUN2QixDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUE7QUFiWSxRQUFBLGNBQWMsa0JBYTFCO0FBR0Qsa0JBQWUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUNqRSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLEtBQUs7UUFBRSxPQUFPLElBQUksRUFBRSxDQUFDO0lBRWxELE9BQU8sSUFBQSw0QkFBUyxFQUFDO1FBQ2YsR0FBRyxFQUFFLElBQUk7UUFDVCxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxDQUFDO1FBQ2xFLEtBQUssRUFBRSxJQUFJLDBCQUFjLENBQUM7WUFDeEIsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUztZQUMxQixZQUFZLEVBQUUsUUFBUTtTQUN2QixDQUFDO1FBQ0YsUUFBUTtLQUNULENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQSJ9