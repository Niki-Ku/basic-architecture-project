import React from "react";
import { render, screen } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import HideShowPassButton from "./HideShowPassButton";

describe("<HideShowPassButton />", () => {
	test("renders correctly with password type 'password'", () => {
		const mockSetPasswordType = jest.fn();

		render(
			<HideShowPassButton
				passwordType="password"
				setPasswordType={mockSetPasswordType}
			/>
		);

		expect(
			screen.getByRole("button", { name: /show-hide-password/i })
		).toBeInTheDocument();
		expect(screen.getByTestId("icon-show")).toBeInTheDocument();
		expect(screen.queryByTestId("icon-hide")).not.toBeInTheDocument();
	});

	test("renders correctly with password type 'text'", () => {
		const mockSetPasswordType = jest.fn();

		render(
			<HideShowPassButton
				passwordType="text"
				setPasswordType={mockSetPasswordType}
			/>
		);

		expect(screen.getByTestId("icon-hide")).toBeInTheDocument();
		expect(screen.queryByTestId("icon-show")).not.toBeInTheDocument();
	});

	test("triggers setPasswordType correctly", async () => {
		const mockSetPasswordType = jest.fn();

		render(
			<HideShowPassButton
				passwordType="password"
				setPasswordType={mockSetPasswordType}
			/>
		);

		const button = screen.getByRole("button", { name: /show-hide-password/i });
		await user.click(button);

		expect(mockSetPasswordType).toHaveBeenCalledTimes(1);
		expect(mockSetPasswordType).toHaveBeenCalledWith(expect.any(Function));

		const toggleFn = mockSetPasswordType.mock.calls[0][0];

		expect(toggleFn("password")).toBe("text");
		expect(toggleFn("text")).toBe("password");
	});
});
