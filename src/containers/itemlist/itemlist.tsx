import { ITableEntry } from '../../api/backendapi';
import { Item } from '../../components/item/item';
//@ts-ignore
import css from './itemlist.module.css';

interface IItemListProps {
  data: ITableEntry[];
  onEdit: (item: ITableEntry) => void;
  onDelete: (item: ITableEntry) => void;
}

export function ItemList(props: IItemListProps) {
	return (
    <div>
      <h2>Item List</h2>
      <div className={css.container}>
          { props.data.length > 0 && 
            props.data.map((item: ITableEntry) => <Item key={item.Id} data={item} create={false} onAdd={() => {}} onEdit={props.onEdit} onDelete={props.onDelete}></Item>)
          }
      </div>
    </div>
	);
}