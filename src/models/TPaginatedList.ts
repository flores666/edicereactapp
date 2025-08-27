export type TPaginatedList<T> = {
    items: T[];
    page: number;
    size: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
