import React, { memo } from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

const AddTodo = memo((props) => (
  <Paper style={{ margin: 16, padding: 16 }}>
    <Grid container>
      <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
        <TextField
          placeholder={`${props.scenario} Todo here`}
          value={props.inputValue}
          onChange={props.onInputChange}
          onKeyPress={props.onInputKeyPress}
          fullWidth
        />
      </Grid>
      <Grid xs={2} md={1} item>
        <Button
          data-testid="add-todo-button"
          fullWidth
          color="secondary"
          variant="outlined"
          onClick={props.onButtonClick}
        >
          {props.scenario}
        </Button>
      </Grid>
    </Grid>
  </Paper>
));

export default AddTodo;
