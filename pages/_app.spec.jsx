import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import ReactDOM from "react-dom";

import App from "./_app.jsx";
import TodoList from "../src/components/TodoList";

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

describe("App", () => {
  it("should render without errors", async () => {
    render(
      <MockedProvider>
        <App Component={() => <TodoList />} pageProps={{ items }} />
      </MockedProvider>
    );
  });
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MockedProvider>
        <App Component={() => <TodoList />} pageProps={{ items }} />
      </MockedProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
