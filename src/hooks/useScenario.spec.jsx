import { renderHook, act } from "@testing-library/react-hooks";

import useScenario from "./useScenario";

describe("Scenario", () => {
  it("should initialize without errors", async () => {
    const { result } = renderHook(() => useScenario());

    expect(typeof result.current.handleScenario).toBe("function");
  });

  it("should set the default Scenario to Add", async () => {
    const { result } = renderHook(() => useScenario());

    expect(result.current.scenario).toBe("Add");
  }),
    it("should change scenario when handleScenario activates", async () => {
      const { result } = renderHook(() => useScenario());
      expect(result.current.scenario).toBe("Add");

      act(() => {
        result.current.handleScenario(null, "Search");
      });

      expect(result.current.scenario).toBe("Search");
    });
});
