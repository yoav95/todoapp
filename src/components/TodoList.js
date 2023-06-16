import styles from "./TodoList.module.css";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
  let content = <p className={styles.msg}>no todos</p>;
  if (props.todos.length > 0) {
    content = (
      <ul className={styles.list}>
        {props.todos.map((todo) => (
          <TodoItem
            id={todo.id}
            key={todo.id}
            todo={todo.todo}
            date={todo.date}
            checked={todo.checked}
          />
        ))}
      </ul>
    );
  }
  console.log(props.todos);
  return <>{content}</>;
};
export default TodoList;
