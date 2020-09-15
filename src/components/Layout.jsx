import React, { memo } from "react";
import { AppBar, Toolbar, Typography, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Scenario from "./Scenario";

const Layout = memo((props) => (
  <Paper
    elevation={0}
    style={{ padding: 0, margin: 0, backgroundColor: "#FAFAFA" }}
  >
    <AppBar color="primary" position="static" style={{ height: 64 }}>
      <Toolbar style={{ height: 64, justifyContent: "space-between" }}>
        <Typography color="inherit">TODO APP</Typography>
        <Scenario
          scenario={props.scenario}
          handleScenario={props.handleScenario}
        />
      </Toolbar>
    </AppBar>
    {props.children}
  </Paper>
));

export default Layout;
