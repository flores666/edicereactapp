import {useTitle} from "@/hooks/useTitle.ts";
import {APP_NAME} from "@/config/constants.tsx";

export function LobbyPage() {
    useTitle(`${APP_NAME} | Лобби`);
    return <h1>Выберите или создайте комнату</h1>;
}
