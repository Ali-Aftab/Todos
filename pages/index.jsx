import React, { memo, useState } from "react";
import ReactDOM from "react-dom";
import { useInputValue, useTodos, useScenario } from "../src/hooks";
import Layout from "../src/components/Layout";
import AddTodo from "../src/components/AddTodo";
import TodoList from "../src/components/TodoList";
import ErrorPopup from "../src/components/ErrorPopup";
const TodoApp = memo((props) => {
  const { inputValue, changeInput, clearInput, keyInput } = useInputValue();
  const {
    todos,
    searchResult,
    addTodo,
    checkTodo,
    removeTodo,
    searchTodo,
  } = useTodos();
  const { scenario, handleScenario } = useScenario();

  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setisError] = useState(false);

  let items = todos;
  let onButtonClick = clearInputAndAddTodo;

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

  const searchInput = () => {
    const newList = searchTodo(inputValue);
    if (newList.length === 0) {
      setisError(true);
      setErrorMessage("There are no results matched to your query!");
    }
  };

  if (scenario === "Search") {
    onButtonClick = searchInput;
    items = searchResult;
  } else if (scenario === "Add") {
    items = todos;
    onButtonClick = clearInputAndAddTodo;
  }

  return (
    <Layout scenario={scenario} handleScenario={handleScenario}>
      <AddTodo
        inputValue={inputValue}
        onInputChange={changeInput}
        onButtonClick={onButtonClick}
        onInputKeyPress={(event) => keyInput(event, onButtonClick)}
        scenario={scenario}
      />
      <ErrorPopup
        isError={isError}
        closePopup={closePopup}
        errorMessage={errorMessage}
      />
      <TodoList
        items={items}
        onItemCheck={(idx) => checkTodo(idx)}
        onItemRemove={(idx) => removeTodo(idx)}
      />
    </Layout>
  );
});
export default TodoApp;
