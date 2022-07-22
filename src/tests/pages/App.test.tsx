import { render } from "@testing-library/react";
import React from "react";
import App from "src/pages/App";

jest.mock("src/components/templates/Profile", () => {
    const Profile = () => <div>Profile</div>;
    return Profile;
});

test("App expect to match snapshot", () => {
    expect(render(<App />)).toMatchSnapshot();
});
