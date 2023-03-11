"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = require("../modules/api-error");
exports.default = async (req, res, next) => {
    if (res.locals.user)
        return next();
    throw new api_error_1.APIError(401, 'User not logged in');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtdXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXN0L21pZGRsZXdhcmUvdmFsaWRhdGUtdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG9EQUFnRDtBQUVoRCxrQkFBZSxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDdkUsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUk7UUFDakIsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUNoQixNQUFNLElBQUksb0JBQVEsQ0FBQyxHQUFHLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUEifQ==