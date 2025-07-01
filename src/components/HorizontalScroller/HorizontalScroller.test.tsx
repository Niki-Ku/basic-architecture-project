import React from "react";
import { Film, Genre } from "../../types/global";
import { render, screen } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import user from "@testing-library/user-event";
import HorizontalScroller from "./HorizontalScroller";

describe("HorizontalScroller", () => {
	const mockGenres: Genre[] = [{ id: 1, name: "Action" }];
	const mockUser = { uid: "123", name: "Test", watchList: [], docId: "abc" };
	const mockFilms: Film[] = [
		{
			id: "1",
			title: "Test Movie",
			poster_path: "img.jpg",
			genre_ids: [1],
			genres: mockGenres,
		},
	];

	beforeEach(() => {
		HTMLElement.prototype.getBoundingClientRect = jest.fn(() => ({
			width: 100,
			height: 100,
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			x: 0,
			y: 0,
			toJSON: () => {},
		}));
	});

	test("renders with heading and child components", () => {
		render(
			<HorizontalScroller
				films={mockFilms}
				genres={mockGenres}
				link="/somewhere"
				heading="popular"
				user={mockUser}
			/>
		);

		expect(screen.getByTestId("HorizontalScrollerLink")).toBeInTheDocument();
		expect(
			screen.getByTestId("HorizontalScrollerMoviesDisplay")
		).toBeInTheDocument();
		expect(screen.getByLabelText("slide-left")).toBeInTheDocument();
		expect(screen.getByLabelText("slide-right")).toBeInTheDocument();
	});

	test("calls scroll when left/right buttons are clicked, Chat GPT version", async () => {
		const scrollLeftSetter = jest.fn();
		let scrollLeftValue = 0;
		Object.defineProperty(HTMLElement.prototype, "scrollLeft", {
			set(value) {
				scrollLeftValue = value;
				scrollLeftSetter(value);
			},
			get() {
				return scrollLeftValue;
			},
			configurable: true,
		});

		render(
			<HorizontalScroller
				films={mockFilms}
				genres={mockGenres}
				heading="popular"
				user={mockUser}
				link="/some-link"
			/>
		);

		const leftButton = screen.getByLabelText(/slide-left/i);
		const rightButton = screen.getByLabelText(/slide-right/i);

		await user.click(rightButton);
		expect(scrollLeftSetter).toHaveBeenCalledTimes(1);
		expect(scrollLeftSetter).toHaveBeenCalledWith(100);

		await user.click(leftButton);
		expect(scrollLeftSetter).toHaveBeenCalledTimes(2);
		expect(scrollLeftSetter).toHaveBeenCalledWith(0);
	});

	test("calls scroll when left/right buttons are clicked", async () => {
		render(
			<HorizontalScroller
				films={mockFilms}
				genres={mockGenres}
				heading="popular"
				user={mockUser}
				link="/some-link"
			/>
		);

		const element = screen.getByTestId("HorizontalScrollerMoviesDisplay");
		Object.defineProperty(element, "scrollLeft", {
			writable: true,
			value: 0,
		});

		const leftButton = screen.getByLabelText(/slide-left/i);
		const rightButton = screen.getByLabelText(/slide-right/i);

		await user.click(rightButton);
		expect(element.scrollLeft).toBe(100);

		await user.click(leftButton);
		expect(element.scrollLeft).toBe(0);
	});
});
