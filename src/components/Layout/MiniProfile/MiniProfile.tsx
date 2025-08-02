import {Button} from '@/components/Button/Button';
import {Link} from 'react-router-dom';

import '@/components/Layout/MiniProfile/MiniProfile.css';
import {ButtonColors} from "@/components/Button/ButtonColors.tsx";
import {useAuth} from "@/providers/Auth";

export function MiniProfile() {
    const auth = useAuth();
    
    const baseProfilePicture = 'src/assets/images/knight.png';

    const authenticatedResult = () => {
        return (
            <Link to="/user" className="mini-profile-container">
                <span>{auth.user?.name}</span>
                <img src={baseProfilePicture} alt="no photo"/>
            </Link>
        );
    };

    const notAuthenticatedResult = () => {
        return (
            <div className="mini-profile-container buttons">
                <Link to="/login">
                    <Button color={ButtonColors.Gray}>Войти</Button>
                </Link>
                <Link to="/register">
                    <Button color={ButtonColors.White}>Регистрация</Button>
                </Link>
            </div>
        );
    };

    if (auth.isAuthorized) return authenticatedResult();
    return notAuthenticatedResult();
}
