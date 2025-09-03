import {useTitle} from "@/hooks/useTitle.ts";
import {APP_NAME} from "@/config/constants.tsx";
import '@/pages/Profile/Profile.css';
import {useEffect, useState} from "react";
import {ProfileService} from "@/services/profileService.ts";
import {useParams} from "react-router-dom";
import type {TUser} from "@/models/User";
import {ProfileTokens} from "@/components/ProfileTokens/ProfileTokens";
import type {TToken, TTokenType} from "@/models/AssetCrafter";
import {getTokens, getTokenTypes} from "@/services/assetCrafterService.ts";

export function ProfilePage() {
    const [user, setUser] = useState<TUser | null>(null);
    const [tokenTypes, setTokenTypes] = useState<Array<TTokenType>>([]);
    const [tokens, setTokens] = useState<{ [type: string]: TToken[] }>({});
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

    useEffect(() => {
        if (user?.id == null) return;

        getTokenTypes().then(async response => {
            if (response.isSuccess && response.data) {
                setTokenTypes(response.data);

                let tokensMap: { [type: string]: TToken[] } = {};

                await Promise.all(
                    response.data.map(async item => {
                        let tokens = await getTokens({
                            type: item.id,
                            user: user.id,
                            page: 1,
                            size: 10
                        });

                        if (tokens?.data?.items?.length) {
                            tokensMap[item.name] = tokens.data.items;
                        }
                    })
                );

                setTokens(tokensMap);
            }
        });
    }, [user]);

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
                    {tokenTypes.map(item => <ProfileTokens key={item.id} items={tokens[item.name]} type={item} userId={user?.id}></ProfileTokens>)}
                </div>
                {/*<div className='right'>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}