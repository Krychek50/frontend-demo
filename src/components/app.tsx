import { useEffect, useState } from 'react';
import { ITableEntry, BackendAPI } from '../backendapi';
import { Card } from './card';
import css from '../styles/app.module.css';

interface IAppState {
  cardList: ITableEntry[];
}

export function App() {
  const [state, setState] = useState<IAppState>({cardList: []});
  const fetchItems = async () => {
    const data = await BackendAPI.getList();
    setState({ cardList: data });
  }
  
  useEffect(() => {
    fetchItems();
  }, []);
 
  const onAddClick = () => {
    const addItem = async () => {
      const data = await BackendAPI.addItem({Id: "AddItem"});
      setState({ cardList: data });
    }

    addItem();
  };

  const onEditClick = () => {
    const editItem = async () => {
      const data = await BackendAPI.addItem({Id: "AddItem", Value: 'Edited'});
      setState({ cardList: data });
    }

    editItem();
  };

  const onDeleteClick = () => {
    const deleteItem = async () => {
      const data = await BackendAPI.deleteItem({Id: "AddItem"});
      setState({ cardList: data });
    }

    deleteItem();
  };

  return ( 
    <div className={css.app}>
      <button onClick={onAddClick}>Add</button>
      <button onClick={onEditClick}>Edit</button>
      <button onClick={onDeleteClick}>Delete</button>
      <h1>Item List</h1>
      {state.cardList.map((card) => <Card key={card.Id} {...card}/> )}
    </div>
	);
}