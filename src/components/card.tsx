import css from '../styles/card.module.css';

export interface ICardData {
  name: string,
  flight_number: string,
  date_utc: string
}

interface ICardProps {
	card: ICardData;
}

export function Card(props: ICardProps) {
	return (
		<div className={css.container}>
			<div className={css.item}>{props.card.name}</div>
      <div className={css.item}>{props.card.flight_number}</div>
      <div className={css.item}>{props.card.date_utc}</div>
		</div>
	);
}