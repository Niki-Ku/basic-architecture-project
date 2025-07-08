import React, { useState } from "react";
import { render, screen, waitFor } from "../../test-utils";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { links } from "../../config/routeConfig";
import SearchBar from "./SearchBar";

describe("<Searchbar />", () => {
	const onQueryChangeMock = jest.fn();
	const onSubmitMock = jest.fn();
	afterEach(() => jest.clearAllMocks());

	test("renders correctly", () => {
		render(
			<SearchBar
				query=""
				onQueryChange={onQueryChangeMock}
				onSubmit={onSubmitMock}
				placeholder="Test"
				links={links}
			/>
		);

		expect(screen.getByRole("searchbox")).toBeInTheDocument();
	});

	test("calls on submit function", async () => {
		const Wrapper = () => {
			const [query, setQuery] = useState("");
			return (
				<SearchBar
					query={query}
					onQueryChange={setQuery}
					onSubmit={onSubmitMock}
					placeholder="Test"
					links={links}
				/>
			);
		};

		render(<Wrapper />);

		const inputField = screen.getByRole("searchbox");
		await user.type(inputField, "home{enter}");

		expect(onSubmitMock).toBeCalledTimes(1);
	});

	test("displays search values if query matches link's names", async () => {
		const Wrapper = () => {
			const [query, setQuery] = useState("");
			return (
				<SearchBar
					query={query}
					onQueryChange={setQuery}
					onSubmit={onSubmitMock}
					placeholder="Test"
					links={links}
				/>
			);
		};

		render(<Wrapper />);
		const inputField = screen.getByRole("searchbox");

		await user.type(inputField, "home");

		await waitFor(() => {
			expect(screen.getByText(/home/i)).toBeInTheDocument();
		});
		await waitFor(() => {
			expect(screen.queryByText(/user/i)).not.toBeInTheDocument();
		});
		await waitFor(() => {
			expect(screen.queryByText(/search/i)).not.toBeInTheDocument();
		});
	});

	test("removes search values if click was outside of the searchbar", async () => {
		const Wrapper = () => {
			const [query, setQuery] = useState("");
			return (
				<>
					<div data-testid="simulate-out-click"></div>
					<SearchBar
						query={query}
						onQueryChange={setQuery}
						onSubmit={onSubmitMock}
						placeholder="Test"
						links={links}
					/>
				</>
			);
		};

		render(<Wrapper />);
		const inputField = screen.getByRole("searchbox");
		const outsideElement = screen.getByTestId("simulate-out-click");

		await user.type(inputField, "home");

		await waitFor(() => {
			expect(screen.getByText(/home/i)).toBeInTheDocument();
		});

		await user.click(outsideElement);

		await waitFor(() => {
			expect(screen.queryByText(/home/i)).not.toBeInTheDocument();
		});
	});
});
