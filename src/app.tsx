import { useEffect, useState } from 'react';
import { ITableEntry, BackendAPI } from './api/backendapi';
import { ItemList } from './containers/itemlist/itemlist';
import { Item } from './components/item/item';
//@ts-ignore
import css from './app.module.css';

export function App() {
  const [msg, setMsg] = useState<string>("");
  const [items, setItems] = useState<ITableEntry[]>([]);
  
  useEffect(() => {
    const getItems = async () => {
      const data = await BackendAPI.getList();
      setItems(data);
    }

    getItems();
  }, []);
 
  const onAddItem = (item: ITableEntry) => {
    const addItem = async () => {
      const data = await BackendAPI.addItem(item);
      setItems(data);
      setMsg(`Add ${item.Id}`);
    }

    addItem();
  };

  const onEditItem = (item: ITableEntry) => {
    const editItem = async () => {
      const data = await BackendAPI.addItem(item);
      setItems(data);
      setMsg(`Edit ${item.Id}`);
    }

    editItem();
  };

  const onDeleteItem = (item: ITableEntry) => {
    const deleteItem = async () => {
      const data = await BackendAPI.deleteItem(item);
      setItems(data);
      setMsg(`Delete ${item.Id}`);
    }

    deleteItem();
  };

  return ( 
    <div className={css.container}>
      <h2>Add Item</h2>
      <Item key={"reserved"} create={true} data={{Id: "", Value: "" }} onAdd={onAddItem} onEdit={() => {}} onDelete={() => {}}></Item>
      { msg.length > 0 && <p>Last Action: {msg}</p> }

      <ItemList data={items} onEdit={onEditItem} onDelete={onDeleteItem}/>
    </div>
	);
}