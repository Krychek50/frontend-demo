import { useState } from 'react';
import { ITableEntry } from '../backendapi';
import css from '../styles/item.module.css';

interface IItemState {
  edit: boolean;
  data: ITableEntry;
}

interface IItemProps {
  create: boolean;
  data: ITableEntry;
  onAdd: (item: ITableEntry) => void;
  onEdit: (item: ITableEntry) => void;
  onDelete: (item: ITableEntry) => void;
}

export function Item(props: IItemProps) {
  const [state, setState] = useState<IItemState>({edit: props.create, data: props.data});

  const onSubmit = (event) => {
    event.preventDefault();
    const submit = async () => {
      setState((prevState: IItemState) => {
        const Value = (props.create) ? "" : prevState.data.Value;
        return ({edit: props.create, data: { Id: props.data.Id, Value}})
      });

      if (props.create) {
        await props.onAdd(state.data);
      } else {
        await props.onEdit(state.data);
      }
    }
    
    submit();
  };

  const handleChange = (event) => {
    setState((prevState: IItemState) => {
      let Id = prevState.data.Id;
      if (event.target.name == 'Id' && props.create) {
        Id = event.target.value;
      }

      let Value = prevState.data.Value;
      if (event.target.name == 'Value') {
        Value = event.target.value;
      }
      return ({edit: prevState.edit, data: { Id, Value }})
    });
  };

  const onClick = () => {
    setState((prevState: IItemState) => ({edit: !prevState.edit, data: prevState.data}));
  };

  return (
      <div className={css.container}>
        <div className={css.title}>{ props.data.Id ? props.data.Id : "Create"}</div>
        { state.edit && 
          <form className={css.formDiv} onSubmit={onSubmit}>
            { props.create && 
             <label className={css.labelblock}>
                <div className={css.label}>Id</div>
                <input type="text" name="Id" value={state.data.Id} onChange={handleChange} />
              </label>
            }
            <label className={css.labelblock}>
            <div className={css.label}>Value</div>
              <input type="text" name="Value" value={state.data.Value} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        }

        { !state.edit && 
          <div className={css.description}>{ props.data.Value ? props.data.Value : "N/A" }</div>
        }

        { !props.create &&
          <div className={css.panelDiv}>
            <button onClick={onClick}>{ state.edit ? "Cancel" : "Edit"}</button>
            <button onClick={() => props.onDelete(props.data)}>Delete</button>
          </div>
        }
      </div>
  )
}