import { APP_NAME } from "@/config/constants";
import {useTitle} from "@/hooks/useTitle.ts";

export function ConstructorPage() {
    useTitle(`${APP_NAME} | Конструктор`);
    
    return <h1>Конструктор</h1>;
}
