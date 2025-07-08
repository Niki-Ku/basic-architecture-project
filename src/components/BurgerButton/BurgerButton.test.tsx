import React from "react";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import BurgerButton from "./BurgerButton";
import { BurgerButtonProps } from "./BurgerButton";

describe("<BurgerButton />", () => {
	test("renders corectly", () => {
		render(
			<BurgerButton onClick={() => console.log("k")} ariaLabel="Menu" isOpen />
		);
		expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
	});

	test("onclick works correctly", async () => {
		user.setup();
		const handleClick = jest.fn();
		render(<BurgerButton onClick={handleClick} isOpen={true} />);
		const burgerButton = screen.getByRole("button");
		await user.click(burgerButton);
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test("applies transforms when isOpen=true", () => {
		render(<BurgerButton isOpen />);

		const firstSpan = screen.getByTestId("burger-line-1");
		const secondSpan = screen.getByTestId("burger-line-2");
		const thirdSpan = screen.getByTestId("burger-line-3");

		expect(firstSpan).toHaveClass("-rotate-45 top-[50%]");
		expect(secondSpan).toHaveClass("scale-0");
		expect(thirdSpan).toHaveClass("rotate-45 top-[50%]");
	});

	test("applies transforms when isOpen=false", () => {
		render(<BurgerButton isOpen={false} />);

		const firstSpan = screen.getByTestId("burger-line-1");
		const secondSpan = screen.getByTestId("burger-line-2");
		const thirdSpan = screen.getByTestId("burger-line-3");

		expect(firstSpan).toHaveClass("rotate-0 top-[0%]");
		expect(secondSpan).not.toHaveClass("scale-0");
		expect(thirdSpan).toHaveClass("rotate-0 top-[100%]");
	});

	const backgrounds: [BurgerButtonProps["background"], string][] = [
		["black", "bg-black-default"],
		["white", "bg-white"],
		["transparent", "bg-transparent"],
		["transparentBlack", "bg-bg-secondary"],
	];

	test.each(backgrounds)("renders correct background", (bg, expectedClass) => {
		render(
			<BurgerButton onClick={() => console.log("k")} isOpen background={bg} />
		);
		const wrapperDiv = screen.getByTestId("burger-button");
		expect(wrapperDiv).toHaveClass(expectedClass);
	});

	test("applies correct background styles", () => {
		render(
			<BurgerButton
				onClick={() => console.log("k")}
				isOpen
				background="transparentBlack"
			/>
		);
		const wrapperDiv = screen.getByTestId("burger-button");
		expect(wrapperDiv).toHaveClass("bg-bg-secondary");
	});

	test("applies correct styles when isWhiteStripes=true", () => {
		render(
			<BurgerButton onClick={() => console.log("k")} isOpen isWhiteStripes />
    );
    
		expect(screen.getByTestId("burger-line-1")).toHaveClass("bg-white");
		expect(screen.getByTestId("burger-line-2")).toHaveClass("bg-white");
		expect(screen.getByTestId("burger-line-3")).toHaveClass("bg-white");
	});
});
