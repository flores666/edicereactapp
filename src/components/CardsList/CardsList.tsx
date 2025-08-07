import '@/components/CardsList/CardsList.css';
import {Card, type TCardItems} from "@/components/Card/Card.tsx";

interface ICardsListProps {
    cards: TCardItems
}

export function CardsList(props: ICardsListProps) {
    return (
        <div className='cards-container'>
            {
                props.cards.map((card, i) => {
                    return <Card {...card} key={i} />;
                })
            }
        </div>
    );
}