import React from "react";
import { renderWithProvider } from "src/tests/tetutils";
import Top from "src/pages/Top";

jest.mock("src/components/templates/Profile", () => () => <div>Profile</div>);

test("Top expect to match snapshot", () => {
    const target = renderWithProvider(<Top />);
    expect(target).toMatchSnapshot();
});
