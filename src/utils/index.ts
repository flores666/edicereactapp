import {isNil, isEmpty, isObject, isString} from 'lodash';
import type {TResponse} from "@/models/Response";
import type {TUser} from "@/models/User";
import {jwtDecode} from "jwt-decode";
import {useLocation} from "react-router-dom";

export const isNullOrEmpty = (value: any): value is null | undefined => {
    if (isNil(value)) return true;
    if (isString(value)) return value === '';
    if (isObject(value)) return isEmpty(value);

    return false;
};

// Достает TResponse<T> из ошибки отправки запроса axios
export function getResponseFromAxiosError(error: unknown): TResponse<null> {
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
                message: typeof data.message === 'string' ? data.message : 'Что-то пошло не так',
            };
        }
    }

    return {
        data: null,
        isSuccess: false,
        message: 'Что-то пошло не так',
    };
}

// Парсит jwt "eyJ0eXAiO..." в модель пользователя
export function parseUserFromJwt(jwt: string): TUser | null {
    const CLAIM_MAP: Record<string, keyof TUser> = {
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "id",
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": "email",
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": "name",
    };

    try {
        let decoded = jwtDecode(jwt);

        const user: Partial<TUser> = {};

        for (const [claim, key] of Object.entries(CLAIM_MAP)) {
            // @ts-ignore
            user[key] = decoded[claim];
        }

        return user as TUser;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export function isLocationMatchingHref(href: string) : boolean {
    let location = useLocation();
    if (href === '/') return location.pathname === href;

    return location.pathname.startsWith(new URL('https://filler.blabla' + href).pathname);
}

export function toPlural(str: string) {
    const words = str.split(' ');
    let result: string[] = [];
    
    words.forEach(word => {
        if (word.endsWith('а')) result.push(word.slice(0, -1) + 'ы');
        else if (word.endsWith('мя')) result.push(word.slice(0, -2) + 'мена');
        else if (word.endsWith('ое')) result.push(word.slice(0, -2) + 'ые');
        else if (word.endsWith('я')) result.push(word.slice(0, -1) + 'и');
        else if (word.endsWith('ь')) result.push(word + 'и');
        else if (word.endsWith('о')) result.push(word.slice(0, -1) + 'а');
        else if (word.endsWith('е')) result.push(word.slice(0, -1) + 'я');
        else if (word.endsWith('й')) result.push(word.slice(0, -1) + 'и');
        else if (word.endsWith('ь')) result.push(word.slice(0, -1) + 'и');
        else if (word.endsWith('ж')) result.push(word.slice(0, -1) + 'жи'); 
        else if (word.endsWith('ш')) result.push(word.slice(0, -1) + 'ши'); 
        else if (word.endsWith('щ')) result.push(word.slice(0, -1) + 'щи'); 
        else result.push(word + 'ы');
    });
    
    return result.join(' ');
}