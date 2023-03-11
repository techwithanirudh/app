import { ChannelDocument } from '../data/models/channel';
import { patterns } from '@acrd/types';
declare const _default: {
    cannotChangeIfProp: (prop: string, value: any, def?: any) => (val: string) => boolean;
    min: (min: number) => (val: number) => boolean;
    max: (max: number) => (val: number) => boolean;
    isInteger: (val: number) => boolean;
    minLength: (min: number) => (val: string | any[]) => boolean;
    maxLength: (max: number) => (val: string | any[]) => boolean;
    optionalSnowflake: (val: string) => any;
    optionalPattern: (type: keyof typeof patterns) => (val: string) => any;
    textChannelName: (this: ChannelDocument, val: string) => boolean;
};
export default _default;
