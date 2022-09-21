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
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      console.log(data);
      setState({ cardList: data });
    }

    fetchData();
  }, []);
 
  return ( 
    <div className={css.app}>
      {state.cardList.map((card) => <Card card={card}/> )}
    </div>
	);
}