"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
const messages = {
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    429: 'You are being rate limited',
    500: 'We made an oopsie',
};
class APIError extends TypeError {
    constructor(code, message = messages[code]) {
        super(message);
        this.code = code;
    }
}
exports.APIError = APIError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Jlc3QvbW9kdWxlcy9hcGktZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxRQUFRLEdBQUc7SUFDZixHQUFHLEVBQUUsYUFBYTtJQUNsQixHQUFHLEVBQUUsY0FBYztJQUNuQixHQUFHLEVBQUUsa0JBQWtCO0lBQ3ZCLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLEdBQUcsRUFBRSxvQkFBb0I7SUFDekIsR0FBRyxFQUFFLDRCQUE0QjtJQUNqQyxHQUFHLEVBQUUsbUJBQW1CO0NBQ3pCLENBQUM7QUFFRixNQUFhLFFBQVMsU0FBUSxTQUFTO0lBQ3JDLFlBQW1CLElBQVksRUFBRSxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUN2RCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFERSxTQUFJLEdBQUosSUFBSSxDQUFRO0lBRS9CLENBQUM7Q0FDRjtBQUpELDRCQUlDIn0=