import React from "react";
import { render, screen } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import LanguageSwitcher from "./LanguageSwitcher";
import i18n from "../../testI18n";
import { TFunction } from "i18next";

describe("<LanguageSwitcher/>", () => {
	test("renders correctly", () => {
		render(<LanguageSwitcher />);

		expect(
			screen.getByRole("button", { name: /chooseLanguage/i })
		).toBeInTheDocument();
	});

	test("renders all items after click", async () => {
		render(<LanguageSwitcher />);

		const toggleSwitcherButton = screen.getByRole("button", {
			name: /chooseLanguage/i,
		});
		await user.click(toggleSwitcherButton);

		expect(screen.getAllByRole("option")).toHaveLength(4);

		await user.click(toggleSwitcherButton);
		expect(screen.queryAllByRole("option")).toHaveLength(0);
	});

	test("calls change language function after click", async () => {
		const changeLanguageSpy = jest
			.spyOn(i18n, "changeLanguage")
			.mockResolvedValue(((key: string) => key) as TFunction);
		render(<LanguageSwitcher />);

		const toggleSwitcherButton = screen.getByRole("button", {
			name: /chooseLanguage/i,
		});
		await user.click(toggleSwitcherButton);

		const enButton = screen.getByRole("option", { name: "en" });

		await user.click(enButton);
		expect(changeLanguageSpy).toBeCalledWith("en");
		expect(changeLanguageSpy).toHaveBeenCalledTimes(1);
		expect(screen.queryAllByRole("option")).toHaveLength(0);

		changeLanguageSpy.mockRestore();
	});

	test("logs error and keeps dropdown open if language change fails", async () => {
		const changeLanguageSpy = jest
			.spyOn(i18n, "changeLanguage")
      .mockRejectedValue(new Error("test error"));
    
    const spyOnConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});

		render(<LanguageSwitcher />);

		const toggleSwitcherButton = screen.getByRole("button", {
			name: /chooseLanguage/i,
    });
    
		await user.click(toggleSwitcherButton);
		const enButton = screen.getByRole("option", { name: "en" });
    await user.click(enButton);
    
    expect(changeLanguageSpy).toHaveBeenCalledTimes(1);
    expect(spyOnConsoleLog).toHaveBeenCalledTimes(1);
    expect(spyOnConsoleLog).toHaveBeenLastCalledWith("Error changing language");
		expect(screen.queryAllByRole("option")).toHaveLength(4);

    changeLanguageSpy.mockRestore();
    spyOnConsoleLog.mockRestore();
	});
});
