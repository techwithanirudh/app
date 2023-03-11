"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const types_1 = require("@acrd/types");
const mongoose_1 = require("mongoose");
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const utils_1 = require("../../utils/utils");
const snowflake_entity_1 = require("../snowflake-entity");
const validators_1 = __importDefault(require("../../utils/validators"));
exports.User = (0, mongoose_1.model)('user', new mongoose_1.Schema({
    _id: {
        type: String,
        default: snowflake_entity_1.generateSnowflake,
    },
    activeThemeId: String,
    avatarURL: {
        type: String,
        required: [true, 'Avatar URL is required'],
    },
    badges: {
        type: [String],
        default: [],
    },
    bot: Boolean,
    createdAt: {
        type: Date,
        get: utils_1.createdAtToDate,
    },
    discriminator: {
        type: Number,
        required: [true, 'Disciminator is required'],
        validate: [
            { validator: validators_1.default.min(0), msg: 'Discriminator too low' },
            { validator: validators_1.default.max(9999), msg: 'Discriminator too high' },
        ],
    },
    email: {
        type: String,
        unique: [true, 'Email is already in use'],
        dropDups: true,
        uniqueCaseInsensitive: true,
        validate: [validators_1.default.optionalPattern('email'), 'Invalid email address'],
    },
    guildIds: {
        type: [String],
        validate: [validators_1.default.maxLength(100), 'Guild limit reached'],
    },
    ignored: {
        type: Object,
        default: { channelIds: [], guildIds: [], userIds: [], },
        validate: {
            validator: function (val) {
                return !val || !val.userIds?.includes(this.id);
            },
            message: 'Cannot block self',
        },
        channelIds: { type: [String], default: [] },
        guildIds: { type: [String], default: [] },
        userIds: { type: [String], default: [] },
    },
    lastReadMessages: {
        type: Object,
        default: {},
    },
    locked: Boolean,
    premium: Boolean,
    premiumExpiration: Date,
    status: {
        type: String,
        required: [true, 'Status is required'],
        validate: [types_1.patterns.status, 'Invalid status'],
        default: 'OFFLINE',
    },
    unlockedThemeIds: {
        type: [String],
        validate: [validators_1.default.maxLength(50), 'Theme limit reached'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        validate: [types_1.patterns.username, `Invalid username`],
    },
    verified: Boolean,
    voice: {
        type: Object,
        required: [true, 'Voice state is required'],
        default: {},
    },
}, { toJSON: { getters: true } })
    .plugin(passport_local_mongoose_1.default, {
    usernameField: 'email',
    message: 'UserExistsError',
    errorMessages: {
        MissingPasswordError: 'No password was given',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Password or username are incorrect',
        IncorrectUsernameError: 'Password or username are incorrect',
        MissingUsernameError: 'No username was given',
        UserExistsError: 'Email is already in use',
    }
})
    .method('toClient', utils_1.useId));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL21vZGVscy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHVDQUF1QztBQUV2Qyx1Q0FBbUQ7QUFDbkQsc0ZBQTREO0FBQzVELDZDQUEyRDtBQUMzRCwwREFBd0Q7QUFDeEQsd0VBQWdEO0FBc0JuQyxRQUFBLElBQUksR0FBRyxJQUFBLGdCQUFLLEVBQWUsTUFBTSxFQUFFLElBQUksaUJBQU0sQ0FBQztJQUN6RCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxvQ0FBaUI7S0FDM0I7SUFDRCxhQUFhLEVBQUUsTUFBTTtJQUNyQixTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSx3QkFBd0IsQ0FBQztLQUMzQztJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNkLE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFDRCxHQUFHLEVBQUUsT0FBTztJQUNaLFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxJQUFJO1FBQ1YsR0FBRyxFQUFFLHVCQUFlO0tBQ3JCO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsMEJBQTBCLENBQUM7UUFDNUMsUUFBUSxFQUFFO1lBQ1IsRUFBRSxTQUFTLEVBQUUsb0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLHVCQUF1QixFQUFFO1lBQzlELEVBQUUsU0FBUyxFQUFFLG9CQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSx3QkFBd0IsRUFBRTtTQUNuRTtLQUNGO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixNQUFNLEVBQUUsQ0FBQyxJQUFJLEVBQUUseUJBQXlCLENBQUM7UUFDekMsUUFBUSxFQUFFLElBQUk7UUFDZCxxQkFBcUIsRUFBRSxJQUFJO1FBQzNCLFFBQVEsRUFBRSxDQUFDLG9CQUFVLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLHVCQUF1QixDQUFDO0tBQ3pFO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ2QsUUFBUSxFQUFFLENBQUMsb0JBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUscUJBQXFCLENBQUM7S0FDN0Q7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHO1FBQ3ZELFFBQVEsRUFBRTtZQUNSLFNBQVMsRUFBRSxVQUE4QixHQUFHO2dCQUMxQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pELENBQUM7WUFDRCxPQUFPLEVBQUUsbUJBQW1CO1NBQzdCO1FBQ0QsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRTtRQUMzQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO1FBQ3pDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7S0FDekM7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFDRCxNQUFNLEVBQUUsT0FBTztJQUNmLE9BQU8sRUFBRSxPQUFPO0lBQ2hCLGlCQUFpQixFQUFFLElBQUk7SUFDdkIsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUM7UUFDdEMsUUFBUSxFQUFFLENBQUMsZ0JBQVEsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUM7UUFDN0MsT0FBTyxFQUFFLFNBQVM7S0FDbkI7SUFDRCxnQkFBZ0IsRUFBRTtRQUNoQixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDZCxRQUFRLEVBQUUsQ0FBQyxvQkFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRSxxQkFBcUIsQ0FBQztLQUM1RDtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLHNCQUFzQixDQUFDO1FBQ3hDLFFBQVEsRUFBRSxDQUFDLGdCQUFRLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDO0tBQ2xEO0lBQ0QsUUFBUSxFQUFFLE9BQU87SUFDakIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUseUJBQXlCLENBQUM7UUFDM0MsT0FBTyxFQUFFLEVBQTBCO0tBQ3BDO0NBQ0YsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO0tBQzlCLE1BQU0sQ0FBQyxpQ0FBcUIsRUFBRTtJQUM3QixhQUFhLEVBQUUsT0FBTztJQUN0QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLGFBQWEsRUFBRTtRQUNiLG9CQUFvQixFQUFFLHVCQUF1QjtRQUM3QyxtQkFBbUIsRUFBRSw4Q0FBOEM7UUFDbkUsb0JBQW9CLEVBQUUsc0RBQXNEO1FBQzVFLHNCQUFzQixFQUFFLG1EQUFtRDtRQUMzRSxzQkFBc0IsRUFBRSxvQ0FBb0M7UUFDNUQsc0JBQXNCLEVBQUUsb0NBQW9DO1FBQzVELG9CQUFvQixFQUFFLHVCQUF1QjtRQUM3QyxlQUFlLEVBQUUseUJBQXlCO0tBQzNDO0NBQ0YsQ0FBQztLQUNELE1BQU0sQ0FBQyxVQUFVLEVBQUUsYUFBSyxDQUFDLENBQUMsQ0FBQyJ9