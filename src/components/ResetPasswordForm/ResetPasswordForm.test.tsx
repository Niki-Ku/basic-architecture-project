import React from "react";
import { render, screen } from "../../test-utils";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import ResetPasswordForm from "./ResetPasswordForm";
import { doPasswordReset } from "../../services/firebaseAuth";

jest.mock("../../services/firebaseAuth", () => ({
	doPasswordReset: jest.fn(),
}));

describe("<ResetPasssordForm />", () => {
	test("renders correctly", () => {
		const setIsSendResetMock = jest.fn();
		render(<ResetPasswordForm setIsSendReset={setIsSendResetMock} />);

		expect(screen.getByRole("textbox")).toBeInTheDocument();
		expect(screen.queryByText("error")).not.toBeInTheDocument();
		expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
	});

	test("displays text correctly", async () => {
		const setIsSendResetMock = jest.fn();
		render(<ResetPasswordForm setIsSendReset={setIsSendResetMock} />);

		const input = screen.getByRole("textbox");
		await user.type(input, "some text");
		expect(input).toHaveValue("some text");
	});

  test("displays error if email is incorrect", async () => {
    jest.spyOn(console, "log").mockImplementation(() => {});
		(doPasswordReset as jest.Mock).mockRejectedValue({
			code: "auth/user-not-found",
		});
		const setIsSendResetMock = jest.fn();
		render(<ResetPasswordForm setIsSendReset={setIsSendResetMock} />);

		const input = screen.getByRole("textbox");
		const submitButton = screen.getByRole("button", { name: /send/i });

		await user.type(input, "some text");
		await user.click(submitButton);

		expect(setIsSendResetMock).toBeCalledTimes(0);
		expect(screen.getByText("auth/user-not-found")).toBeInTheDocument();
	});

	test("works as expected when email is valid", async () => {
		(doPasswordReset as jest.Mock).mockResolvedValue("");
		const setIsSendResetMock = jest.fn();

		render(<ResetPasswordForm setIsSendReset={setIsSendResetMock} />);

		const input = screen.getByRole("textbox");
		const submitButton = screen.getByRole("button", { name: /send/i });

		await user.type(input, "some text");
		await user.click(submitButton);

		expect(setIsSendResetMock).toBeCalledTimes(1);
		expect(setIsSendResetMock).toBeCalledWith(true);
		expect(screen.queryByText("auth/user-not-found")).not.toBeInTheDocument();
	});

	test("does nothing when input is empty", async () => {
		(doPasswordReset as jest.Mock).mockResolvedValue("");
		const setIsSendResetMock = jest.fn();

		render(<ResetPasswordForm setIsSendReset={setIsSendResetMock} />);

		const submitButton = screen.getByRole("button", { name: /send/i });

		await user.click(submitButton);

		expect(setIsSendResetMock).toBeCalledTimes(0);
		expect(screen.queryByText("auth/user-not-found")).not.toBeInTheDocument();
	});

	test("shows loading state during request", async () => {
		let resolveFn!: (value?: unknown) => void;

		(doPasswordReset as jest.Mock).mockImplementation(
			() =>
				new Promise((res) => {
					resolveFn = res;
				})
		);

		render(<ResetPasswordForm setIsSendReset={() => {}} />);
		const input = screen.getByRole("textbox");
		const button = screen.getByRole("button", { name: /send/i });

		await user.type(input, "user@email.com");
		await user.click(button);

		expect(screen.getByText(/loading/i)).toBeInTheDocument();

		resolveFn();
		await screen.findByRole("textbox");
	});
});
