import {Filter} from "@/components/Filter/Filter.tsx";
import {filterDefaultItems} from "@/pages/Library/index.tsx";
import PaginatedList, { type FetchParams, type FetchResult } from "@/components/InfiniteList/PaginatedList.tsx";
import {Card, type TCardItem} from "@/components/Card/Card.tsx";
import {getTokens} from "@/services/assetCrafterService.ts";
import {useRef, useState} from "react";

export function Character() {
    const [reloadSignal, setReloadSignal] = useState<number>(0);
    const filterRef = useRef<Record<string, string | boolean | number | undefined>>({});
    
    async function fetchData(filterModel: Record<string, string | boolean | number | undefined>) {
        filterRef.current = filterModel;
        setReloadSignal(prev => prev + 1);
    }
    
    const fetchTokens = async (params: FetchParams): Promise<FetchResult<TCardItem>> => {
        const filterWithPageInfo = {
            ...filterRef.current,
            public: true,
            page: params.page,
            size: params.limit,
        };
        
        const response = await getTokens(filterWithPageInfo);
        if (response.isSuccess && response.data) {
            const items: TCardItem[] = response.data.items.map(item => ({
                title: item.name,
                id: item.id,
                imageSrc: item.imageUrl,
                text: item.description,
                isOfficial: item.isOfficial,
                isVerified: item.isConfirmed,
            }));
            
            return {
                items,
                total: response.data.totalCount,
            };
        }

        return {items: [], total: 0};
    }
    
    return (
        <div className='with-filter-columns'>
            <Filter
                onChange={fetchData}
                fields={filterDefaultItems}/>
            <PaginatedList
                fetch={fetchTokens}
                itemKey={(p) => p.id}
                pageSize={20}
                reloadSignal={reloadSignal}
                renderItem={(p) => <Card {...p} />}
                className='card-container'
            />
        </div>
    );
}