import { useState } from "react";
import { useTranslation } from "react-i18next";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";
import PasswordSentDisplay from "../../components/PasswordSentDisplay/PasswordSentDisplay";

const ResetPasswordPage = () => {
	const { t } = useTranslation();
	const [isSendReset, setIsSendReset] = useState(false);

	return (
		<div className="relative">
			<div
				className="
        w-full h-[calc(100svh-70px)] md:h-[calc(100svh-78px)] min-h-[550px]
        sm:bg-posters absolute"
			></div>
			<div className="w-full h-[calc(100svh-70px)] min-h-[550px]">
				<div className="w-full h-[calc(100svh-70px)] sm:rounded sm:h-[500px] sm:mt-10 sm:w-[450px] mx-auto px-[5%] bg-black-default sm:bg-black-70 z-10 relative">
					{isSendReset ? (
						<PasswordSentDisplay />
					) : (
						<div>
							<h1 className="text-2xl sm:pt-10 sm:text-4xl text-white">
								{t("reset-password")}
							</h1>
							<p className="my-4">{t("we-will-send-you-letter")}</p>
							<ResetPasswordForm setIsSendReset={setIsSendReset} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
