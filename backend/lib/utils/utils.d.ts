import { Document } from 'mongoose';
export declare function getNameAcronym(name: string): string;
export declare function createdAtToDate(this: Document): Date;
export declare function generateUsername(): string;
export declare function useId(this: Document): any;
export declare function checkForDuplicates(array: any[]): boolean;
export declare const array: {
    ascending: (a: any, b: any) => 1 | -1;
};
export declare function randomFrom(...arr: any[]): any;
