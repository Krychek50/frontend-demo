import { useState } from 'react';
import { ITableEntry } from '../../api/backendapi';
//@ts-ignore
import css from './item.module.css';

interface IItemProps {
  create: boolean;
  data: ITableEntry;
  onAdd: (item: ITableEntry) => void;
  onEdit: (item: ITableEntry) => void;
  onDelete: (item: ITableEntry) => void;
}

export function Item(props: IItemProps) {
  const [edit, setEdit] = useState<boolean>(props.create);
  const [data, setData] = useState<ITableEntry>(props.data);

  const onSubmit = (event) => {
    event.preventDefault();
    const submit = async () => {
      setEdit(props.create);
      setData((prevState: ITableEntry) => {
        const Value = (props.create) ? "" : prevState.Value;
        return { Id: props.data.Id, Value };
      });

      if (props.create) {
        await props.onAdd(data);
      } else {
        await props.onEdit(data);
      }
    }
    
    submit();
  };

  const handleChange = (event) => {
    setData((prevState: ITableEntry) => {
      let Id = prevState.Id;
      if (event.target.name == 'Id' && props.create) {
        Id = event.target.value;
      }

      let Value = prevState.Value;
      if (event.target.name == 'Value') {
        Value = event.target.value;
      }
      return { Id, Value };
    });
  };

  const onEditClick = () => {
    setEdit((prevState: boolean) => !prevState);
  };

  return (
      <div className={css.container}>
        <div className={css.title}>{ props.data.Id ? props.data.Id : "Create"}</div>
        { edit && 
          <form className={css.formDiv} onSubmit={onSubmit}>
            { props.create && 
             <label className={css.labelblock}>
                <div className={css.label}>Id</div>
                <input type="text" name="Id" value={data.Id} onChange={handleChange} />
              </label>
            }
            <label className={css.labelblock}>
              <div className={css.label}>Value</div>
              <input  type="text" name="Value" value={data.Value} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        }

        { !edit && 
          <div className={css.description}>{ props.data.Value ? props.data.Value : "N/A" }</div>
        }

        { !props.create &&
          <div className={css.panelDiv}>
            <button onClick={onEditClick}>{ edit ? "Cancel" : "Edit"}</button>
            <button onClick={() => props.onDelete(props.data)}>Delete</button>
          </div>
        }
      </div>
  )
}