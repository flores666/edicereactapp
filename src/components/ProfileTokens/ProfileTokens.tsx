import type {TToken, TTokenType} from "@/models/AssetCrafter";
import {toPlural} from "@/utils";


interface IProfileTokensProps {
    type: TTokenType;
    userId: string | null | undefined;
    items: Array<TToken>
}

export function ProfileTokens(props: IProfileTokensProps) {
    if (!props.userId || !props.items) return null;

    return (
        <div className='profile-tokens'>
            <a href='#'>
                <div className='header'>
                    <h2>Мои {toPlural(props.type.caption)}</h2>
                </div>
            </a>
            <div className='content'>
                {props.items.map(item => (
                    <div className='token' key={item.id}>
                        <div className='image-container'
                             style={{
                                 //@ts-ignore
                                 "--bg-img": `url(${item.imageUrl})`
                             }}>
                            <img src={item.imageUrl ?? '/src/assets/templateicon.svg'}></img> {/*todo: заменить филлер*/}
                            <div className='description'>{item.description}</div>
                        </div>
                        <div className='title'>{item.name}</div>
                    </div>))
                }
            </div>
        </div>
    );
}