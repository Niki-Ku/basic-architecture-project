import { t } from "i18next";

const DisplayLanguages = ({
	handleLanguageClick,
	language,
}: {
	handleLanguageClick: (lang: string) => void;
	language: string;
}) => {
	const menuItems = [
		{ value: "en", label: t("en") },
		{ value: "uk", label: t("uk") },
		{ value: "hr", label: t("hr") },
		{ value: "es", label: t("es") },
	];

	return (
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
	);
};

export default DisplayLanguages;
