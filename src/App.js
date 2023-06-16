import styles from "./App.module.css";
import { useEffect, useState, useContext } from "react";
import AddNewTodo from "./components/AddNewTodo";
import TodoList from "./components/TodoList";
import DbContext from "./store/db-context";
import { PulseLoader } from "react-spinners";

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const getTodos = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = await getDocs(todosCollectionRef);
  //     const filteredData = data.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setTodoItems(filteredData);
  //     setIsLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const dbCtx = useContext(DbContext);
  useEffect(() => {
    setIsLoading(true);
    dbCtx
      .getTodos()
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleNewTodo = async (newTodo) => {
  //   try {
  //     await addDoc(todosCollectionRef, newTodo);
  //     getTodos();
  //     return "todo was added";
  //   } catch (err) {
  //     throw new Error(err.message);
  //   }
  // };

  // const handleDeleteTodo = async (id) => {};

  return (
    <div className={styles.app}>
      <header className={styles.header}></header>
      <AddNewTodo />
      <div className={styles.content}>
        {isLoading ? (
          <PulseLoader
            className={styles.msg}
            color="var(--color-second)"
            margin={4}
          />
        ) : (
          <TodoList todos={dbCtx.todoItems} />
        )}
      </div>
    </div>
  );
}

export default App;
