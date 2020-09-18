import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import ReactDOM from "react-dom";

import TodoApp from "./index";

describe("TodoApp", () => {
  it("renders without error", async () => {
    render(
      <MockedProvider>
        <TodoApp />
      </MockedProvider>
    );
    const scenarioButtonSearch = await screen.findByTestId(
      "search-scenario-button"
    );
    const scenarioButtonAdd = await screen.findByTestId("add-scenario-button");
    fireEvent.click(scenarioButtonSearch);
    const formButton = await screen.findByTestId("add-todo-button");
    expect(formButton).toHaveTextContent("Search");
    fireEvent.click(scenarioButtonAdd);
    expect(formButton).toHaveTextContent("Add");
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<TodoApp />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
