import { ApolloProvider } from "@apollo/client";
import { renderHook, act } from "@testing-library/react-hooks";
import client from "../api";
import useTodos from "./useTodos";

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
});
