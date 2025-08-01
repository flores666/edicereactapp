import {useTitle} from "@/hooks/useTitle.ts";

export function NotFoundPage() {
    useTitle('eDice - Платформа для проведения настольных игр');
    return <div>Страница не найдена...</div>;
}
