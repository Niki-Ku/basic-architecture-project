import React from "react";
import { render, screen } from "../../../test-utils";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import DisplayLanguages from "./DisplayLanguages";

describe("<DisplayLanguages/>", () => {
	test("renders correctly with 'en' as selected language", () => {
		const languageClickMock = jest.fn();
		render(
			<DisplayLanguages language="en" handleLanguageClick={languageClickMock} />
		);

		const languageItems = screen.getAllByRole("option");
		expect(languageItems[0]).toHaveAttribute("aria-selected", "true");

		languageItems.slice(1).forEach((item) => {
			expect(item).toHaveAttribute("aria-selected", "false");
		});
	});

	test("calls handler with correct language on click", async () => {
		const languageClickMock = jest.fn();
		render(
			<DisplayLanguages language="en" handleLanguageClick={languageClickMock} />
		);

		const ukLanguageItem = screen.getAllByRole("option")[1];
		await user.click(ukLanguageItem);

		expect(languageClickMock).toHaveBeenCalledWith("uk");
		expect(languageClickMock).toHaveBeenCalledTimes(1);
	});
});
