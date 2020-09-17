import { ApolloProvider } from "@apollo/client";
import { renderHook, act } from "@testing-library/react-hooks";
import client from "../api";
import useTodos from "./useTodos";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

describe("useTodos", () => {
  const wrapper = ({ children }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  );

  it("should initialize without errors", async () => {
    const { result } = renderHook(() => useTodos(), { wrapper });

    expect(result.current.todos).toStrictEqual([]);
    expect(typeof result.current.addTodo).toBe("function");
    expect(typeof result.current.checkTodo).toBe("function");
    expect(typeof result.current.removeTodo).toBe("function");
  });

  it("should add todos correctly.", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTodos(), {
      wrapper,
    });

    await act(async () => {
      await result.current.addTodo("hello");
    });

    expect(result.current.todos).toStrictEqual([
      { text: "hello", checked: false },
    ]);
  });

  it("should check/uncheck todos correctly", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTodos(), {
      wrapper,
    });

    await act(async () => {
      await result.current.addTodo("climb");
    });

    await act(async () => {
      await result.current.checkTodo(1);
    });

    await waitForNextUpdate();
    expect(result.current.todos[1]).toStrictEqual({
      text: "climb",
      checked: true,
    });

    await act(async () => {
      await result.current.checkTodo(1);
    });

    await waitForNextUpdate();
    expect(result.current.todos[1]).toStrictEqual({
      text: "climb",
      checked: false,
    });
  });

  it("should remove todos correctly.", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTodos(), {
      wrapper,
    });

    await act(async () => {
      await result.current.addTodo("read");
    });

    expect(result.current.todos.length).toStrictEqual(3);

    await act(async () => {
      await result.current.removeTodo(2);
    });
    await waitForNextUpdate();
    expect(result.current.todos.length).toStrictEqual(2);
  });

  it("should filter todos correctly.", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTodos(), {
      wrapper,
    });

    await act(async () => {
      const filterList = await result.current.searchTodo("ello");
      expect(filterList).toStrictEqual([{ text: "hello", checked: false }]);
    });
  });

  it("should provide error response feedback.", async () => {
    const { result } = renderHook(() => useTodos(), { wrapper });

    expect(
      result.current.errorResponseFeedback({
        graphQLErrors: [{ message: "You got an expected error" }],
      })
    ).toStrictEqual({
      response: "error",
      message: "You got an expected error",
    });
  });
});
