import React, { useState } from "react";
import { db } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const todosCollectionRef = collection(db, "todos");

const DbContext = React.createContext({
  todoItems: [],
  addTodo: () => {},
  removeTodo: () => {},
  getTodos: () => {},
  updateTodo: () => {},
  updateChecked: () => {},
});

export const DbContextProvider = (props) => {
  const [todoItems, setTodoItems] = useState([]);
  const getTodos = async () => {
    try {
      const data = await getDocs(todosCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodoItems(filteredData);
      return "got todos from db";
    } catch (err) {
      throw new Error(err);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      await addDoc(todosCollectionRef, newTodo);
      await getTodos();
      return "todo was added";
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const removeTodo = async (id) => {
    try {
      const todoDoc = doc(db, "todos", id);
      await deleteDoc(todoDoc);
      await getTodos();
      return "todo was deleted";
    } catch (err) {
      throw new Error(err);
    }
  };

  const updateTodo = async (id, newTodoString) => {
    try {
      const todoDoc = doc(db, "todos", id);
      await updateDoc(todoDoc, { todo: newTodoString });
      return "todo updated";
    } catch (err) {
      throw new Error(err);
    }
  };

  const updateChecked = async (id, value) => {
    try {
      const todoDoc = doc(db, "todos", id);
      await updateDoc(todoDoc, { checked: value });
      await getTodos();
      return "todo updated";
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <DbContext.Provider
      value={{
        removeTodo: removeTodo,
        addTodo: addTodo,
        getTodos: getTodos,
        todoItems: todoItems,
        updateTodo: updateTodo,
        updateChecked: updateChecked,
      }}
    >
      {props.children}
    </DbContext.Provider>
  );
};

export default DbContext;
