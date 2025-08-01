import {Button} from '@/components/Button/Button';
import {Link} from 'react-router-dom';

import '@/components/Layout/MiniProfile/MiniProfile.css';
import {ButtonColors} from "@/components/Button/ButtonColors.tsx";

export function MiniProfile() {
    const isAuthenticated = false;
    const userName = 'P.Diddler';
    const profilePictureUrl = '';

    const authenticatedResult = () => {
        return (
            <a href="/user" className="mini-profile-container">
                <span>{userName}</span>
                {profilePictureUrl === '' ? (
                    <div className="no-pic"></div>
                ) : (
                    <img src={profilePictureUrl} alt="no photo"/>
                )}
            </a>
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

    if (isAuthenticated) return authenticatedResult();

    return notAuthenticatedResult();
}
