import { ITableEntry } from '../backendapi';
import css from '../styles/card.module.css';

const onClick = () => {
}
export function Card(props: ITableEntry) {
	return (
		<div className={css.container}>
			<div className={css.title}>{props.Id}</div>
      <div className={css.footer}>{props?.Value}</div>
		</div>
	);
}