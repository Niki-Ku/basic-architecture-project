import React from "react";
import { render, screen } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import DropdownItems from "./DropdownItems";
import { accountSettingsDropdown } from "../../config/helpCenterConfig";

describe("<DropdownItems />", () => {
	test("renders corretcly", () => {
		render(<DropdownItems links={accountSettingsDropdown} />);
		const list = screen.getByRole("list");
		const allItems = screen.getAllByRole("listitem");
		expect(list).toBeInTheDocument();
		expect(allItems).toHaveLength(accountSettingsDropdown.subCategories.length);
	});
});
