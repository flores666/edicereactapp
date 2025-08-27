export type TToken = {
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

export type TTokenType = {
    id: string;
    name: string;
    caption: string;
}