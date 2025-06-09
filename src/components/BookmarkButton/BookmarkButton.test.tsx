import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BookmarkButton from "./BookmarkButton";

describe("<BookmarkButton />", () => {
  test("renders correctly with all data", () => {
    
		render(
			<BookmarkButton
				user={{ name: "name", uid: "23", watchList: [], docId: "12" }}
				cardData={{
					title: "Movie title",
					poster_path: "some-image.jpeg",
					genre_ids: [23, 12],
					genres: [{ name: "fiction", id: 1 }],
					id: "12",
				}}
			/>
    );
    
    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeInTheDocument();

	});
});
