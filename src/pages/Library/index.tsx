import {useTitle} from "@/hooks/useTitle.ts";
import '@/pages/Library/Library.css';
import {Tabs} from "@/components/Tabs/Tabs.tsx";
import {Outlet} from "react-router-dom";
import type {IFilterItem} from "@/components/Filter/Filter.tsx";

export let filterDefaultItems: Array<IFilterItem> = [
    {
        id: 'search',
        type: 'text',
        placeholder: 'Поиск по описанию или заголовку'
    },
    {
        id: 'sort',
        type: 'select',
        placeholder: 'Сортировка',
        options: [
            {
                label: 'Сначала подтвержденные',
                value: 'confirmed',
            },
            {
                label: 'Сначала официальные',
                value: 'official',
            },
            {
                label: 'По алфавиту А-Я',
                value: 'asc',
            },
            {
                label: 'По алфавиту Я-А',
                value: 'desc',
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

    return (
        <>
            <h1>Игровая библиотека</h1>
            <Tabs tabs={[
                {
                    title: 'Персонажи',
                    link: '/library/characters',
                },
                {
                    title: 'Предметы',
                    link: '/library/items',
                },
                {
                    title: 'Игровые локации',
                    link: '/library/maps',
                }
            ]}></Tabs>
            <Outlet></Outlet>
        </>
    );
}
