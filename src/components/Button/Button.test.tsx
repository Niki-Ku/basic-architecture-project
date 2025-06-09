import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";

describe("<Button />", () => {
	test("renders correctly with label", () => {
		render(<Button label="Click Me" />);
		const buttonElement = screen.getByText("Click Me");
		expect(buttonElement).toBeInTheDocument();
  });
  
	test("applies primary style by default", async () => {
		render(<Button label="Click Me" />);

		await waitFor(() => {
			expect(screen.getByText("Click Me")).toHaveClass("bg-red-default");
		});
	});

	test("applies secondary style when variant is secondary", () => {
		render(<Button label="Click Me" variant="secondary" />);
		expect(screen.getByText("Click Me")).toHaveClass("bg-gray-secondary");
	});

	test("applies white style when variant is white", () => {
		render(<Button label="Click Me" variant="white" />);
		expect(screen.getByText("Click Me")).toHaveClass("bg-white");
	});

	test("applies disabled styles when disabled", () => {
		render(<Button label="Disabled" disabled />);
		const button = screen.getByText("Disabled");

		expect(button).toBeDisabled();
		expect(button).toHaveStyle("background-color: #d1d5db");
		expect(button).toHaveStyle("color: #222222");
	});

	test("renders icon when icon prop is set", () => {
		render(<Button label="With icon" icon="PrinterIcon" />);
		expect(screen.getByTestId("button-icon")).toBeInTheDocument();
	});

	test("renders full width button when wide is true", () => {
		render(<Button label="Wide" wide />);
		expect(screen.getByText("Wide")).toBeInTheDocument();
	});
});
