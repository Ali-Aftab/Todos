import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Scenario from "./Scenario";

let props = {
  scenario: "Add",
  handleScenario: (e) => {
    scenario = e.target.name;
  },
};

describe("Scenario", () => {
  let props = {
    scenario: "Add",
    handleScenario: (e) => {
      scenario = e.target.name;
    },
  };
  it("should render without errors", async () => {
    render(<Scenario scenario={props.scenario} />);
  });

  it("Scenario should change when a user clicks on the toggle", async () => {
    let scenario = "Add";
    const handleScenario = (e) => {
      scenario = e.target.value;
    };

    render(<Scenario scenario={scenario} handleScenario={handleScenario} />);

    const searchButton = await screen.findByTestId("search-scenario-button");

    fireEvent.click(searchButton);
    expect(scenario).toEqual("Search");
  });
});
