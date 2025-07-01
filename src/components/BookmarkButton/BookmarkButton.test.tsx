import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BookmarkButton from "./BookmarkButton";
import { updateDoc } from "firebase/firestore";
import user from "@testing-library/user-event";

jest.mock("firebase/firestore", () => ({
	...jest.requireActual("firebase/firestore"),
	updateDoc: jest.fn().mockResolvedValue(""),
}));

afterEach(() => {
	jest.clearAllMocks();
});

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
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	test("calls functions on click", async () => {
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
		const button = screen.getByRole("button");
		await user.click(button);
		expect(updateDoc).toBeCalledTimes(1);
	});

	test("logs error to console if updateDoc fails", async () => {
		(updateDoc as jest.Mock).mockRejectedValue(new Error("test"));
		const consoleLogSpy = jest
			.spyOn(console, "log")
			.mockImplementation(() => {});
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
		const button = screen.getByRole("button");
		await user.click(button);
		expect(updateDoc).toBeCalledTimes(1);
		expect(consoleLogSpy).toBeCalledTimes(1);
		expect(consoleLogSpy).toHaveBeenCalledWith(
			expect.stringContaining(
				"Error when trying to add movie to watchlist: Error: test"
			)
		);
	});
});
