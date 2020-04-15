import React from "react";
import App from "src/pages/App";
import { renderWithProvider } from "../tetutils";

test("App expect to match snapshot", () => {
    const target = renderWithProvider(<App />);
    expect(target).toMatchSnapshot();
});
