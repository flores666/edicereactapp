import {assetCrafterService} from "@/config/instance.tsx";
import type { TToken } from "@/models/AssetCrafter";
import type {TResponse} from "@/models/Response";
import type { TFilter } from "@/models/TFilter";

export const getTokens = async (data?: TFilter) => {
    if (!data) {
        data = {
            page: 1,
            size: 20
        };
    }
    
    const response = await assetCrafterService.get<TResponse<Array<TToken>>>(`/tokens?page=${data.page}&size=${data.size}`);
    return response.data;
};