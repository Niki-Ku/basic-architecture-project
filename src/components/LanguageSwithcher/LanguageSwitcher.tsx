import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DisplayLanguages from "./DisplayLanguages";

const LanguageSwitcher = () => {
	const { t, i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [language, setLanguage] = useState(i18n.language || "en");

	const changeLanguage = useCallback(
		async (newLanguage: string) => {
			try {
				await i18n.changeLanguage(newLanguage);
				setLanguage(newLanguage);
			} catch (error) {
				throw new Error("Error changing language");
			}
		},
		[i18n]
	);

	const handleLanguageChange = useCallback(
		(newLanguage: string) => {
			changeLanguage(newLanguage).catch(() => {
				throw new Error("Error changing language");
			});
		},
		[changeLanguage]
	);

	const handleLanguageClick = useCallback(
		(language: string) => {
			handleLanguageChange(language);
			setIsOpen((open) => !open);
		},
		[handleLanguageChange]
	);

	useEffect(() => {
		setLanguage(i18n.language);
	}, [i18n.language]);

	return (
		<div
			className={`bg-text-default rounded-xl p-[1px] relative w-full h-full ${
				isOpen && "rounded-b-none"
			}`}
		>
			<div
				className={`bg-bg-primary rounded-xl px-2 h-full w-full ${
					isOpen && "rounded-b-none"
				}`}
			>
				<button
					onClick={() => {
						setIsOpen(!isOpen);
					}}
					className="text-text-secondary w-full h-full flex justify-between items-center"
					aria-label={t("chooseLanguage")}
				>
					<span className={"block"}>{t("chooseLanguage")}</span>
					<span className="border-t-8 border-x-8 border-x-transparent border-t-text-secondary"></span>
				</button>
				{isOpen && (
					<DisplayLanguages
						language={language}
						handleLanguageClick={handleLanguageClick}
					/>
				)}
			</div>
		</div>
	);
};

export default LanguageSwitcher;
