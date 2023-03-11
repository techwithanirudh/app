export declare class Verification {
    private codes;
    create(email: string, type: VerifyCode['type'], options?: EmailOptions): string;
    get(email: string): VerifyCode | undefined;
    delete(email: string): void;
    getEmailFromCode(code: string): string | undefined;
}
interface VerifyCode {
    type: 'LOGIN' | 'VERIFY_EMAIL' | 'FORGOT_PASSWORD';
    value: string;
}
export interface EmailOptions {
    codeLength?: number;
    expiresIn?: number;
}
export {};
