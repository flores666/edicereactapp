import {isNil, isEmpty, isObject, isString} from 'lodash';
import type {TResponse} from "@/models/Response";

export const isNullOrEmpty = (value: any): value is null | undefined => {
    if (isNil(value)) return true;
    if (isString(value)) return value === '';
    if (isObject(value)) return isEmpty(value);

    return false;
};

export function getResponseFromAxiosError<T>(error: unknown): TResponse<T> {
    if (
        typeof error === 'object' && 
        error !== null &&
        'response' in error && 
        typeof (error as any).response === 'object' &&
        (error as any).response !== null &&
        'data' in (error as any).response
    ) {
        const data = (error as any).response.data;

        if (
            typeof data === 'object' &&
            data !== null &&
            'data' in data &&
            'isSuccess' in data &&
            'message' in data
        ) {
            return {
                data: data.data ?? null,
                isSuccess: Boolean(data.isSuccess),
                message: typeof data.message === 'string' ? data.message : null,
            };
        }
    }
    
    return {
        data: null,
        isSuccess: false,
        message: 'Что-то пошло не так',
    };
}