import React from "react";
import { renderWithProvider } from "src/tests/tetutils";
import Target from "src/pages/Sorts/Select/Select";

test(`${Target.displayName} expect to match snapshot`, () => {
    const target = renderWithProvider(<Target />);
    expect(target).toMatchSnapshot();
});
