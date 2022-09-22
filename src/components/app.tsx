import { useEffect, useState } from 'react';
import { ICardData, Card } from './card';
import css from '../styles/app.module.css';

interface IAppState {
  cardList: ICardData[];
}

export function App() {
  const [state, setState] = useState<IAppState>({cardList: []});
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.spacexdata.com/v5/launches/upcoming');
      const data = await response.json();
      setState({ cardList: data });
    }

    fetchData();
  }, []);
 
  return ( 
    <div className={css.app}>
      <h1>Upcoming SpaceX Launches</h1>
      {state.cardList.map((card) => <Card key={card.flight_number} card={card}/> )}
    </div>
	);
}