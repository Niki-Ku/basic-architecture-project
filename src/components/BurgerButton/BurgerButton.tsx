import React from "react";

export interface BurgerButtonProps {
	onClick?: () => void;
	background?: "black" | "white" | "transparent" | "transparentBlack";
	isOpen: boolean;
	ariaLabel?: string;
	isWhiteStripes?: boolean;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({
	onClick,
	background = "transparent",
	isOpen,
	ariaLabel,
	isWhiteStripes,
}) => {
	const divStyles = {
		transparentBlack:
			"bg-bg-secondary inline-block p-2 relative cursor-pointer rounded",
		white: "bg-white inline-block p-2 cursor-pointer rounded",
		black: "bg-black-default inline-block p-2 cursor-pointer rounded",
		transparent: "bg-transparent inline-block p-2 cursor-pointer rounded",
	};
	return (
		<div
			className={divStyles[background]}
			data-testid="burger-button"
			onClick={onClick}
		>
			<button
				className={`relative block w-[30px] h-[24px]`}
				aria-label={ariaLabel}
			>
				<span
					data-testid="burger-line-1"
					className={`
              ${isWhiteStripes ? "bg-white" : "bg-bg-accent"}
              absolute left-0 h-[0.125rem] w-full 
              transition-all ease-in duration-300 delay-0	
              ${isOpen ? "top-[50%] -rotate-45" : "top-[0%] rotate-0"}`}
				></span>
				<span
					data-testid="burger-line-2"
					className={`
              ${isWhiteStripes ? "bg-white" : "bg-bg-accent"}
              absolute top-[50%] left-0 h-[0.125rem] w-full
              transition-all ease-in duration-300	delay-0	
              ${
								isOpen && "after:top-0 after:rotate-45 scale-0 after:scale-100"
							} `}
				></span>
				<span
					data-testid="burger-line-3"
					className={`
              ${isWhiteStripes ? "bg-white" : "bg-bg-accent"}
              absolute left-0 h-[0.125rem] w-full
              transition-all ease-in duration-300 delay-0	
              ${isOpen ? "top-[50%] rotate-45" : "top-[100%] rotate-0"}`}
				></span>
			</button>
		</div>
	);
};

export default BurgerButton;
