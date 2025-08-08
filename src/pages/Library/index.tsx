import {useTitle} from "@/hooks/useTitle.ts";
import {CardsList} from "@/components/CardsList/CardsList.tsx";
import '@/pages/Library/Library.css';

export function LibraryPage() {
    useTitle('eDice - Игровая библиотека');

    return (
        <>
            <h1>Игровая библиотека</h1>
            <div className='with-filter-columns'>
                <div className='filter-container'>
                    <div className='filter'>
                        <div className="form-group">
                            <input id="login" placeholder="Поиск"/>
                        </div>
                        <div className="form-group">
                            Только проверенные
                        </div>
                    </div>
                </div>
                <CardsList></CardsList>
            </div>
        </>
    );
}
