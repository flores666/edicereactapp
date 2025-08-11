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

interface CookieOptions {
    days?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
    // httpOnly — только для серверной установки, браузер его проигнорирует
    httpOnly?: boolean;
}

export function setCookie(
    name: string,
    value: string,
    options: CookieOptions = {}
) {
    let cookieStr = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (options.days) {
        const date = new Date();
        date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
        cookieStr += `; expires=${date.toUTCString()}`;
    }

    cookieStr += `; path=${options.path || "/"}`;

    if (options.domain) {
        cookieStr += `; domain=${options.domain}`;
    }

    // Установка Secure автоматически, если сайт открыт по HTTPS
    const isHttps = window.location.protocol === "https:";
    if (options.secure ?? isHttps) {
        cookieStr += `; secure`;
    }

    if (options.sameSite) {
        cookieStr += `; samesite=${options.sameSite}`;
    }

    if (options.httpOnly) {
        console.warn("httpOnly нельзя установить из браузера — игнорируется.");
    }

    document.cookie = cookieStr;
}

export function isLocationMatchingHref(href: string) : boolean {
    let location = useLocation();
    if (href === '/') return location.pathname === href;

    return location.pathname.startsWith(new URL('https://filler.blabla' + href).pathname);
}