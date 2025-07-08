import React from "react";
import { render, screen } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import PasswordSentDisplay from "./PasswordSentDisplay";

describe("<PasswordSentDisplay/>", () => {
	test("renders the translated message and link", () => {
		render(<PasswordSentDisplay />);

		expect(screen.getByText("we-sent-you-letter")).toBeInTheDocument();

		const link = screen.getByRole("link", { name: "back-to-login-page" });
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/login");
	});

	test("scrolls to top when clicking the link", async () => {
		window.scrollTo = jest.fn();

		render(<PasswordSentDisplay />);

		const link = screen.getByRole("link", { name: "back-to-login-page" });

		await user.click(link);

		expect(window.scrollTo).toHaveBeenCalledWith({ top: 0 });
	});
});
