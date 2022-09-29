import css from '../styles/card.module.css';

export interface ICardData {
  id: number,
  name: string
}

export function Card(props: ICardData) {
	return (
		<div className={css.container}>
			<div className={css.item}>{props.name}</div>
		</div>
	);
}