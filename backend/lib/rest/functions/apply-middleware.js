"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const passport_local_1 = require("passport-local");
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const user_1 = require("../../data/models/user");
const rate_limiter_1 = __importStar(require("../modules/rate-limiter"));
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const crypto_1 = __importDefault(require("crypto"));
const util_1 = require("util");
const fs_1 = require("fs");
const validate_user_1 = __importDefault(require("../middleware/validate-user"));
const update_user_1 = __importDefault(require("../middleware/update-user"));
const child_process_1 = require("child_process");
const express_session_1 = __importDefault(require("express-session"));
const renameAsync = (0, util_1.promisify)(fs_1.rename);
const readFileAsync = (0, util_1.promisify)(fs_1.readFile);
function setupMulter(app) {
    const uploadDir = (0, path_1.resolve)('./assets/upload');
    try {
        (0, child_process_1.execSync)(`mkdir -p ${uploadDir} 2>> /dev/null`);
    }
    catch { }
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => cb(null, uploadDir),
        filename: (req, file, cb) => cb(null, Date.now() + (0, path_1.extname)(file.originalname)),
    });
    const upload = (0, multer_1.default)({
        storage,
        fileFilter: (req, file, callback) => {
            const ext = (0, path_1.extname)(file.originalname);
            const allowedTypes = ['.png', '.jpg', '.gif', '.jpeg', '.webp', '.svg'];
            if (!allowedTypes.includes(ext))
                return callback(new Error('This image file type is not allowed'));
            callback(null, true);
        },
        limits: { fileSize: 1024 * 1024 },
    });
    app.post('/v2/upload', update_user_1.default, validate_user_1.default, (0, rate_limiter_1.extraRateLimit)(10), upload.single('file'), async (req, res) => {
        const file = req.file;
        const buffer = await readFileAsync(file.path);
        const hash = crypto_1.default
            .createHash('md5')
            .update(buffer)
            .digest('hex');
        const newFileName = hash + (0, path_1.extname)(file.originalname);
        await renameAsync(file.path, `${uploadDir}/${newFileName}`);
        log.silly(`Uploaded ${newFileName}`);
        const url = `/upload/${newFileName}`;
        res.status(201).json({ hash, url });
    });
}
function setupPassport(app) {
    passport_1.default.use(new passport_local_1.Strategy({ usernameField: 'email' }, user_1.User.authenticate()));
    passport_1.default.serializeUser(user_1.User.serializeUser());
    passport_1.default.deserializeUser(user_1.User.deserializeUser());
}
exports.default = (app) => {
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    app.use(passport_1.default.initialize());
    app.use((0, express_session_1.default)({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }));
    app.use(rate_limiter_1.default);
    setupPassport(app);
    setupMulter(app);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHktbWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXN0L2Z1bmN0aW9ucy9hcHBseS1taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4REFBcUM7QUFDckMsbURBQTJEO0FBQzNELHdEQUFnQztBQUNoQyxnREFBd0I7QUFDeEIsaURBQThDO0FBQzlDLHdFQUFzRTtBQUN0RSxvREFBNEI7QUFDNUIsK0JBQXdDO0FBQ3hDLG9EQUE0QjtBQUM1QiwrQkFBaUM7QUFDakMsMkJBQXNDO0FBQ3RDLGdGQUF1RDtBQUN2RCw0RUFBbUQ7QUFDbkQsaURBQXlDO0FBQ3pDLHNFQUE2QztBQUU3QyxNQUFNLFdBQVcsR0FBRyxJQUFBLGdCQUFTLEVBQUMsV0FBTSxDQUFDLENBQUM7QUFDdEMsTUFBTSxhQUFhLEdBQUcsSUFBQSxnQkFBUyxFQUFDLGFBQVEsQ0FBQyxDQUFDO0FBRTFDLFNBQVMsV0FBVyxDQUFDLEdBQWdCO0lBQ25DLE1BQU0sU0FBUyxHQUFHLElBQUEsY0FBTyxFQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDN0MsSUFBSTtRQUNGLElBQUEsd0JBQVEsRUFBQyxZQUFZLFNBQVMsZ0JBQWdCLENBQUMsQ0FBQztLQUNqRDtJQUFDLE1BQU0sR0FBRztJQUdYLE1BQU0sT0FBTyxHQUFHLGdCQUFNLENBQUMsV0FBVyxDQUFDO1FBQ2pDLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQztRQUNuRCxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBQSxjQUFPLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQy9FLENBQUMsQ0FBQztJQUNILE1BQU0sTUFBTSxHQUFHLElBQUEsZ0JBQU0sRUFBQztRQUNwQixPQUFPO1FBQ1AsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUNsQyxNQUFNLEdBQUcsR0FBRyxJQUFBLGNBQU8sRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztnQkFDN0IsT0FBTyxRQUFRLENBQUMsSUFBSSxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQyxDQUFDO1lBRXBFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUNELE1BQU0sRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEdBQUcsSUFBSSxFQUFFO0tBQ2xDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLHFCQUFVLEVBQUUsdUJBQVksRUFBRSxJQUFBLDZCQUFjLEVBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzdHLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFLLENBQUM7UUFFdkIsTUFBTSxNQUFNLEdBQUcsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLE1BQU0sSUFBSSxHQUFHLGdCQUFNO2FBQ2hCLFVBQVUsQ0FBQyxLQUFLLENBQUM7YUFDakIsTUFBTSxDQUFDLE1BQU0sQ0FBQzthQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVqQixNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsSUFBQSxjQUFPLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RELE1BQU0sV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxTQUFTLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQztRQUM1RCxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksV0FBVyxFQUFFLENBQUMsQ0FBQztRQUVyQyxNQUFNLEdBQUcsR0FBRyxXQUFXLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBQ0QsU0FBUyxhQUFhLENBQUMsR0FBZ0I7SUFDckMsa0JBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSx5QkFBYSxDQUM1QixFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsRUFDekIsV0FBWSxDQUFDLFlBQVksRUFBRSxDQUM3QixDQUFDLENBQUM7SUFDSCxrQkFBUSxDQUFDLGFBQWEsQ0FBRSxXQUFZLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUN0RCxrQkFBUSxDQUFDLGVBQWUsQ0FBRSxXQUFZLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBRUQsa0JBQWUsQ0FBQyxHQUFnQixFQUFFLEVBQUU7SUFDbEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGNBQUksR0FBRSxDQUFDLENBQUM7SUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLHlCQUFjLEVBQUM7UUFDckIsTUFBTSxFQUFFLGNBQWM7UUFDdEIsTUFBTSxFQUFFLEtBQUs7UUFDYixpQkFBaUIsRUFBRSxJQUFJO1FBQ3ZCLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7S0FDekIsQ0FBQyxDQUFDLENBQUM7SUFDSixHQUFHLENBQUMsR0FBRyxDQUFDLHNCQUFXLENBQUMsQ0FBQztJQUVyQixhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLENBQUMsQ0FBQSJ9