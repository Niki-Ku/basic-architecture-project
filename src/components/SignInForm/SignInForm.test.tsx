import React from "react";
import { render, screen } from "../../test-utils";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import SignInForm from "./SignInForm";
import { doSignInWithEmailAndPassword } from "../../services/firebaseAuth";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: jest.fn(),
}));

jest.mock("../../services/firebaseAuth", () => ({
	doSetPersistence: jest.fn(),
	doSignInWithEmailAndPassword: jest.fn(),
}));

jest.mock("react-google-recaptcha", () => () => (
	<div role="presentation">Mocked ReCAPTCHA</div>
));

afterEach(() => {
	jest.clearAllMocks();
});

describe("<SignInForm/>", () => {
	test("renders correctly", () => {
		render(<SignInForm />);

		expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
		expect(screen.getByLabelText("password")).toBeInTheDocument();
		expect(
			screen.getByRole("checkbox", { name: /remember-me/i })
		).toBeInTheDocument();
		expect(screen.getByText(/forgot-password/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /sign-in/i })
		).toBeInTheDocument();
		expect(screen.getByLabelText(/show-hide-password/i)).toBeInTheDocument();
	});

	test("renders email error message when email and password are not set", async () => {
		render(<SignInForm />);
		const submitButton = screen.getByRole("button", { name: /sign-in/i });

		await user.click(submitButton);

		expect(screen.getByText(/email required/i)).toBeInTheDocument();
		expect(screen.getByText(/password required/i)).toBeInTheDocument();
	});

	test("renders password error message when password is not set", async () => {
		render(<SignInForm />);
		const submitButton = screen.getByRole("button", { name: /sign-in/i });
		const emailInput = screen.getByRole("textbox", { name: /email/i });

		await user.type(emailInput, "some.validemail@gmail.com");
		await user.click(submitButton);

		expect(screen.queryByText(/email required/i)).not.toBeInTheDocument();
		expect(screen.getByText(/password required/i)).toBeInTheDocument();
	});

	test("renders email error message when email is not set", async () => {
		render(<SignInForm />);
		const submitButton = screen.getByRole("button", { name: /sign-in/i });
		const passwordInput = screen.getByLabelText("password");

		await user.type(passwordInput, "somepassword");
		await user.click(submitButton);

		expect(screen.queryByText(/password required/i)).not.toBeInTheDocument();
		expect(screen.getByText(/email required/i)).toBeInTheDocument();
	});

	test("renders 'invalid credentials' message when email or password are incorrect or doesn't exsists in DB", async () => {
		jest.spyOn(console, "log").mockImplementation(() => {});
		(doSignInWithEmailAndPassword as jest.Mock).mockRejectedValue({
			code: "invalid credentials",
		});
		render(<SignInForm />);
		const submitButton = screen.getByRole("button", { name: /sign-in/i });
		const passwordInput = screen.getByLabelText("password");
		const emailInput = screen.getByRole("textbox", { name: /email/i });

		await user.type(passwordInput, "somepassword");
		await user.type(emailInput, "some.valid@gmail.com");
		await user.click(submitButton);

		expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
	});

	test("navigates to homepage and logs user in when everything is okay", async () => {
		const mockNavigate = jest.fn();
		(doSignInWithEmailAndPassword as jest.Mock).mockResolvedValue(() => {});
		(useNavigate as jest.Mock).mockReturnValue(mockNavigate);
		render(<SignInForm />);

		const submitButton = screen.getByRole("button", { name: /sign-in/i });
		const passwordInput = screen.getByLabelText("password");
		const emailInput = screen.getByRole("textbox", { name: /email/i });

		await user.type(passwordInput, "somepassword");
		await user.type(emailInput, "some.valid@gmail.com");
		await user.click(submitButton);

		expect(mockNavigate).toHaveBeenCalledWith("/");
		expect(mockNavigate).toHaveBeenCalledTimes(1);
		expect(doSignInWithEmailAndPassword).toHaveBeenCalledTimes(1);
	});

	test("renders captcha after multiple failed attempts", async () => {
		(doSignInWithEmailAndPassword as jest.Mock).mockRejectedValue({
			code: "auth/invalid-credential",
		});

		render(<SignInForm />);

		const emailInput = screen.getByRole("textbox", { name: /email/i });
		const passwordInput = screen.getByLabelText("password");
		const submitButton = screen.getByRole("button", { name: /sign-in/i });

		await user.type(emailInput, "test@example.com");
		await user.type(passwordInput, "wrongpassword");

		await user.click(submitButton);
		await user.click(submitButton);
		await user.click(submitButton);

		expect(screen.getByRole("presentation")).toBeInTheDocument();
		expect(submitButton).toBeDisabled();
	});
});
