import React from "react";
import { render, screen, waitFor } from "../../test-utils";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import SignUpForm from "./SignUpForm";
import { doCreateUserWithEmailAndPassword } from "../../services/firebaseAuth";
import { addToDb } from "../../helpers/firebaseUtils";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: jest.fn(),
}));

jest.mock("../../services/firebaseAuth", () => ({
	doCreateUserWithEmailAndPassword: jest.fn(),
}));

jest.mock("../../helpers/firebaseUtils", () => ({
	addToDb: jest.fn(),
}));

afterEach(() => {
	jest.clearAllMocks();
});

describe("<SignUpForm />", () => {
	test("renders correctly", () => {
		render(<SignUpForm />);

		expect(screen.getByRole("textbox", { name: "email" })).toBeInTheDocument();
		expect(screen.getByRole("textbox", { name: "name" })).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "register" })
		).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "register" })).toBeDisabled();
		expect(screen.getByRole("checkbox")).toBeInTheDocument();
		expect(screen.getByLabelText("password")).toBeInTheDocument();
		expect(screen.getByLabelText("repeat-password")).toBeInTheDocument();
		expect(screen.getByLabelText(/i-agree-to/i)).toBeInTheDocument();
	});

	test("displays errors if fields are empty, and checkbox is checked", async () => {
		(doCreateUserWithEmailAndPassword as jest.Mock).mockResolvedValue(() => {});
		render(<SignUpForm />);

		const submitButton = screen.getByRole("button", { name: "register" });
		const checkboxButton = screen.getByRole("checkbox");

		await user.click(checkboxButton);
		await user.click(submitButton);

		expect(screen.getByText(/email required/i)).toBeInTheDocument();
		expect(screen.getByText(/name required/i)).toBeInTheDocument();
		expect(screen.getByText("password required")).toBeInTheDocument();
		expect(screen.getByText("repeat password required")).toBeInTheDocument();
		expect(doCreateUserWithEmailAndPassword).toHaveBeenCalledTimes(0);
	});

	test("displays specific errors if fields are filled with invalid characters, and checkbox is checked", async () => {
		(doCreateUserWithEmailAndPassword as jest.Mock).mockResolvedValue(() => {});
		render(<SignUpForm />);

		const submitButton = screen.getByRole("button", { name: "register" });
		const checkboxButton = screen.getByRole("checkbox");
		const emailField = screen.getByRole("textbox", { name: "email" });
		const nameField = screen.getByRole("textbox", { name: "name" });
		const passwordField = screen.getByLabelText("password");
		const passwordRepeatField = screen.getByLabelText("repeat-password");

		await user.type(emailField, "ajsklf");
		await user.type(nameField, "a");
		await user.type(passwordField, "ajsklf");
		await user.type(passwordRepeatField, "ajsklllf");
		await user.click(checkboxButton);
		await user.click(submitButton);

		expect(screen.getByText("email-error")).toBeInTheDocument();
		expect(screen.getByText("name-min")).toBeInTheDocument();
		expect(screen.getByText("password-error")).toBeInTheDocument();
		expect(screen.getByText("password-repeat-error")).toBeInTheDocument();
		expect(doCreateUserWithEmailAndPassword).toHaveBeenCalledTimes(0);
	});

	test("displays error if firebase error occured", async () => {
		jest.spyOn(console, "log").mockImplementation(() => {});
		(doCreateUserWithEmailAndPassword as jest.Mock).mockRejectedValue({
			code: "some-error",
		});

		render(<SignUpForm />);

		const submitButton = screen.getByRole("button", { name: "register" });
		const checkboxButton = screen.getByRole("checkbox");
		const emailField = screen.getByRole("textbox", { name: "email" });
		const nameField = screen.getByRole("textbox", { name: "name" });
		const passwordField = screen.getByLabelText("password");
		const passwordRepeatField = screen.getByLabelText("repeat-password");

		await user.type(emailField, "ajsklf.f@gmail.com");
		await user.type(nameField, "saflsjfd");
		await user.type(passwordField, "ajsS$k3d");
		await user.type(passwordRepeatField, "ajsS$k3d");
		await user.click(checkboxButton);
		await user.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText(/some-error/i)).toBeInTheDocument();
		});
		expect(submitButton).not.toBeInTheDocument();
	});

	test("calls navigate function if everything went good", async () => {
		const mockNavigate = jest.fn();
		(doCreateUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
			user: { uid: "mock-uid", email: "test@example.com" },
		});
		(addToDb as jest.Mock).mockResolvedValue(() => {});
		(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

		render(<SignUpForm />);

		const submitButton = screen.getByRole("button", { name: "register" });
		const checkboxButton = screen.getByRole("checkbox");
		const emailField = screen.getByRole("textbox", { name: "email" });
		const nameField = screen.getByRole("textbox", { name: "name" });
		const passwordField = screen.getByLabelText("password");
		const passwordRepeatField = screen.getByLabelText("repeat-password");

		await user.type(emailField, "ajsklf.f@gmail.com");
		await user.type(nameField, "saflsjfd");
		await user.type(passwordField, "ajsS$k3d");
		await user.type(passwordRepeatField, "ajsS$k3d");
		await user.click(checkboxButton);
		await user.click(submitButton);

		expect(mockNavigate).toHaveBeenLastCalledWith("/");
		expect(mockNavigate).toHaveBeenCalledTimes(1);
	});

	test("renders 'loading, when request is in process", async () => {
		const mockNavigate = jest.fn();
		let customResolver: () => void;
		const pendingPromise = new Promise<void>((resolve) => {
			customResolver = resolve;
    });
    
		(doCreateUserWithEmailAndPassword as jest.Mock).mockReturnValue(
			pendingPromise
		);
		(addToDb as jest.Mock).mockResolvedValue(() => {});
		(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

		render(<SignUpForm />);

		const submitButton = screen.getByRole("button", { name: "register" });
		const checkboxButton = screen.getByRole("checkbox");
		const emailField = screen.getByRole("textbox", { name: "email" });
		const nameField = screen.getByRole("textbox", { name: "name" });
		const passwordField = screen.getByLabelText("password");
		const passwordRepeatField = screen.getByLabelText("repeat-password");

		await user.type(emailField, "ajsklf.f@gmail.com");
		await user.type(nameField, "saflsjfd");
		await user.type(passwordField, "ajsS$k3d");
		await user.type(passwordRepeatField, "ajsS$k3d");
		await user.click(checkboxButton);
		await user.click(submitButton);

		expect(screen.getByText(/loading/i)).toBeInTheDocument();
		customResolver!();
		await pendingPromise;

		await waitFor(() => {
			expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
		});

		expect(mockNavigate).toHaveBeenLastCalledWith("/");
		expect(mockNavigate).toHaveBeenCalledTimes(1);
	});
});
