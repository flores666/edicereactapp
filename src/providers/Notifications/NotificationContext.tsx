import type {NotificationType} from "@/providers/Notifications/NotificationIcons.tsx";
import {createContext} from "react";

interface INotificationsContext {
    addNotification: (message: string, type: NotificationType) => void;
}

export const NotificationContext = createContext<INotificationsContext | undefined>(undefined);
