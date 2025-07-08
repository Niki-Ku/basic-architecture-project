  import React from "react";
  import { render, screen } from "../../test-utils";
  import user from "@testing-library/user-event";
  import "@testing-library/jest-dom/extend-expect";
  import Header from "./Header";
  import { links, unauthorizedLinks } from "../../config/routeConfig";
  import { MockAuthProvider } from "../../context/MockAuthProvider";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockNavigate,
}));

const loggedInUser = {
	userLoggedIn: true,
	currentUser: { email: "test@example.com" },
	loading: false,
};

const loggedOutUser = {
	userLoggedIn: false,
	currentUser: { email: "test@example.com" },
	loading: false,
};

describe("<Header />", () => {
	test("renders Header with Logo, Links and toggle button when user is logged out", () => {
		render(
			<MockAuthProvider value={loggedOutUser}>
				<Header darkMode="dark" handleDarkModeChange={jest.fn()} />
			</MockAuthProvider>
		);

		const signOutButton = screen.queryByRole("button", { name: /sign-out/i });
		expect(signOutButton).not.toBeInTheDocument();
		expect(screen.getByAltText(/netflix logo/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /main menu/i })
		).toBeInTheDocument();

		expect(screen.getByRole("checkbox")).toBeInTheDocument();

		unauthorizedLinks.forEach((link) => {
			expect(screen.getByText(link.name)).toBeInTheDocument();
		});
	});

	test("renders Header with Logo, Links and toggle button when user is logged in", () => {
		render(
			<MockAuthProvider value={loggedInUser}>
				<Header darkMode="dark" handleDarkModeChange={jest.fn()} />
			</MockAuthProvider>
		);

		expect(screen.getByAltText(/netflix logo/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /main menu/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /sign-out/i })
		).toBeInTheDocument();
		expect(screen.getByRole("checkbox")).toBeInTheDocument();

		links.forEach((link) => {
			expect(screen.getByText(link.name)).toBeInTheDocument();
		});
	});

	test("calls 'navigate' and 'doSignOut' functions on Log Out button click", async () => {
		render(
			<MockAuthProvider value={loggedInUser}>
				<Header darkMode="dark" handleDarkModeChange={jest.fn()} />
			</MockAuthProvider>
		);

		const signOutButton = screen.getByRole("button", { name: /sign-out/i });
		await user.click(signOutButton);

		expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
  
	test("adds 'overflow-hidden' to body when burger menu is opened", async () => {
		render(
			<MockAuthProvider value={loggedOutUser}>
				<Header darkMode="dark" handleDarkModeChange={jest.fn()} />
			</MockAuthProvider>
		);

    const burgerButton = screen.getByRole("button", { name: /main menu/i });
    
		await user.click(burgerButton);
    expect(document.body.classList.contains("overflow-hidden")).toBe(true);
    
		await user.click(burgerButton);
		expect(document.body.classList.contains("overflow-hidden")).toBe(false);
	});
});
