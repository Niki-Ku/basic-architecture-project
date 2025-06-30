import React from "react";
import { render, screen } from "../../test-utils";
import { render as nativeRender } from "@testing-library/react";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import FilmCard from "./FilmCard";
import { MemoryRouter, useLocation } from "react-router-dom";

const cardDataTestObj = {
	title: "Test movie",
	poster_path: "test_path",
	genre_ids: [12, 3],
	genres: [{ id: 12, name: "comedy" }],
	id: "112",
};

const userTestObj = {
	name: "test user",
	uid: "jslf18",
	watchList: [],
	docId: "sdlk",
};

const genresTestObj = [
	{
		id: 12,
		name: "comedy",
	},
];

const LocationDisplay = () => {
	const location = useLocation();
	return <div data-testid="location">{location.pathname}</div>;
};

describe("<FilmCard />", () => {
	test("Renders correctly with required props only", () => {
		render(<FilmCard cardData={cardDataTestObj} link="some-movie" />);

		expect(screen.getByRole("img")).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: /test movie/i })
		).toBeInTheDocument();
	});

	test("Renders genres when its provided", () => {
		render(
			<FilmCard
				cardData={cardDataTestObj}
				link="some-movie"
				genres={genresTestObj}
			/>
		);

		expect(screen.getByRole("img")).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: /test movie/i })
		).toBeInTheDocument();
		expect(screen.getByText(/comedy/i)).toBeInTheDocument();
	});

	test("Renders bookmark button with user added", () => {
		render(
			<FilmCard
				cardData={cardDataTestObj}
				link="some-movie"
				user={userTestObj}
			/>
		);

		expect(screen.getByRole("img")).toBeInTheDocument();
		expect(
			screen.getByRole("heading", { name: /test movie/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /add-to-list/i })
		).toBeInTheDocument();
	});

	test("navigates to correct link when FilmCard is clicked", async () => {
		nativeRender(
			<MemoryRouter initialEntries={["/"]}>
				<FilmCard cardData={cardDataTestObj} link="/movie/1" />
				<LocationDisplay />
			</MemoryRouter>
		);

		await user.click(screen.getByText(/test movie/i));

		expect(screen.getByTestId("location")).toHaveTextContent("/movie/1");
	});
});
