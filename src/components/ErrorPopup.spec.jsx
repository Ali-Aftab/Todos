import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import ErrorPopup from "./ErrorPopup";

let isError = true;
const errorMessage = "You got the error!";
const closePopup = (e) => {
  isError = false;
};

describe("ErrorPopup", () => {
  it("should render without errors", async () => {
    render(
      <ErrorPopup
        isError={isError}
        errorMessage={errorMessage}
        closePopup={closePopup}
      />
    );
    const message = await screen.findByText("You got the error!");
    expect(typeof message).toEqual("object");
  });
});
