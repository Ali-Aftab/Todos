import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import Document from "./_document.jsx";

describe("Document", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    render(
      <MockedProvider>
        <Document />
      </MockedProvider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should render the title", () => {
    render(<Document />);
    waitFor(() => {
      console.log(document.title, "DOCUMENT");
      expect(document.title).toEqual("test title");
    });
  });
});
