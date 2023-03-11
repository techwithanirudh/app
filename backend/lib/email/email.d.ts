import { UserTypes } from '@acrd/types';
export declare class Email {
    private email;
    private readonly templateDir;
    constructor();
    send<K extends keyof EmailTemplate>(template: K, ctx: EmailTemplate[K], ...to: string[]): Promise<void>;
}
export interface EmailTemplate {
    'verify': {
        expiresIn: number;
        user: UserTypes.Self;
        code: string;
    };
    'verify-email': this['verify'];
    'forgot-password': this['verify'];
}
