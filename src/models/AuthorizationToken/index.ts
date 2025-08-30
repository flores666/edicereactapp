import type {TUser} from "@/models/User";

export type TAuthorizationResponse = {
    user: TUser;
    accessToken: string;
    refreshToken: string;
}