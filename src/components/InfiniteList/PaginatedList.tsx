import React, {useState, useEffect} from "react";

export interface FetchParams {
    page: number;
    limit: number;
}

export interface FetchResult<T> {
    items: T[];
    total: number; // общее количество (для вычисления количества страниц)
}

interface PaginatedListProps<T> {
    fetch: (params: FetchParams) => Promise<FetchResult<T>>;
    renderItem: (item: T, index: number) => React.ReactNode;
    itemKey?: (item: T, index: number) => string;
    pageSize?: number;
    className?: string;
    loader?: React.ReactNode;
    empty?: React.ReactNode;
    onError?: (e: unknown) => void;
    reloadSignal?: any;
}

export default function PaginatedList<T>({
                                             fetch,
                                             renderItem,
                                             itemKey,
                                             pageSize = 20,
                                             className,
                                             loader = <div style={{padding: 16, textAlign: "center"}}>Загрузка...</div>,
                                             empty = <div style={{padding: 16, textAlign: "center"}}>Пусто</div>,
                                             onError, 
                                             reloadSignal
                                         }: PaginatedListProps<T>) {
    const [items, setItems] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let isCancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch({page, limit: pageSize});
                if (isCancelled) return;

                setItems(res.items);
                setTotal(res.total);
            } catch (e) {
                if (!isCancelled) {
                    setError(e);
                    onError?.(e);
                }
            } finally {
                if (!isCancelled) setLoading(false);
            }
        }

        load();
        return () => {
            isCancelled = true;
        };
    }, [page, pageSize, fetch, onError, reloadSignal]);

    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className={className}>
            {loading && items.length === 0 ? (
                loader
            ) : items.length === 0 ? (
                empty
            ) : (
                items.map((item, i) => (
                    <div key={itemKey ? itemKey(item, i) : String(i)}>
                        {renderItem(item, i)}
                    </div>
                ))
            )}

            {error ? <div style={{color: "red", padding: 8}}>Ошибка загрузки</div> : <></>}

            {totalPages > 1 && (
                <div style={{display: "flex", justifyContent: "center", gap: 8, marginTop: 16}}>
                    <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                        Назад
                    </button>
                    <span>
            Страница {page} из {totalPages}
          </span>
                    <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
                        Вперёд
                    </button>
                </div>
            )}
        </div>
    );
}
