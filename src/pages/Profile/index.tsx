import {useTitle} from "@/hooks/useTitle.ts";
import {APP_NAME} from "@/config/constants.tsx";
import '@/pages/Profile/Profile.css';
import {useEffect, useState} from "react";
import {ProfileService} from "@/services/profileService.ts";
import {useParams} from "react-router-dom";
import type {TUser} from "@/models/User";

export function ProfilePage() {
    const [user, setUser] = useState<TUser | null>(null);
    const [loading, setLoading] = useState(true);
    useTitle(`${APP_NAME} | Профиль`);
    const {userId} = useParams();

    useEffect(() => {
        if (userId) {
            ProfileService.getProfileAsync(userId).then(response => {
                if (response.isSuccess && response.data) {
                    setUser(response.data);
                }

                setLoading(false);
            });
        }
    }, [user]);

    return (
        <div className='profile-page'>
            <div className='general-info'>
                <div className='profile-image-container'>
                    {
                        loading ? <div className='loading'></div> : <img className={user?.profilePicture ? '' : 'no-photo'} src={user?.profilePicture ?? '/src/assets/images/user_filler.png'} alt='profile picture'/>
                    }
                </div>
                <div className='profile-info'>
                    {
                        loading ? <div className='loading'></div> : <h1>{user ? user.name : 'Пользователь не найден'}</h1>
                    }
                </div>
            </div>
            <div className='profile-container'>
                <div className='left'></div>
                <div className='right'></div>
            </div>
        </div>
    );
}