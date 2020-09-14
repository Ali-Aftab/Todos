import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const ErrorPopup = (props) => {
  return (
    <Snackbar
      open={props.isError}
      autoHideDuration={6000}
      onClose={props.closePopup}
    >
      <Alert onClose={props.closePopup} severity="error">
        {props.errorMessage}
      </Alert>
    </Snackbar>
  );
};
export default ErrorPopup;
