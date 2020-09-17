import { useState } from "react";

const usePopup = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setisError] = useState(false);

  return {
    errorMessage,
    setErrorMessage,
    isError,
    setisError,
    closePopup: (event, reason) => {
      setisError(false);
    },
  };
};
