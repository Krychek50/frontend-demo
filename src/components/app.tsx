import { useEffect, useState } from 'react';
import { ITableEntry, BackendAPI } from '../backendapi';
import { ItemList } from './itemlist';
import { Item } from './item';
import css from '../styles/app.module.css';

interface IAppState {
  msg: string;
  items: ITableEntry[];
}

export function App() {
  const [state, setState] = useState<IAppState>({msg: "", items: []});
  
  useEffect(() => {
    const getItems = async () => {
      const data = await BackendAPI.getList();
      setState({ msg: "", items: data });
    }

    getItems();
  }, []);
 
  const onAddItem = (item: ITableEntry) => {
    const addItem = async () => {
      const data = await BackendAPI.addItem(item);
      setState({ msg: `Add ${item.Id}`, items: data });
    }

    addItem();
  };

  const onEditItem = (item: ITableEntry) => {
    const editItem = async () => {
      const data = await BackendAPI.addItem(item);
      setState({ msg: `Edit ${item.Id}`, items: data });
    }

    editItem();
  };

  const onDeleteItem = (item: ITableEntry) => {
    const deleteItem = async () => {
      const data = await BackendAPI.deleteItem(item);
      setState({ msg: `Delete ${item.Id}`, items: data });
    }

    deleteItem();
  };

  return ( 
    <div className={css.container}>
      <h2>Add Item</h2>
      <Item key={"reserved"} create={true} data={{Id: "", Value: "" }} onAdd={onAddItem} onEdit={() => {}} onDelete={() => {}}></Item>
      { state.msg.length > 0 && <p>Last Action: {state.msg}</p> }

      <ItemList data={state.items} onEdit={onEditItem} onDelete={onDeleteItem}/>
    </div>
	);
}