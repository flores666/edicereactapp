export const NotificationTypes = {
    Success: "success",
    Error: "error",
    Info: "info",
} as const;

export type NotificationType = (typeof NotificationTypes)[keyof typeof NotificationTypes];

export const NotificationIcons: Record<NotificationType, string> = {
    [NotificationTypes.Success]: "/src/assets/icons/check.svg",
    [NotificationTypes.Error]: "/src/assets/icons/error.svg",
    [NotificationTypes.Info]: "/src/assets/icons/info.svg",
};
