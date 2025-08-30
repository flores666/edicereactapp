export type TAuthorizedUser = {
    id: string;
    email: string;
    name: string;
};

export type TUser = {
    id: string;
    email: string;
    name: string;
    createdAt: Date,
    bannedBefore: Date | null,
    description: string | null,
    profilePicture: string | null,
    profilePicturePreview: string | null,
};
