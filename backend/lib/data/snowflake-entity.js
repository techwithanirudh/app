"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.snowflakeToDate = exports.generateSnowflake = void 0;
const cluster_1 = __importDefault(require("cluster"));
const types_1 = require("@acrd/types");
let inc = 0;
let lastSnowflake;
const accordEpoch = 1577836800000;
function generateSnowflake() {
    const pad = (num, by) => num
        .toString(2)
        .padStart(by, '0');
    const msSince = pad(new Date().getTime() - accordEpoch, 42);
    const pid = pad(process.pid, 5).slice(0, 5);
    const wid = pad(cluster_1.default.worker?.id ?? 0, 5);
    const getInc = (add) => pad(inc + add, 12);
    let snowflake = `0b${msSince}${wid}${pid}${getInc(inc)}`;
    (snowflake === lastSnowflake)
        ? snowflake = `0b${msSince}${wid}${pid}${getInc(++inc)}`
        : inc = 0;
    lastSnowflake = snowflake;
    return BigInt(snowflake).toString();
}
exports.generateSnowflake = generateSnowflake;
function binary64(val) {
    try {
        return `0b${BigInt(val)
            .toString(2)
            .padStart(64, '0')}`;
    }
    catch (e) {
        return '';
    }
}
function snowflakeToDate(snowflake) {
    if (!types_1.patterns.snowflake.test(snowflake))
        throw new TypeError('Invalid snowflake provided');
    const sinceEpochMs = Number(binary64(snowflake).slice(0, 42 + 2));
    return new Date(sinceEpochMs + accordEpoch);
}
exports.snowflakeToDate = snowflakeToDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25vd2ZsYWtlLWVudGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhL3Nub3dmbGFrZS1lbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0RBQThCO0FBQzlCLHVDQUF1QztBQUV2QyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDWixJQUFJLGFBQXFCLENBQUM7QUFDMUIsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBRWxDLFNBQWdCLGlCQUFpQjtJQUMvQixNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFVLEVBQUUsRUFBRSxDQUFDLEdBQUc7U0FDekMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUNYLFFBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFckIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzVELE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLGlCQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRW5ELElBQUksU0FBUyxHQUFHLEtBQUssT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDekQsQ0FBQyxTQUFTLEtBQUssYUFBYSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRTtRQUN4RCxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUVaLGFBQWEsR0FBRyxTQUFTLENBQUM7SUFDMUIsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDdEMsQ0FBQztBQWpCRCw4Q0FpQkM7QUFFRCxTQUFTLFFBQVEsQ0FBQyxHQUFXO0lBQzNCLElBQUk7UUFDRixPQUFPLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNwQixRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQ1gsUUFBUSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDO0tBQ3hCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLEVBQUUsQ0FBQztLQUNYO0FBQ0gsQ0FBQztBQUlELFNBQWdCLGVBQWUsQ0FBQyxTQUFpQjtJQUMvQyxJQUFJLENBQUMsZ0JBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNyQyxNQUFNLElBQUksU0FBUyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFFcEQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUN6QixRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQ3JDLENBQUM7SUFDRixPQUFPLElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBUkQsMENBUUMifQ==