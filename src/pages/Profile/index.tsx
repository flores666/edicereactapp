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
    }, []);

    return (
        <div className='profile-page'>
            <div className='general-info'>
                <div className='profile-image-container'
                     style={{
                         //@ts-ignore
                         "--bg-img": `url(${user?.profilePicture ?? '/src/assets/images/user_filler.png'})`
                     }}>
                    {
                        loading ? <div className='loading'></div> :
                            <img className={user?.profilePicture ? '' : 'no-photo'}
                                 src={user?.profilePicture ?? '/src/assets/images/user_filler.png'}
                                 alt='profile picture'/>
                    }
                </div>
                <div className='profile-info'>
                    {
                        loading ? <h1></h1> : <h1>{user ? user.name : 'Пользователь не найден'}</h1>
                    }
                </div>
            </div>
            <div className='profile-container'>
                <div className='left'>
                    <div className='profile-tokens'>
                        <a href='#'>
                            <div className='header'>
                                <h2>Мои персонажи</h2>
                            </div>
                        </a>
                        <div className='content'>
                            {Array.from({length: 6}).map((_) => (
                                <div className='token'>
                                    <div className='image-container'
                                         style={{
                                             //@ts-ignore
                                             "--bg-img": `url(/src/assets/images/knight.png)`
                                         }}>
                                        <img src='/src/assets/images/knight.png'></img>
                                        <div className='description'>Lorem Ipsum is simply dummy text of the printing
                                            and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                            text ever since the 1500s, when an unknown printer took a galley of type and
                                            scrambled it to make a type specimen book. It has survived not only five
                                            centuries, but also the leap into electronic typesetting, remaining
                                            essentially unchanged. It was popularised in the 1960s with the release of
                                            Letraset sheets containing Lorem Ipsum passages, and more recently with
                                            desktop publishing software like Aldus PageMaker including versions of Lorem
                                            Ipsum.
                                        </div>
                                    </div>
                                    <div className='title'>Рыцарь сгенерированный</div>
                                </div>))
                            }
                        </div>
                    </div>
                    <div className='profile-tokens'>
                        <a href='#'>
                            <div className='header'>
                                <h2>Мои предметы</h2>
                            </div>
                        </a>
                        <div className='content'>
                            {Array.from({length: 6}).map((_) => (
                                <div className='token'>
                                    <div className='image-container'
                                         style={{
                                             //@ts-ignore
                                             "--bg-img": `url(/src/assets/images/knight.png)`
                                         }}>
                                        <img src='/src/assets/images/knight.png'></img>
                                        <div className='description'>Lorem Ipsum is simply dummy text of the printing
                                            and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                            text ever since the 1500s, when an unknown printer took a galley of type and
                                            scrambled it to make a type specimen book. It has survived not only five
                                            centuries, but also the leap into electronic typesetting, remaining
                                            essentially unchanged. It was popularised in the 1960s with the release of
                                            Letraset sheets containing Lorem Ipsum passages, and more recently with
                                            desktop publishing software like Aldus PageMaker including versions of Lorem
                                            Ipsum.
                                        </div>
                                    </div>
                                    <div className='title'>Рыцарь сгенерированный</div>
                                </div>))
                            }
                        </div>
                    </div>
                </div>
                {/*<div className='right'>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}