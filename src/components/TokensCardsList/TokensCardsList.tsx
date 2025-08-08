import '@/components/TokensCardsList/TokensCardsList.css';
import {Card, type TCardItem} from "@/components/Card/Card.tsx";
import InfiniteList, {type FetchParams, type FetchResult} from "@/components/InfiniteList/InfiniteList.tsx";
import {getTokens} from "@/services/assetCrafterService.ts";

export function TokensCardsList() {
    const fetchTokens = async ({cursor, limit}: FetchParams): Promise<FetchResult<TCardItem>> => {
        const page = cursor ? Number(cursor) : 1;
        limit ??= 20;
        const response = await getTokens({size: limit, page: page});

        if (response.isSuccess && response.data) {
            const items: TCardItem[] = response.data.map(item => ({
                title: item.name,
                id: item.id,
                imageSrc: item.imageUrl,
                text: item.description,
            }));

            return {
                items,
                nextCursor: items.length > 0 ? String(page + 1) : null,
            };
        }

        return {items: [], nextCursor: null};
    }

    return (
        <InfiniteList
            fetch={fetchTokens}
            itemKey={(p) => p.id}
            pageSize={20}
            renderItem={(p) => <Card {...p} />}
            className='card-container'
        />
    );
}