export const ButtonStates = {
    Active: "active",
    Disabled: "disabled",
} as const;

export type ButtonState = (typeof ButtonStates)[keyof typeof ButtonStates];
