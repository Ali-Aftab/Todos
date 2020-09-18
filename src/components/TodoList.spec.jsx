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

const removeTask = (id) => {
  items.splice(id, 1);
};

const toggleCheck = (id) => {
  let oneTask = items[id];
  if (oneTask.checked === true) {
    oneTask.checked = false;
  } else {
    oneTask.checked = true;
  }
};

describe("TodoList", () => {
  it("should render without errors", async () => {
    render(<TodoList items={items} />);

    const renderResult = await screen.findByText("Drink a glass of water");

    expect(typeof renderResult).toEqual("object");
  });
  it("should check a users task.", async () => {
    render(<TodoList items={items} onItemCheck={toggleCheck} />);

    const checkBox = await screen.findByTestId("todo-checked-Count to 8");

    fireEvent.click(checkBox);

    expect(items[2]).toEqual({
      text: "Count to 8",
      checked: false,
    });
  });
  it("should delete a users task.", async () => {
    render(<TodoList items={items} onItemRemove={removeTask} />);

    const deleteButton = await screen.findByTestId("todo-button-Count to 8");

    fireEvent.click(deleteButton);
    expect(items.length).toEqual(2);
  });
});
