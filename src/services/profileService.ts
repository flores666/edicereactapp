import {profileService} from "@/config/instance.tsx";
import type {TResponse} from "@/models/Response";
import type {TUser} from "@/models/User";

const getProfileAsync = async (id: string): Promise<TResponse<TUser>> => {
    const response = await profileService.get<TResponse<TUser>>(`/${id}`);
    return response.data;
}

export const ProfileService = {
    getProfileAsync
}