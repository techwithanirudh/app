import { ChannelTypes } from '@acrd/types';
import { Document } from 'mongoose';
export interface DMChannelDocument extends Document, ChannelTypes.DM {
    _id: string | never;
    id: string;
    createdAt: never;
}
export interface TextChannelDocument extends Document, ChannelTypes.Text {
    _id: string | never;
    id: string;
    createdAt: never;
}
export interface VoiceChannelDocument extends Document, ChannelTypes.Voice {
    _id: string | never;
    id: string;
    createdAt: never;
}
export type ChannelDocument = TextChannelDocument | VoiceChannelDocument;
export declare const Channel: any;
