import {useTitle} from "@/hooks/useTitle.ts";
import '@/pages/Library/Library.css';
import {type Tab, Tabs} from "@/components/Tabs/Tabs.tsx";
import {useNavigate, useParams} from "react-router-dom";
import type {IFilterItem} from "@/components/Filter/Filter.tsx";
import {type JSX, useEffect, useState} from "react";
import {getTokenTypes} from "@/services/assetCrafterService";
import {toPlural} from "@/utils";
import {Maps} from "./Maps";
import {Default} from "@/pages/Library/Default.tsx";

export let filterDefaultItems: Array<IFilterItem> = [
    {
        id: 'search',
        type: 'text',
        placeholder: 'Поиск по описанию или заголовку'
    },
    {
        id: 'sort',
        type: 'select',
        options: [
            {
                label: 'Сначала новые',
                value: 'newFirst',
            },
            {
                label: 'Сначала старые',
                value: 'oldFirst',
            },
            {
                label: 'По алфавиту А-Я',
                value: 'asc',
            },
            {
                label: 'По алфавиту Я-А',
                value: 'desc',
            },
            {
                label: 'Сначала подтвержденные',
                value: 'confirmed',
            },
            {
                label: 'Сначала официальные',
                value: 'official',
            }
        ],
        isChecked: true,
    },
    {
        id: 'officialOnly',
        type: 'checkbox',
        label: 'Только официальные'
    },
    {
        id: 'confirmedOnly',
        type: 'checkbox',
        isChecked: true,
        label: 'Только подтвержденные'
    }
]

export function LibraryPage() {
    useTitle('eDice - Игровая библиотека');
    const [tabsProps, setTabsProps] = useState<Array<Tab>>([]);
    const navigate = useNavigate();
    const {tab} = useParams();

    const [componentsMap, setComponentsMap] = useState<Record<string, JSX.Element>>({});

    useEffect(() => {
        getTokenTypes().then(response => {
            if (response.data != null) {
                const sortedTabs = response.data
                    .sort((a, b) => a.caption > b.caption ? -1 : 1)
                    .map(item => ({
                        link: `/library/${item.name}`,
                        title: toPlural(item.caption)
                    }));

                setTabsProps(sortedTabs);

                if (!sortedTabs.some(s => s.link === `/library/${tab}`)) {
                    navigate(sortedTabs[0].link ?? "");
                }
                
                const map: Record<string, JSX.Element> = {};
                response.data.forEach(item => {
                    switch (item.name) {
                        case 'map':
                            map[item.name] = <Maps type={item}/>;
                            break;
                        default:
                            map[item.name] = <Default type={item}/>;
                    }
                });
                setComponentsMap(map);
            }
        });
    }, [tab]);

    return (
        <>
            <h1>Игровая библиотека</h1>
            <Tabs tabs={tabsProps}/>
            {tab && componentsMap[tab]}
        </>
    );
}