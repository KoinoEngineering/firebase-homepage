import React from "react";
import Bubble from "src/pages/Sorts/Bubble/Bubble";
import { renderWithProvider } from "src/tests/tetutils";

test("Bubble expect to match snapshot", () => {
    const target = renderWithProvider(<Bubble />);
    expect(target).toMatchSnapshot();
});
