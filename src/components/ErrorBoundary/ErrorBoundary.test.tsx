import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ErrorBoundary from "./ErrorBoundary";

const ProblemChild = () => {
	throw new Error("Test error");
};

describe("<ErrrorBoundary />", () => {
  test("renders fallback UI when error occurs", () => {
    jest.spyOn(console, "error").mockImplementation(() => { });
    
		render(
			<ErrorBoundary>
				<ProblemChild />
			</ErrorBoundary>
    );

    expect(screen.getByText("❌ Something went wrong.")).toBeInTheDocument();

    (console.error as jest.Mock).mockRestore();
  });
  
  test("renders nested element correctly", () => {
    render(<ErrorBoundary><div>Test element</div></ErrorBoundary>);
    expect(screen.getByText(/test element/i)).toBeInTheDocument();
  })
});
