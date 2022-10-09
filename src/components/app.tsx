import { useEffect, useState } from 'react';
import { ITableEntry, BackendAPI } from '../backendapi';
import { ItemList } from './itemlist';
import css from '../styles/app.module.css';

interface IAppState {
  items: ITableEntry[];
}

export function App() {
  const [state, setState] = useState<IAppState>({items: []});
  
  useEffect(() => {
    const getItems = async () => {
      const data = await BackendAPI.getList();
      setState({ items: data });
    }

    getItems();
  }, []);
 
  const onAddItem = (item: ITableEntry) => {
    const addItem = async () => {
      const data = await BackendAPI.addItem(item);
      setState({ items: data });
    }

    addItem();
  };

  const onEditItem = (item: ITableEntry) => {
    const editItem = async () => {
      const data = await BackendAPI.addItem(item);
      setState({ items: data });
    }

    editItem();
  };

  const onDeleteItem = (item: ITableEntry) => {
    const deleteItem = async () => {
      const data = await BackendAPI.deleteItem(item);
      setState({ items: data });
    }

    deleteItem();
  };

  return ( 
    <div className={css.container}>
      <ItemList data={state.items} onAdd={onAddItem} onEdit={onEditItem} onDelete={onDeleteItem}/>
    </div>
	);
}