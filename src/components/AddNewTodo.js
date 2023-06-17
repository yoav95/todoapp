import { useContext, useState } from "react";
import styles from "./AddNewTodo.module.css";
import DbContext from "../store/db-context";

const AddNewTodo = (props) => {
  const [todoInputValue, setTodoInputValue] = useState("");
  const [todoInputInvalid, setTodoInputInvalid] = useState(true);
  const dbCtx = useContext(DbContext);
  const handleInputChange = (event) => {
    setTodoInputValue(event.target.value);
    if (todoInputInvalid === "" || todoInputValue.trim().length < 5) {
      setTodoInputInvalid(true);
    } else {
      setTodoInputInvalid(false);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (todoInputInvalid) {
      alert("invalid");
      return;
    }
    const todayString = new Date().toDateString();
    const newTodo = { todo: todoInputValue, date: todayString, checked: false };
    dbCtx
      .addTodo(newTodo)
      .then((res) => {
        console.log(res);
        setTodoInputValue("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={styles["add-new-todo"]}>
      <form onSubmit={handleFormSubmit}>
        <label></label>
        <input
          value={todoInputValue}
          type="text"
          onChange={handleInputChange}
        />
        <button>ADD</button>
      </form>
    </div>
  );
};

export default AddNewTodo;
