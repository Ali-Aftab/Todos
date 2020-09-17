import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import TodoList from "./TodoList";

let items = [
  {
    text: "Go to Taco Bell 8 times this week",
    checked: true,
  },
  {
    text: "Drink a glass of water",
    checked: false,
  },
  {
    text: "Count to 8",
    checked: true,
  },
];

describe("TodoList", () => {
  it("should render without errors", async () => {
    render(<TodoList items={items} />);

    const renderResult = await screen.findByText("Drink a glass of water");

    expect(typeof renderResult).toEqual("object");
  });
});
