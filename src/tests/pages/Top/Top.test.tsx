import { render } from "@testing-library/react";
import React from "react";
import Top from "src/pages/Top";

jest.mock("src/components/templates/Profile", () => {
    const Profile = () => <div>Profile</div>;
    return Profile;
});

test("Top expect to match snapshot", () => {
    expect(render(<Top />)).toMatchSnapshot();
});
