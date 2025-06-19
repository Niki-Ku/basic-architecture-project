import React from "react";
import { render, screen } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import { accountSettingsDropdown } from "../../config/helpCenterConfig";
import DropdownCard from "./DropdownCard";

const mockCategories = [accountSettingsDropdown, accountSettingsDropdown];

describe("<DropdownCard />", () => {
	const handleClick = jest.fn();
	test("renders correctly", () => {
		render(
			<DropdownCard
				title="Test title"
				icon="RocketIcon"
				iconColor="red"
				open="any"
				handleDropdownClick={handleClick}
				categories={mockCategories}
			/>
		);
		expect(screen.getByText(/test title/i)).toBeInTheDocument();
		expect(screen.getByTestId("dropdown-icon")).toBeInTheDocument();
    expect(screen.getAllByTestId("dropdown-details")).toHaveLength(mockCategories.length);
	});
});
