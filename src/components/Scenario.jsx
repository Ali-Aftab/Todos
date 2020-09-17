import React, { useState } from "react";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import PostAddIcon from "@material-ui/icons/PostAdd";
import FindInPageIcon from "@material-ui/icons/FindInPage";

const Scenario = (props) => {
  return (
    <ToggleButtonGroup
      value={props.scenario}
      exclusive
      onChange={props.handleScenario}
      aria-label="Scenario"
    >
      <ToggleButton value="Add" data-testid="add-scenario-button">
        <PostAddIcon />
      </ToggleButton>
      <ToggleButton value="Search" data-testid="search-scenario-button">
        <FindInPageIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default Scenario;
