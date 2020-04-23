import React from "react";
import Gnome from "src/pages/Sorts/Gnome/Gnome";
import { renderWithProvider } from "src/tests/tetutils";

test("Gnome expect to match snapshot", () => {
    const target = renderWithProvider(<Gnome />);
    expect(target).toMatchSnapshot();
});
