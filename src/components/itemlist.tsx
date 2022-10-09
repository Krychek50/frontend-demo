import { ITableEntry } from '../backendapi';
import { Item } from './item';
import css from '../styles/itemlist.module.css';

interface IItemListProps {
  data: ITableEntry[];
  onAdd: (item: ITableEntry) => void;
  onEdit: (item: ITableEntry) => void;
  onDelete: (item: ITableEntry) => void;
}

export function ItemList(props: IItemListProps) {
	return (
    <div>
      <h2>Add Item</h2>
      <div className={css.container}>
        <Item key={"reserved"} create={true} data={{Id: "", Value: "" }} onAdd={props.onAdd} onEdit={() => {}} onDelete={() => {}}></Item>
      </div>
      <h2>Item List</h2>
      <div className={css.container}>
          { props.data.length > 0 && 
            props.data.map((item: ITableEntry) => <Item key={item.Id} data={item} create={false} onAdd={() => {}} onEdit={props.onEdit} onDelete={props.onDelete}></Item>)
          }
      </div>
    </div>
	);
}