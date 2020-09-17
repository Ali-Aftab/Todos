import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import client from "../api";
const listTodos = gql`
  query listTodos {
    listTodos {
      text
      checked
    }
  }
`;
const addTodo = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) {
      text
      checked
    }
  }
`;
const checkTodo = gql`
  mutation checkTodo($text: String!) {
    checkTodo(text: $text) {
      text
      checked
    }
  }
`;
const removeTodo = gql`
  mutation removeTodo($text: String!) {
    removeTodo(text: $text) {
      text
      checked
    }
  }
`;
const errorResponseFeedback = (error) => {
  if (error.graphQLErrors && error.graphQLErrors[0]) {
    return {
      response: "error",
      message: error.graphQLErrors[0].message,
    };
  } else {
    return {
      response: "error",
      message: "Error occured with API",
    };
  }
};

const useTodos = () => {
  const { data, loading, error, refetch } = useQuery(listTodos);
  const [useAddTodoMutation, addTodoMutationResult] = useMutation(addTodo);
  const [useCheckTodoMutation, checkTodoMutationResult] = useMutation(
    checkTodo
  );
  const [useRemoveTodoMutation, removeTodoMutationResult] = useMutation(
    removeTodo
  );
  const todos = data?.listTodos || [];

  const graphQLTask = { __typename: `Query`, listTodos: todos };
  const cacheID = client.cache.identify(graphQLTask);

  const [searchResult, setSearchResult] = useState(todos);

  return {
    todos,
    searchResult,
    errorResponseFeedback,
    addTodo: async (text) => {
      let apiFail = false;
      try {
        await useAddTodoMutation({
          variables: { text },
        });
      } catch (error) {
        apiFail = true;
        return errorResponseFeedback(error);
      }
      if (!apiFail) {
        const newTask = { text, checked: false };
        client.writeQuery({
          query: listTodos,
          data: {
            listTodos: [...todos, newTask],
          },
        });
      }
    },
    checkTodo: async (idx) => {
      const { text, checked } = todos[idx];
      await useCheckTodoMutation({
        variables: { text },
      });

      let updateCheck = true;
      if (checked === true) {
        updateCheck = false;
      }

      const updateTask = { text, checked: updateCheck };
      const updateList = [...todos];
      updateList[idx] = updateTask;

      client.cache.modify({
        id: cacheID,
        fields: {
          listTodos() {
            return updateList;
          },
        },
      });
    },
    removeTodo: async (idx) => {
      const { text } = todos[idx];
      await useRemoveTodoMutation({
        variables: { text },
      });

      let updateList = [...todos];

      client.cache.modify({
        id: cacheID,
        fields: {
          listTodos() {
            return updateList.filter((task) => task.text !== text);
          },
        },
      });
    },
    searchTodo: (text) => {
      const filterResult = todos.filter((todoItem) => {
        const itemName = todoItem.text;
        return itemName.indexOf(text) != -1;
      });
      setSearchResult(filterResult);
      return filterResult;
    },
  };
};
export default useTodos;
