import React from "react";
import { render, screen } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import DisplayFooterLinks from "./DisplayFooterLinks";
import { footerLinks } from "../../config/routeConfig";

describe("<DisplayFooterLinks />", () => {
	test("renders correctly", () => {
		render(<DisplayFooterLinks />);

		const allLinks = screen.getAllByRole("listitem");
		expect(allLinks).toHaveLength(footerLinks.length);
		expect(screen.getByRole("list")).toBeInTheDocument();
	});

	test("links work correctly", async () => {
		window.scrollTo = jest.fn();
		render(<DisplayFooterLinks />);

		const faqLink = screen.getByRole("link", { name: /faq/i });
		await user.click(faqLink);
		expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 });
	});
});
