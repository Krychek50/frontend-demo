import { useEffect, useState } from 'react';
import { ICardData, Card } from './card';
import css from '../styles/app.module.css';

interface IAppState {
  cardList: ICardData[];
}

export function App() {
  const [state, setState] = useState<IAppState>({cardList: []});
  const fetchData = async () => {
    const response = await fetch('https://gpclnin8ok.execute-api.eu-west-2.amazonaws.com');
    const data = await response.json();
    setState({ cardList: data });

    console.log("Read");
  }
  
  useEffect(() => {
    fetchData();
  }, []);
 
  const onAddClick = () => {
    const addData = async () => {
      await fetch('https://gpclnin8ok.execute-api.eu-west-2.amazonaws.com', 
      {
        method: 'POST',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'Id': 'AddTest', 'Value': '0' })
      });
      
      console.log("Create");
      fetchData();
    }

    addData();
  };

  const onEditClick = () => {
    const addData = async () => {
      await fetch('https://gpclnin8ok.execute-api.eu-west-2.amazonaws.com/AddTest', 
      {
        method: 'PUT',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'Id': 'AddTest', 'Value': '2' })
      });
      
      console.log("Edit");
      fetchData();
    }

    addData();
  };

  const onDeleteClick = () => {
    const addData = async () => {
      await fetch('https://gpclnin8ok.execute-api.eu-west-2.amazonaws.com/AddTest', 
      {
        method: 'DELETE',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      console.log("Delete");
      fetchData();
    }

    addData();
  };

  return ( 
    <div className={css.app}>
      <h1>Item List</h1>
      {state.cardList.map((card) => <Card key={card.Id} {...card}/> )}
      <button onClick={onAddClick}>Add</button>
      <button onClick={onEditClick}>Edit</button>
      <button onClick={onDeleteClick}>Delete</button>
    </div>
	);
}