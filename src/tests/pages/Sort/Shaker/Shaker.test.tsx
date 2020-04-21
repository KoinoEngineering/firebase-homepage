import React from "react";
import Shaker from "src/pages/Sorts/Shaker/Shaker";
import { renderWithProvider } from "src/tests/tetutils";

test("Shaker expect to match snapshot", () => {
    const target = renderWithProvider(<Shaker />);
    expect(target).toMatchSnapshot();
});
