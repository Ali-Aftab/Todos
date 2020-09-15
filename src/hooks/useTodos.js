import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
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
const errorResponseFeedback = (error) => ({
  response: "error",
  message: error.graphQLErrors[0].message,
});
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

  const [searchResult, setSearchResult] = useState(todos);

  return {
    todos,
    searchResult,
    addTodo: async (text) => {
      try {
        await useAddTodoMutation({
          variables: { text },
        });
      } catch (error) {
        return errorResponseFeedback(error);
      }
      await refetch();
    },
    checkTodo: async (idx) => {
      const { text } = todos[idx];
      await useCheckTodoMutation({
        variables: { text },
      });
      await refetch();
    },
    removeTodo: async (idx) => {
      const { text } = todos[idx];
      await useRemoveTodoMutation({
        variables: { text },
      });
      await refetch();
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
