import React from "react";
import { render, screen } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import FilmCardImage from "./FilmCardImage";

const imgSrcMock: string = "/TXSxV23MWYkezZ3219gtgcSX6n.jpg";

describe("<FilmCardImage />", () => {
	test("renders correctly with image set", () => {
		render(<FilmCardImage posterUrl={imgSrcMock} title="Test" />);

		expect(
			screen.getByRole("img", { name: /test movie/i })
		).toBeInTheDocument();
	});

	test("renders correctly without image set", () => {
		render(<FilmCardImage title="Test" />);

		expect(
			screen.getByRole("img", { name: /test movie/i })
		).toBeInTheDocument();
	});

	test("renders correctly without image and title set", () => {
		render(<FilmCardImage />);

		expect(screen.getByRole("img", { name: /no_data/i })).toBeInTheDocument();
	});
});
