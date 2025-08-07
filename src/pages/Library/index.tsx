import {useTitle} from "@/hooks/useTitle.ts";
import {useEffect, useState} from "react";
import {CardsList} from "@/components/CardsList/CardsList.tsx";
import type {TCardItem, TCardItems} from "@/components/Card/Card.tsx";
import type {TResponse} from "@/models/Response";
import {assetCrafterService} from "@/config/instance.tsx";

type TToken = {
    id: string;
    name: string;
    description?: string | null;
    type: string;
    imageUrl?: string | null;
    isPublic: boolean;
    createdBy: string;
    isOfficial: boolean;
    isConfirmed: boolean;
}

export function LibraryPage() {
    useTitle('eDice - Игровая библиотека');
    const [cards, setCards] = useState<TCardItems | null>(null);

    useEffect(() => {
        assetCrafterService.get<TResponse<Array<TToken>>>('/tokens')
            .then(response => {
                if (response.data.data) {
                    setCards(response.data.data.map((item) => {
                        const card: TCardItem = {
                            title: item.name,
                            text: item.description,
                            imageSrc: item.imageUrl,
                        };

                        return card;
                    }));
                }
            })
            .catch(reason => console.log(reason));
    }, []);

    return (
        <>
            <h1>Игровая библиотека</h1>
            <div className='something'></div>
            {
                cards ? <CardsList cards={cards}></CardsList> : <div>empty</div>
            }
        </>
    );
}
