import '@/components/Card/Card.css';
import {useRef} from "react";

export type TCardItem = {
    id: string;
    title: string;
    text?: string | null;
    imageSrc?: string | null;
    isOfficial?: boolean;
    isVerified?: boolean;
}

export function Card(props: TCardItem) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = () => {
        const card = cardRef.current;
        if (!card) return;

        card.style.transform = `scale(1.02)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;

        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    };

    return (
        <div
            className="card"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="card-image"
                 style={{
                     //@ts-ignore
                     "--bg-img": `url(${props.imageSrc})`
                 }}>
                {props.imageSrc ? (
                    <img crossOrigin="anonymous" src={props.imageSrc}/>
                ) : (
                    <img className="no-photo"/>
                )}
                <div className='card-meta'>
                    {props.isOfficial ? <span className='official' title='Оффициальный контент'></span> : ''}
                    {(props.isVerified && !props.isOfficial) ? <span className='verified' title='Подтвержденный контент сообщества'></span> : ''}
                </div>
            </div>
            <h4 className="card-title">{props.title}</h4>
            <p className="card-text muted">{props.text}</p>
        </div>
    );
}