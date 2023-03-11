import { Entity, UserTypes } from '@acrd/types';
import { Document } from 'mongoose';
export interface UserDocument extends Document, Entity.User {
    _id: string | never;
    id: string;
    createdAt: never;
    save: never;
}
export interface SelfUserDocument extends Document, UserTypes.Self {
    _id: string | never;
    id: string;
    createdAt: never;
    changePassword: (...args: any[]) => Promise<any>;
    register: (...args: any[]) => Promise<any>;
}
export interface PureUserDocument extends SelfUserDocument {
    hash: string;
    salt: string;
}
export declare const User: any;
