import React from "react";
// import ReactDOM from 'react-dom';
import ListButton from "./ListButton.js";

import { render, fireEvent } from "react-testing-library";

describe("button tests", () => {
  test("button component renders with favourite button props", () => {
    const props = {
      data: {
        text: "Fave",
        icon: "+",
      },
      active: "fave",
    };

    render(<ListButton {...props} />);
  });

  test("button class is active when clicked", () => {
    const props = {
      data: {
        text: "Fave",
        icon: "+",
      },
      active: "Back",
    };

    const { getByText, container } = render(<ListButton {...props} />);
    const buttonNode = getByText(/Fave/i);

    // onClick is not a valid prop - this is a function passed down from App.js
    // - find a more straightforward / direct way of changing the classname from a prop,
    // - or some other sort of behaviour, like displaying text
    fireEvent.click(buttonNode);
    expect(container.firstChild.classList.contains("active")).toBe(true);
  });
});
