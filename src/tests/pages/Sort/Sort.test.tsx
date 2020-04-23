import React from "react";
import { renderWithProvider } from "src/tests/tetutils";
import Sorts from "src/pages/Sorts";

test("Sorts expect to match snapshot", () => {
    const target = renderWithProvider(<Sorts />);
    expect(target).toMatchSnapshot();
});
