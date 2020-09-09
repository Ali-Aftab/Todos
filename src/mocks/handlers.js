import { graphql } from 'msw';
import storage from 'localforage';

export const handlers = [
  graphql.query('listTodos', async (req, res, ctx) => {
    const todos = (await storage.getItem('todos')) || [];

    return res(
      ctx.data({
        listTodos: todos,
      })
    );
  }),

  graphql.mutation('addTodo', async (req, res, ctx) => {
    const { text } = req.variables;

    if (!text || !text.trim().length) {
      return res(
        ctx.errors([
          {
            message: 'Invalid todo. Todos must not be empty',
          },
        ])
      );
    }

    const todos = (await storage.getItem('todos')) || [];
    const dupe = todos.some((todo) => todo.text === text);

    if (dupe) {
      return res(
        ctx.errors([
          {
            message: 'Invalid todo. Todo already exists.',
          },
        ])
      );
    }

    const todo = {
      text,
      checked: false,
    };

    await storage.setItem('todos', [...todos, todo]);

    return res(
      ctx.data({
        addTodo: {
          __typename: 'Todo',
          ...todo,
        },
      })
    );
  }),

  graphql.mutation('checkTodo', async (req, res, ctx) => {
    const { text } = req.variables;

    const todos = (await storage.getItem('todos')) || [];
    const index = todos.findIndex((todo) => todo.text === text);

    const todo = {
      ...todos[index],
      checked: !todos[index].checked,
    };

    await storage.setItem('todos', [
      ...todos.slice(0, index),
      todo,
      ...todos.slice(index + 1),
    ]);

    return res(
      ctx.data({
        addTodo: {
          __typename: 'Todo',
          ...todo,
        },
      })
    );
  }),

  graphql.mutation('removeTodo', async (req, res, ctx) => {
    const { text } = req.variables;

    const todos = (await storage.getItem('todos')) || [];
    const index = todos.findIndex((todo) => todo.text === text);

    await storage.setItem('todos', [
      ...todos.slice(0, index),
      ...todos.slice(index + 1),
    ]);

    return res(
      ctx.data({
        addTodo: {
          __typename: 'Todo',
          ...todos[index],
        },
      })
    );
  }),
];
