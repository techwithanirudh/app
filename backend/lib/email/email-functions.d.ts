import { UserTypes } from '@acrd/types';
export declare class EmailFunctions {
    verifyCode(user: UserTypes.Self): Promise<void>;
    verifyEmail(emailAddress: string, user: UserTypes.Self): Promise<void>;
    forgotPassword(emailAddress: string, user: UserTypes.Self): Promise<void>;
}
