import css from '../styles/card.module.css';

export interface ICardData {
  Id: string,
  Value: string
}

const onClick = () => {
}
export function Card(props: ICardData) {
	return (
		<div className={css.container}>
			<div className={css.title}>{props.Id}</div>
      <div className={css.footer}>{props.Value}</div>
		</div>
	);
}