import React from "react";
import { render, screen } from "../../test-utils";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import CookieConsentBanner from "./CookieConsentBanner";

describe("<CookieConsentBanner />", () => {
	test("renders correctly", () => {
		render(
			<CookieConsentBanner onAcceptClick={() => {}} onDeclineClick={() => {}} />
		);

		expect(
			screen.getByRole("heading", { name: /weValueYourPrivacy/i })
		).toBeInTheDocument();
		expect(screen.getByText(/cookieUsageNotice/i)).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /accept/i })).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /decline/i })
		).toBeInTheDocument();
	});

	test("click functions works corretly", async () => {
		const acceptFunction = jest.fn();
		const declineFunction = jest.fn();
		render(
			<CookieConsentBanner
				onAcceptClick={acceptFunction}
				onDeclineClick={declineFunction}
			/>
		);

		const acceptButton = screen.getByRole("button", { name: /accept/i });
		const declineButton = screen.getByRole("button", { name: /decline/i });

		await user.click(acceptButton);
		await user.click(declineButton);

		expect(acceptFunction).toBeCalledTimes(1);
		expect(declineFunction).toBeCalledTimes(1);
	});
});
