import React from "react";
import { render, screen } from "../../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import HorizontalScrollerLink from "./HorizontalScrollerLink";

jest.mock("../../assets/icons/ArrowDownFull.svg", () => ({
	ReactComponent: () => <svg data-testid="arrow-icon" />,
}));

describe("<HorizontalScrollerLink />", () => {
	test("renders heading without link", () => {
		render(<HorizontalScrollerLink heading="Test Heading" />);

		expect(screen.getByText("Test Heading")).toBeInTheDocument();
		expect(screen.queryByRole("link")).not.toBeInTheDocument();
		expect(screen.queryByTestId("arrow-icon")).not.toBeInTheDocument();
	});

	test("renders heading as link with arrow icon", () => {
		render(<HorizontalScrollerLink heading="Movies" link="/movies" />);

		expect(screen.getByRole("link")).toHaveAttribute("href", "/movies");
		expect(screen.getByText("Movies")).toBeInTheDocument();
		expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
	});

	test("scrolls to top on click", async () => {
		const scrollToSpy = jest
			.spyOn(window, "scrollTo")
			.mockImplementation(() => {});

		render(<HorizontalScrollerLink heading="Films" link="/films" />);

		const link = screen.getByRole("link");
		await user.click(link);

		expect(scrollToSpy).toHaveBeenCalledWith({ top: 0 });

		scrollToSpy.mockRestore();
	});
});
