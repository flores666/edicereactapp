import type {NotificationType} from "@/providers/Notifications/NotificationIcons.tsx";
import React, {createContext, type ReactNode, useContext} from "react";
import {NotificationItem} from "@/providers/Notifications/NotificationItem.tsx";

interface INotification {
    id: number;
    message: string;
    type: NotificationType;
}

interface INotificationsContext {
    addNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<INotificationsContext | undefined>(undefined);

export function NotificationsProvider({children}: { children: ReactNode }) {
    const [notifications, setNotifications] = React.useState<INotification[]>([])

    // @ts-ignore
    function addNotification(message: string, type: NotificationType) {
        const id = Date.now();
        setNotifications((prev) => [...prev, {id, message, type}]);
    }

    // @ts-ignore
    function removeNotification(id: number) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }

    return (
        <NotificationContext.Provider value={{addNotification}}>
            {children}
            <div className="notifications-container">
                {notifications.map((item) =>
                    <NotificationItem key={item.id} message={item.message} icon={item.type}/>
                )}
            </div>
        </NotificationContext.Provider>
    )
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within NotificationProvider");
    }
    return context;
}
