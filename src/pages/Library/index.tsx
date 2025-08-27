import {useTitle} from "@/hooks/useTitle.ts";
import '@/pages/Library/Library.css';
import {type Tab, Tabs} from "@/components/Tabs/Tabs.tsx";
import {Outlet} from "react-router-dom";
import type {IFilterItem} from "@/components/Filter/Filter.tsx";
import {useEffect, useState} from "react";
import {getTokenTypes} from "@/services/assetCrafterService";
import {toPlural} from "@/utils";

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

    useEffect(() => {
        let tabs: Array<Tab> = [];
        getTokenTypes().then(response => {
            if (response.data != null) {
                response.data.sort((a, b) => a.caption > b.caption ? -1 : 1).map(item => tabs.push({
                    link: `/library/${item.name}`,
                    title: toPlural(item.caption)
                }))
                
                setTabsProps(tabs);
            }
        });
    }, []);

    return (
        <>
            <h1>Игровая библиотека</h1>
            <Tabs tabs={tabsProps}></Tabs>
            <Outlet></Outlet>
        </>
    );
}
