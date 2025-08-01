import '@/providers/Notifications/Notification.css'
import React, {useEffect} from "react";
import {NotificationIcons, type NotificationType} from "@/providers/Notifications/NotificationIcons.tsx";

interface INotificationProps {
    message: string;
    icon: NotificationType;
    onClose: () => void;
}

export function NotificationItem(props: INotificationProps) {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [dragX, setDragX] = React.useState<number>(0);
    
    const isMouseEnteredRef = React.useRef<boolean>(false);
    const isDraggingRef = React.useRef<boolean>(false);
    
    const ref = React.useRef<HTMLDivElement>(null);
    const startX = React.useRef(0);

    const timeAlive = 4000;
    const timerIdRef = React.useRef<NodeJS.Timeout | null>(null);
    
    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
        timerIdRef.current = setVisibilityTimeout(timeAlive);
        return () => {
            if (timerIdRef.current) clearTimeout(timerIdRef.current);
        }
    }, [timeAlive]);

    const setVisibilityTimeout = (duration: number) => {
        if (timerIdRef.current) clearTimeout(timerIdRef.current);
        timerIdRef.current = setTimeout(() => {
            if (!isMouseEnteredRef.current && !isDraggingRef.current) setVisible(false);
        }, duration);
        return timerIdRef.current;
    };

    const handleTransitionEnd = () => {
        if (!visible) props.onClose();
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDraggingRef.current) return;
        const delta = e.clientX - startX.current;
        if (delta > 0) setDragX(delta);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        const delta = e.clientX - startX.current;
        const swipeThreshold = 100;

        if (delta > swipeThreshold) {
            setVisible(false);
        } else {
            setDragX(0);
        }

        isDraggingRef.current = false;
    };

    const onPointerDown = (e: React.PointerEvent) => {
        startX.current = e.clientX;
        isDraggingRef.current = true;
        ref.current?.setPointerCapture(e.pointerId);
    };

    const handleMouseEnter = () => {
        isMouseEnteredRef.current = true;
        
        if (!isDraggingRef.current) {
            ref.current?.classList.remove('nudge');
            ref.current?.classList.add('nudge');
        }

        if (timerIdRef.current) {
            clearTimeout(timerIdRef.current);
            timerIdRef.current = null;
        }
    }

    const handleMouseLeave = () => {
        isMouseEnteredRef.current = false;
        if (!isDraggingRef.current) {
            setVisibilityTimeout(timeAlive);
        }
    };

    function getOpacityPercent(x: number): number {
        x = Math.max(0, Math.min(200, x));
        const ratio = x / 200;
        return Math.round(100 * Math.pow(1 - ratio, 2));
    }

    return (
        <div
            ref={ref}
            className={`notification ${visible ? 'visible' : ''} ${isDraggingRef.current ? 'dragging' : ''}`}
            onTransitionEnd={handleTransitionEnd}
            onPointerDown={onPointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `translateX(${dragX}px)`,
                opacity: visible ? (dragX / 100 > 0 ? `${getOpacityPercent(dragX)}%` : 1) : 0,
                touchAction: 'pan-y',
            }}>
            <div className="content">
                <div className="notification-icon">
                    <img draggable="false" src={NotificationIcons[props.icon]} alt=""/>
                </div>
                <span className="notifications-message">{props.message}</span>
            </div>
        </div>
    );
}