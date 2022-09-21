export interface ICardData {
  id: number,
  name: string,
  username: string,
  email: string
}

interface ICardProps {
	card: ICardData;
}

export function Card(props: ICardProps) {
	return (
		<div>
			<div>{props.card.name}</div>
      <div>{props.card.username}</div>
      <div>{props.card.email}</div>
		</div>
	);
}