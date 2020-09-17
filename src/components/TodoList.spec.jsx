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
// let onItemRemove = (idx) => {
//   items.splice(idx, 1);
// };
// let onItemCheck = (idx) => {
//   const task = items[idx];
//   if (task[idx] === true) {
//     task[idx] = false;
//   } else {
//     task[idx] = true;
//   }
// };

describe("TodoList", () => {
  it("should render without errors", async () => {
    render(<TodoList items={items} />);

    const renderResult = await screen.findByText("Drink a glass of water");

    expect(typeof renderResult).toEqual("object");
  });

  //   it("should remove item from list", async () => {
  //     render(<TodoList items={items} onItemCheck={onItemRemove} />)
  //   });
});
