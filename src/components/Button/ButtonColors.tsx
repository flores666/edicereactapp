export const ButtonColors = {
    White: "white",
    Black: "black",
    Gray: "gray",
} as const;

export type ButtonColor = (typeof ButtonColors)[keyof typeof ButtonColors];
