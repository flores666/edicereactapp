import React, { useCallback, useEffect, useRef, useState } from "react";

export type FetchResult<T> = {
    items: T[];
    nextCursor?: string | null;
};

export type FetchParams = {
    cursor?: string | null;
    limit?: number;
};

export type InfiniteListProps<T> = {
    fetch: (params: FetchParams) => Promise<FetchResult<T>>;
    renderItem: (item: T, index: number) => React.ReactNode;
    itemKey?: (item: T) => string;
    pageSize?: number;
    initialData?: T[];
    loader?: React.ReactNode;
    empty?: React.ReactNode;
    className?: string;
    threshold?: number | number[];
    resetSignal?: any;
    onError?: (e: unknown) => void;
};

export default function InfiniteList<T>({
                                            fetch,
                                            renderItem,
                                            itemKey,
                                            pageSize = 20,
                                            initialData,
                                            loader = <div style={{ padding: 16, textAlign: "center" }}>Loading...</div>,
                                            empty = <div style={{ padding: 16, textAlign: "center" }}>No items</div>,
                                            className,
                                            threshold = 0.5,
                                            resetSignal,
                                            onError,
                                        }: InfiniteListProps<T>) {
    const [items, setItems] = useState<T[]>(() => initialData ?? []);
    const [cursor, setCursor] = useState<string | null | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [initialLoadDone, setInitialLoadDone] = useState(!!(initialData && initialData.length > 0));
    const [firstRequestInProgress, setFirstRequestInProgress] = useState(!initialData || initialData.length === 0);

    const buildKey = useCallback((it: T, idx: number) => (itemKey ? itemKey(it) : String(idx)), [itemKey]);
    const knownKeysRef = useRef<Set<string>>(new Set((initialData ?? []).map((it, i) => buildKey(it, i))));
    const nextIndexRef = useRef<number>((initialData ?? []).length);

    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        setItems(initialData ?? []);
        setCursor(undefined);
        setHasMore(true);
        setInitialLoadDone(!!(initialData && initialData.length > 0));
        setFirstRequestInProgress(!initialData || initialData.length === 0);
        knownKeysRef.current = new Set((initialData ?? []).map((it, i) => buildKey(it, i)));
        nextIndexRef.current = (initialData ?? []).length;
        setError(null);
        if (abortRef.current) abortRef.current.abort();
    }, [resetSignal, initialData, buildKey]);

    const loadMore = useCallback(async () => {
        if (!hasMore || loading) return;
        setLoading(true);
        setError(null);

        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const res = await fetch({ cursor, limit: pageSize });
            if (controller.signal.aborted) return;

            const fresh: T[] = [];
            res.items.forEach((it) => {
                const key = buildKey(it, nextIndexRef.current++);
                if (!knownKeysRef.current.has(key)) {
                    knownKeysRef.current.add(key);
                    fresh.push(it);
                }
            });

            setItems(prev => [...prev, ...fresh]);
            setCursor(res.nextCursor ?? null);
            setHasMore(res.nextCursor != null);
            setInitialLoadDone(true);
            setFirstRequestInProgress(false);
        } catch (e) {
            if ((e as any)?.name !== "AbortError") {
                setError(e);
                onError?.(e);
            }
        } finally {
            setLoading(false);
        }
    }, [cursor, hasMore, loading]);

    // Automatically load first page if no initialData
    useEffect(() => {
        if (!initialLoadDone) {
            loadMore();
        }
    }, []);

    useEffect(() => {
        const node = sentinelRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && initialLoadDone) {
                    loadMore();
                }
            });
        }, { threshold });

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        return () => {
            if (abortRef.current) abortRef.current.abort();
        };
    }, []);

    const shouldShowEmpty = items.length === 0 && !loading && initialLoadDone && !firstRequestInProgress;

    return (
        <div className={className}>
            {shouldShowEmpty ? (
                empty
            ) : (
                <>
                    {items.map((item, i) => (
                        <div key={buildKey(item, i)}>{renderItem(item, i)}</div>
                    ))}
                    <div ref={sentinelRef} style={{ minHeight: 1 }} />
                </>
            )}

            {loading && loader}
            {error ? <div style={{ color: "red", padding: 8 }}>Error loading data</div> : ''}
            {!hasMore && items.length > 0 && <div style={{ padding: 12, textAlign: "center" }}>— end —</div>}
        </div>
    );
}
