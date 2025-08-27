import {assetCrafterService} from "@/config/instance.tsx";
import type {TToken, TTokenType} from "@/models/AssetCrafter";
import type {TResponse} from "@/models/Response";
import type {TPaginatedList} from "@/models/TPaginatedList.ts";

function toQueryString(
    params: Record<string, string | boolean | number | undefined>
): string {
    return Object.entries(params)
        .filter(([, value]) => value !== undefined)
        .map(
            ([key, value]) =>
                encodeURIComponent(key) + "=" + encodeURIComponent(String(value))
        )
        .join("&");
}

export const getTokens = async (filter: Record<string, string | boolean | number | undefined> | null) => {
    if (!filter) {
        filter = {};
        filter['page'] = 1;
        filter['size'] = 20;
    }
    
    const response = await assetCrafterService.get<TResponse<TPaginatedList<TToken>>>(`/tokens?${toQueryString(filter)}`);
    return response.data;
};

export const getTokenTypes = async () => {
    const response = await assetCrafterService.get<TResponse<Array<TTokenType>>>('/tokens/types');
    return response.data;
};