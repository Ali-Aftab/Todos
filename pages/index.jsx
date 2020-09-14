import React, { memo, useState } from "react";
import ReactDOM from "react-dom";
import { useInputValue, useTodos } from "../src/hooks";
import Layout from "../src/components/Layout";
import AddTodo from "../src/components/AddTodo";
import TodoList from "../src/components/TodoList";
import ErrorPopup from "../src/components/ErrorPopup";
const TodoApp = memo((props) => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const { todos, addTodo, checkTodo, removeTodo } = useTodos();
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setisError] = useState(false);

  const clearInputAndAddTodo = async (_) => {
    clearInput();
    const addTodoRes = await addTodo(inputValue);
    if (addTodoRes && addTodoRes.response === "error") {
      setisError(true);
      setErrorMessage(addTodoRes.message);
    }
  };
  const closePopup = (event, reason) => {
    setisError(false);
  };
  return (
    <Layout>
      <AddTodo
        inputValue={inputValue}
        onInputChange={changeInput}
        onButtonClick={clearInputAndAddTodo}
        onInputKeyPress={(event) => keyInput(event, clearInputAndAddTodo)}
      />
      <ErrorPopup
        isError={isError}
        closePopup={closePopup}
        errorMessage={errorMessage}
      />
      <TodoList
        items={todos}
        onItemCheck={(idx) => checkTodo(idx)}
        onItemRemove={(idx) => removeTodo(idx)}
      />
    </Layout>
  );
});
export default TodoApp;
