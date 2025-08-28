import {useTitle} from "@/hooks/useTitle.ts";
import {APP_NAME} from "@/config/constants.tsx";

export function NotFoundPage() {
    useTitle(`${APP_NAME} | Платформа для проведения настольных игр`);
    return <div>Страница не найдена...</div>;
}
