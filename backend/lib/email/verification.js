"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verification = void 0;
const generate_invite_1 = __importDefault(require("../data/utils/generate-invite"));
class Verification {
    constructor() {
        this.codes = new Map();
    }
    create(email, type, options) {
        options = {
            ...options,
            codeLength: 16,
            expiresIn: 5 * 60 * 1000,
        };
        this.codes.delete(email);
        const value = (0, generate_invite_1.default)(options.codeLength);
        this.codes.set(email, { type, value });
        setTimeout(() => this.codes.delete(email), options.expiresIn);
        return value;
    }
    get(email) {
        return this.codes.get(email);
    }
    delete(email) {
        this.codes.delete(email);
    }
    getEmailFromCode(code) {
        return Array
            .from(this.codes.entries())
            .find(([k, v]) => v.value === code)?.[0];
    }
}
exports.Verification = Verification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VtYWlsL3ZlcmlmaWNhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxvRkFBMkQ7QUFFM0QsTUFBYSxZQUFZO0lBQXpCO1FBQ1UsVUFBSyxHQUFHLElBQUksR0FBRyxFQUFzQixDQUFDO0lBK0JoRCxDQUFDO0lBN0JRLE1BQU0sQ0FBQyxLQUFhLEVBQUUsSUFBd0IsRUFBRSxPQUFzQjtRQUMzRSxPQUFPLEdBQUc7WUFDUixHQUFHLE9BQU87WUFDVixVQUFVLEVBQUUsRUFBRTtZQUNkLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUk7U0FDekIsQ0FBQztRQUVGLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXpCLE1BQU0sS0FBSyxHQUFHLElBQUEseUJBQWMsRUFBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFdkMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU5RCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFTSxHQUFHLENBQUMsS0FBYTtRQUN0QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDTSxNQUFNLENBQUMsS0FBYTtRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRU0sZ0JBQWdCLENBQUMsSUFBWTtRQUNsQyxPQUFPLEtBQUs7YUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUMxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDRjtBQWhDRCxvQ0FnQ0MifQ==