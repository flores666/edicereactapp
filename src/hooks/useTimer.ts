import {useEffect, useState} from "react";

interface ITimerProps {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second: number;
    increment: boolean;
}

export const useTimer = (props: ITimerProps) => {
    const { year = 0, month = 0, day = 0, hour = 0, minute = 0, second, increment } = props;
    const [timer, setTimer] = useState<Date | null>(null);
    const [timerString, setTimerString] = useState<string>('');

    function dateToParts(date: Date): ITimerProps {
        const parts: Partial<ITimerProps> = {};
        if (props.year !== undefined) parts.year = date.getFullYear();
        if (props.month !== undefined) parts.month = date.getMonth();
        if (props.day !== undefined) parts.day = date.getDate();
        if (props.hour !== undefined) parts.hour = date.getHours();
        if (props.minute !== undefined) parts.minute = date.getMinutes();
        if (props.second !== undefined) parts.second = date.getSeconds();

        return parts as ITimerProps;
    }

    useEffect(() => {
        const initial = new Date(year, month, day, hour, minute, second);
        setTimer(initial);
    }, [year, month, day, hour, minute, second]);

    useEffect(() => {
        if (!timer) return;

        const interval = setInterval(() => {
            setTimer(prev => {
                if (!prev) return null;

                const newTime = new Date(prev.getTime() + (increment ? 1000 : -1000));

                if (
                    newTime.getHours() === 0 &&
                    newTime.getMinutes() === 0 &&
                    newTime.getSeconds() === 0
                ) {
                    clearInterval(interval);
                    return null;
                }

                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [increment, timer !== null]);

    useEffect(() => {
        if (timer) {
            const parts = dateToParts(timer);
            setTimerString(toReadableDuration(parts));
        } else {
            setTimerString('');
        }
    }, [timer]);

    return {
        timer: timerString,
        setTimer
    };
}

// Приводит длительность (дата) в удобный читаемый вид.
function toReadableDuration(props: Partial<ITimerProps>): string {
    function formatUnit(value: number | undefined, one: string, few: string, many: string): string {
        if (!value || value === 0) return '';
        const mod100 = value % 100;
        const mod10 = value % 10;

        if (mod100 >= 11 && mod100 <= 14) return `${value} ${many}`;
        switch (mod10) {
            case 1:
                return `${value} ${one}`;
            case 2:
            case 3:
            case 4:
                return `${value} ${few}`;
            default:
                return `${value} ${many}`;
        }
    }

    const parts = [
        formatUnit(props.year, 'год', 'года', 'лет'),
        formatUnit(props.month, 'месяц', 'месяца', 'месяцев'),
        formatUnit(props.day, 'день', 'дня', 'дней'),
        formatUnit(props.hour, 'час', 'часа', 'часов'),
        formatUnit(props.minute, 'минута', 'минуты', 'минут'),
        formatUnit(props.second, 'секунда', 'секунды', 'секунд'),
    ].filter(Boolean);

    return parts.join(' ').trim();
}
