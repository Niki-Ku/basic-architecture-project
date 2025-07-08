import React from "react";
import { render, screen, waitFor } from "../../test-utils";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import SidebarDropdown from "./SidebarDropdown";
import { sidebarDropdownLinks } from "../../config/routeConfig";

beforeAll(() => {
	Element.prototype.scrollIntoView = jest.fn();
});

describe("<SidebarDropdown />", () => {
	const setActiveTopicMock = jest.fn();
	const allSectionsMock = [
		{
			id: "the-categories-of-personal-information-we-collect",
			scrollIntoView: jest.fn(),
		} as unknown as HTMLDivElement,
	];

	afterEach(() => jest.clearAllMocks());

	test("renders correctly", () => {
		render(
			<SidebarDropdown
				key={sidebarDropdownLinks[1].id}
				title={sidebarDropdownLinks[1].title}
				id={sidebarDropdownLinks[1].id}
				subLinks={sidebarDropdownLinks[1].subLinks}
				allSections={allSectionsMock}
				activeTopic={""}
				setActiveTopic={setActiveTopicMock}
				openSection={""}
			/>
		);

		expect(screen.getByText(sidebarDropdownLinks[1].title)).toBeInTheDocument();

		sidebarDropdownLinks[1].subLinks?.forEach((e) =>
			expect(screen.getByText(e.title)).not.toBeVisible()
		);
	});

	test("displays sublinks when openSection prop is set", () => {
		render(
			<SidebarDropdown
				key={sidebarDropdownLinks[1].id}
				title={sidebarDropdownLinks[1].title}
				id={sidebarDropdownLinks[1].id}
				subLinks={sidebarDropdownLinks[1].subLinks}
				allSections={allSectionsMock}
				activeTopic=""
				setActiveTopic={setActiveTopicMock}
				openSection={`${sidebarDropdownLinks[1].id}-dropdown`}
			/>
		);

		sidebarDropdownLinks[1].subLinks?.forEach((e) =>
			expect(screen.getByText(e.title)).toBeVisible()
		);
	});

	test("calls setActiveTopic function with proper value", async () => {
		render(
			<SidebarDropdown
				key={sidebarDropdownLinks[1].id}
				title={sidebarDropdownLinks[1].title}
				id={sidebarDropdownLinks[1].id}
				subLinks={sidebarDropdownLinks[1].subLinks}
				allSections={allSectionsMock}
				activeTopic=""
				setActiveTopic={setActiveTopicMock}
				openSection={`${sidebarDropdownLinks[1].id}-dropdown`}
			/>
		);

		const dropdown = screen.getByText(sidebarDropdownLinks[1].title);
		await user.click(dropdown);

		expect(setActiveTopicMock).toHaveBeenCalledTimes(1);
		expect(setActiveTopicMock).toHaveBeenCalledWith(sidebarDropdownLinks[1].id);
	});

	test("scrolls Element into view after click", async () => {
		const mockSection = document.createElement("div");
		mockSection.id = "the-categories-of-personal-information-we-collect";
		mockSection.scrollIntoView = jest.fn();
		const allSectionsMock = [mockSection];

		render(
			<SidebarDropdown
				key={sidebarDropdownLinks[1].id}
				title={sidebarDropdownLinks[1].title}
				id={sidebarDropdownLinks[1].id}
				subLinks={sidebarDropdownLinks[1].subLinks}
				allSections={allSectionsMock}
				activeTopic=""
				setActiveTopic={setActiveTopicMock}
				openSection=""
			/>
		);

		const firstElement = screen.getByText(
			sidebarDropdownLinks[1].subLinks![0].title
		);
    await user.click(firstElement);
    
		await waitFor(() => {
			expect(mockSection.scrollIntoView).toHaveBeenCalledTimes(1);
		});
	});
});
