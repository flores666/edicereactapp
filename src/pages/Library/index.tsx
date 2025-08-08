import {useTitle} from "@/hooks/useTitle.ts";
import {CardsList} from "@/components/CardsList/CardsList.tsx";

export function LibraryPage() {
    useTitle('eDice - Игровая библиотека');

    return (
        <>
            <h1>Игровая библиотека</h1>
            <div className='something'></div>
            <CardsList></CardsList>
        </>
    );
}
