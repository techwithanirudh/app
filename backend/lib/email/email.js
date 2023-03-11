"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const nodemailer_1 = require("nodemailer");
const nodemailer_pug_engine_1 = require("nodemailer-pug-engine");
class Email {
    constructor() {
        this.templateDir = __dirname + '/templates';
        this.email = (0, nodemailer_1.createTransport)({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            }
        });
        this.email.verify((error) => (error)
            ? log.error(error)
            : log.info('Logged in to email service'));
        this.email.use('compile', (0, nodemailer_pug_engine_1.pugEngine)({
            templateDir: this.templateDir,
            pretty: true,
        }));
    }
    async send(template, ctx, ...to) {
        await this.email.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: to.join(', '),
            subject: subjects[template],
            template,
            ctx,
        });
    }
}
exports.Email = Email;
const subjects = {
    'forgot-password': 'Anichat - Forgot Password',
    'verify': 'Anichat - Login Verification Code',
    'verify-email': 'Anichat - Verify Email',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW1haWwvZW1haWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTZDO0FBRTdDLGlFQUFrRDtBQUdsRCxNQUFhLEtBQUs7SUFLaEI7UUFGaUIsZ0JBQVcsR0FBRyxTQUFTLEdBQUcsWUFBWSxDQUFDO1FBR3RELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBQSw0QkFBZSxFQUFDO1lBQzNCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhO2dCQUMvQixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjO2FBQ2pDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNsQixDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUEsaUNBQVMsRUFBQztZQUNsQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFTSxLQUFLLENBQUMsSUFBSSxDQUFnQyxRQUFXLEVBQUUsR0FBcUIsRUFBRSxHQUFHLEVBQVk7UUFDbEcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUN4QixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhO1lBQy9CLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNqQixPQUFPLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUMzQixRQUFRO1lBQ1IsR0FBRztTQUNHLENBQUMsQ0FBQztJQUNaLENBQUM7Q0FDRjtBQWpDRCxzQkFpQ0M7QUFZRCxNQUFNLFFBQVEsR0FBMkM7SUFDdkQsaUJBQWlCLEVBQUUsMEJBQTBCO0lBQzdDLFFBQVEsRUFBRSxrQ0FBa0M7SUFDNUMsY0FBYyxFQUFFLHVCQUF1QjtDQUN4QyxDQUFDIn0=