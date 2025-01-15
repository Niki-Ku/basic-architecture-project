import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
	const { t, i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [language, setLanguage] = useState(i18n.language || "en");

	const handleLanguageClick = (language: string) => {
		handleLanguageChange(language);
		setIsOpen((open) => !open);
	};

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

	useEffect(() => {
		setLanguage(i18n.language);
	}, [i18n.language]);

	const menuItems = [
		{ value: "en", label: t("en") },
		{ value: "uk", label: t("uk") },
		{ value: "hr", label: t("hr") },
		{ value: "es", label: t("es") },
	];

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
					<div className="bg-text-default p-[1px] pt-0 rounded-b-xl w-full left-0 absolute">
						<ul
							className="bg-bg-primary text-text-secondary rounded-b-xl"
							role="listbox"
						>
							{menuItems.map((item, index) => (
								<li
									key={index}
									role="option"
									aria-selected={language === item.value}
									onClick={() => handleLanguageClick(item.value)}
									className="cursor-pointer border-bg-default aria-selected:bg-text-transparent-40 aria-selected:text-text-default hover:bg-text-transparent-10 border-b last:border-0 first:border-t last:rounded-b-xl"
								>
									<button className="w-full text-start px-2 py-1 flex justify-center">
										{item.label}
									</button>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default LanguageSwitcher;
