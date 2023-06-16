import { useState, useContext, useEffect } from "react";
import styles from "./TodoItem.module.css";
import DbContext from "../store/db-context";

const TodoItem = (props) => {
  const dbCtx = useContext(DbContext);
  const [checked, setChecked] = useState(props.checked);
  const [selected, setSelected] = useState(false);
  const [todoValue, setTodoValue] = useState(props.todo);
  const handleClick = () => {
    setSelected((prevChecked) => {
      return !prevChecked;
    });
  };

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  const handleChangeTodoValue = (event) => {
    if (!selected) {
      return;
    }
    event.stopPropagation();
  };

  const handleChange = (event) => {
    setTodoValue(event.target.innerText);
  };

  const handleOnBlur = (event) => {
    dbCtx
      .updateTodo(props.id, todoValue)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert(err.message);
        setTodoValue(props.todo);
      });
  };

  const handleDelete = (event) => {
    dbCtx
      .removeTodo(props.id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChecked = (event) => {
    setChecked((prevChecked) => {
      dbCtx
        .updateChecked(props.id, !prevChecked)
        .then((res) => {
          return !prevChecked;
        })
        .catch((err) => {
          alert(err);
          return prevChecked;
        });
      //   return !prevChecked;
    });
  };

  let itemClasses = styles.todo;
  if (selected && !checked) {
    itemClasses = `${styles.todo} ${styles.selected}`;
  }
  if (checked && !selected) {
    itemClasses = `${styles.todo} ${styles.checked}`;
  }

  if (checked && selected) {
    itemClasses = `${styles.todo} ${styles.selected} ${styles.checked}`;
  }
  return (
    <li className={itemClasses} onClick={handleClick}>
      <p className={styles.date}>{props.date}</p>
      <p
        contentEditable={selected ? true : false}
        onClick={handleChangeTodoValue}
        onInput={handleChange}
        onBlur={handleOnBlur}
        dir="ltr"
        className={styles["todo-value"]}
      >
        {todoValue}
      </p>
      {selected ? (
        <div className={styles.control}>
          <button onClick={handleDelete}>DELETE</button>
          <button onClick={handleChecked}>
            {checked ? "uncheck" : "check"}
          </button>
        </div>
      ) : (
        <></>
      )}
    </li>
  );
};

export default TodoItem;
