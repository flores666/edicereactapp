import {useTitle} from "@/hooks/useTitle.ts";
import {TokensCardsList} from "@/components/TokensCardsList/TokensCardsList.tsx";
import '@/pages/Library/Library.css';
import {Filter} from "@/components/Filter/Filter";

export function LibraryPage() {
    useTitle('eDice - Игровая библиотека');

    async function fetchData() {
    }

    return (
        <>
            <h1>Игровая библиотека</h1>
            <div className='with-filter-columns'>
                <Filter
                    fetchFn={fetchData}
                    fields={[
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
                    ]}/>
                <TokensCardsList></TokensCardsList>
            </div>
        </>
    );
}
