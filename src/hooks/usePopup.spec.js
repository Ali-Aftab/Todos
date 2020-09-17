import { renderHook, act } from "@testing-library/react-hooks";

import usePopup from "./usePopup";

describe("Popup", () => {
  it("should initialize without any errors", async () => {
    const { result } = renderHook(() => usePopup());

    expect(typeof result.current.closePopup).toBe("function");
  });
  it("should set the default to false for the Popup", async () => {
    const { result } = renderHook(() => usePopup());

    expect(result.current.isError).toBe(false);
  });

  it("should set isError to false after the Popup closes", async () => {
    const { result } = renderHook(() => usePopup());

    act(() => {
      result.current.setisError(true);
    });

    expect(result.current.isError).toBe(true);

    act(() => {
      result.current.closePopup();
    });
    expect(result.current.isError).toBe(false);
  });
});
