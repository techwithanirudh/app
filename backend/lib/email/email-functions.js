"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailFunctions = void 0;
class EmailFunctions {
    async verifyCode(user) {
        try {
            const expiresIn = 5 * 60 * 1000;
            await deps.email.send('verify', {
                expiresIn,
                user,
                code: deps.verification.create(user.email, 'LOGIN', { expiresIn, codeLength: 6 }),
            }, user.email);
        }
        catch { }
    }
    async verifyEmail(emailAddress, user) {
        try {
            const expiresIn = 24 * 60 * 60 * 1000;
            await deps.email.send('verify-email', {
                expiresIn,
                user,
                code: deps.verification.create(emailAddress, 'VERIFY_EMAIL', { expiresIn }),
            }, emailAddress);
        }
        catch { }
    }
    async forgotPassword(emailAddress, user) {
        try {
            const expiresIn = 1 * 60 * 60 * 1000;
            await deps.email.send('forgot-password', {
                expiresIn,
                user,
                code: deps.verification.create(emailAddress, 'FORGOT_PASSWORD', { expiresIn }),
            }, emailAddress);
        }
        catch { }
    }
}
exports.EmailFunctions = EmailFunctions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwtZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VtYWlsL2VtYWlsLWZ1bmN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFhLGNBQWM7SUFDbEIsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFvQjtRQUMxQyxJQUFJO1lBQ0YsTUFBTSxTQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDaEMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzlCLFNBQVM7Z0JBQ1QsSUFBSTtnQkFDSixJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2xGLEVBQUUsSUFBSSxDQUFDLEtBQWUsQ0FBQyxDQUFDO1NBQzFCO1FBQUMsTUFBTSxHQUFHO0lBQ2IsQ0FBQztJQUNNLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBb0IsRUFBRSxJQUFvQjtRQUNqRSxJQUFJO1lBQ0YsTUFBTSxTQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ3RDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNwQyxTQUFTO2dCQUNULElBQUk7Z0JBQ0osSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxjQUFjLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQzthQUM1RSxFQUFFLFlBQVksQ0FBQyxDQUFDO1NBQ2xCO1FBQUMsTUFBTSxHQUFHO0lBQ2IsQ0FBQztJQUNNLEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBb0IsRUFBRSxJQUFvQjtRQUNwRSxJQUFJO1lBQ0YsTUFBTSxTQUFTLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ3JDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3ZDLFNBQVM7Z0JBQ1QsSUFBSTtnQkFDSixJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUM7YUFDL0UsRUFBRSxZQUFZLENBQUMsQ0FBQztTQUNsQjtRQUFDLE1BQU0sR0FBRztJQUNiLENBQUM7Q0FDRjtBQS9CRCx3Q0ErQkMifQ==