"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../../utils/utils");
const validators_1 = __importDefault(require("../../utils/validators"));
const snowflake_entity_1 = require("../snowflake-entity");
exports.Channel = (0, mongoose_1.model)('channel', new mongoose_1.Schema({
    _id: {
        type: String,
        default: snowflake_entity_1.generateSnowflake,
    },
    createdAt: {
        type: Date,
        get: utils_1.createdAtToDate,
    },
    guildId: {
        type: String,
        validate: [validators_1.default.optionalSnowflake, 'Invalid Snowflake ID'],
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxlength: [32, 'Name too long'],
        validate: [validators_1.default.textChannelName, 'Invalid name'],
    },
    filterProfanity: { type: Boolean },
    firstMessageId: {
        type: String,
        validate: [validators_1.default.optionalSnowflake, 'Invalid Snowflake ID'],
    },
    lastMessageId: {
        type: String,
        validate: [validators_1.default.optionalSnowflake, 'Invalid Snowflake ID'],
    },
    summary: {
        type: String,
        maxlength: [128, 'Summary too long'],
    },
    position: {
        type: Number,
        min: [0, 'Position must be greater than 0'],
    },
    type: {
        type: String,
        required: [true, 'Type is required'],
        validate: [/^TEXT$|^VOICE$|^DM$/, 'Invalid type'],
    },
    overrides: {
        type: [Object],
        default: [],
    },
    userIds: {
        type: [String],
        default: [],
    },
}, { toJSON: { getters: true } })
    .method('toClient', utils_1.useId));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbm5lbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL21vZGVscy9jaGFubmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHVDQUFtRDtBQUNuRCw2Q0FBMkQ7QUFDM0Qsd0VBQWdEO0FBQ2hELDBEQUF3RDtBQW1CM0MsUUFBQSxPQUFPLEdBQUcsSUFBQSxnQkFBSyxFQUFrQixTQUFTLEVBQUUsSUFBSSxpQkFBTSxDQUFDO0lBQ2xFLEdBQUcsRUFBRTtRQUNILElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLG9DQUFpQjtLQUMzQjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxJQUFJO1FBQ1YsR0FBRyxFQUFFLHVCQUFlO0tBQ3JCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsQ0FBQyxvQkFBVSxDQUFDLGlCQUFpQixFQUFFLHNCQUFzQixDQUFDO0tBQ2pFO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUM7UUFDcEMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLGVBQWUsQ0FBQztRQUNoQyxRQUFRLEVBQUUsQ0FBQyxvQkFBVSxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUM7S0FDdkQ7SUFDRCxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0lBQ2xDLGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLENBQUMsb0JBQVUsQ0FBQyxpQkFBaUIsRUFBRSxzQkFBc0IsQ0FBQztLQUNqRTtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLENBQUMsb0JBQVUsQ0FBQyxpQkFBaUIsRUFBRSxzQkFBc0IsQ0FBQztLQUNqRTtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNO1FBQ1osU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDO0tBQ3JDO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07UUFDWixHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsaUNBQWlDLENBQUM7S0FDNUM7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQztRQUNwQyxRQUFRLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxjQUFjLENBQUM7S0FDbEQ7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDZCxPQUFPLEVBQUUsRUFBRTtLQUNaO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2QsT0FBTyxFQUFFLEVBQUU7S0FDWjtDQUNGLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztLQUM5QixNQUFNLENBQUMsVUFBVSxFQUFFLGFBQUssQ0FBQyxDQUFDLENBQUMifQ==