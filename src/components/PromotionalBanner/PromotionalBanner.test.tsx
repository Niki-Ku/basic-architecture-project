import React from "react";
import { render, screen } from "../../test-utils";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import PromotionalBanner from "./PromotionalBanner";

describe("<PromotionalBanner />", () => {
	test("renders correctly", () => {
		render(<PromotionalBanner alt="Movie banner" onCloseClick={() => {}} />);

		expect(screen.getByAltText(/movie banner/i)).toBeInTheDocument();
	});

	test("onCloseClick works correctly", async () => {
		const testFn = jest.fn();
		render(<PromotionalBanner alt="Movie banner" onCloseClick={testFn} />);
		const closeButton = screen.getByRole("button");
		await user.click(closeButton);

		expect(testFn).toBeCalledTimes(1);
	});
});
