import React, { SetStateAction } from "react";
import { ReactComponent as PasswordHide } from "../../assets/icons/passwordHide.svg";
import { ReactComponent as PasswordShow } from "../../assets/icons/passwordShow.svg";
import { t } from "i18next";

const HideShowPassButton = ({
	passwordType,
	setPasswordType,
}: {
	passwordType: string;
	setPasswordType: React.Dispatch<SetStateAction<string>>;
}) => {
	const showPassClick = () => {
		setPasswordType((prev) => (prev === "password" ? "text" : "password"));
	};
	return (
		<div
			onClick={showPassClick}
			className="absolute top-0 right-0 h-10 w-10  flex justify-center items-center"
		>
			<button
				type="button"
				aria-label={t("show-hide-password")}
				className="hover:bg-gray-secondary p-1 rounded-full"
			>
				{passwordType === "password" ? (
					<PasswordShow className="w-5 h-4 stroke-white" data-testid="icon-show" />
				) : (
					<PasswordHide className="w-5 h-4 stroke-white" data-testid="icon-hide" />
				)}
			</button>
		</div>
	);
};

export default HideShowPassButton;
