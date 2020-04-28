import React from "react";
import Target from "src/pages/Sorts/Select/Select";
import { renderWithProvider } from "src/tests/tetutils";
import { getDisplayName } from "src/utils/ComponentUtils";

test(`${getDisplayName(Target)} expect to match snapshot`, () => {
    const target = renderWithProvider(<Target />);
    expect(target).toMatchSnapshot();
});
