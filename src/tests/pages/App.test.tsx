import React from "react";
import App from "src/pages/App";
import { renderWithProvider } from "../tetutils";

jest.mock("src/components/templates/Profile", () => () => <div>Profile</div>);

test("App expect to match snapshot", () => {
    const target = renderWithProvider(<App />);
    expect(target).toMatchSnapshot();
});
