import '@/components/Card/Card.css';

export type TCardItem = {
    title: string;
    text?: string | null;
    imageSrc?: string | null;
}

export type TCardItems = Array<TCardItem>;

export function Card(props: TCardItem) {
    return (
        <div className='card'>
            <div className='card-image'>
                {
                    props.imageSrc 
                        ? <img src={props.imageSrc} /> 
                        : <img className='no-photo'/>
                }
            </div>
            <div className='card-title'>{props.title}</div>
            <div className='card-text'>{props.text}</div>
        </div>
    );
}