import React from "react";
import { render, screen } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import Dropdown from "./Dropdown";
import { accountSettingsDropdown } from "../../config/helpCenterConfig";

describe("<Dropdown />", () => {
	const handleClick = jest.fn();
	test("renders correctly in closed state", () => {
		render(
			<Dropdown
				links={accountSettingsDropdown}
				handleDropdownClick={handleClick}
				open="1"
				id="2"
			/>
		);

		const dropdown = screen.getByTestId("dropdown-details");
		expect(dropdown).toBeInTheDocument();
		expect(dropdown).not.toHaveAttribute("open");
	});

	test("renders correctly in opened state", () => {
		render(
			<Dropdown
				links={accountSettingsDropdown}
				handleDropdownClick={handleClick}
				open="1"
				id="1"
			/>
		);

		const dropdown = screen.getByTestId("dropdown-details");
		expect(dropdown).toHaveAttribute("open");
	});

	test("calls handleDropdownClick on click", async () => {
		render(
			<Dropdown
				links={accountSettingsDropdown}
				handleDropdownClick={handleClick}
				open="1"
				id="1"
			/>
		);

		const dropdown = screen.getByTestId("dropdown-details");
		await user.click(dropdown);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});
