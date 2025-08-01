import '@/providers/Notifications/Notification.css'
import React, {useEffect} from "react";
import {NotificationIcons, type NotificationType} from "@/providers/Notifications/NotificationIcons.tsx";

interface INotificationProps {
    message: string;
    icon: NotificationType;
}

export function NotificationItem(props: INotificationProps) {
    const [visible, setVisible] = React.useState<boolean>(true);

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
        
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(() => {}, 3000)
        });
        
        return () => clearTimeout(timer);
    }, []);
    
    return (
        <div className={`notification ${visible ? 'visible' : ''}`}>
            <div className="notification-icon">
                <img src={NotificationIcons[props.icon]} alt=""/>
            </div>
            <span className={"notifications-message"}>{props.message}</span>
        </div>
    );
}