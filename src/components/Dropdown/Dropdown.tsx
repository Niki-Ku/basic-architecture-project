import React from "react";
import { ReactComponent as ArrowDownShort } from "../../assets/icons/ArrowDownShort.svg";
import { useTranslation } from "react-i18next";
import { ICategory } from "../../types/global";
import DropdownItems from "../DropdownItems/DropdownItems";

interface IDropdown {
	links: ICategory;
	handleDropdownClick: (id: string, e: React.MouseEvent) => void;
	open: string;
	id: string;
}

const Dropdown: React.FC<IDropdown> = ({
	links,
	handleDropdownClick,
	open,
	id,
}) => {
	const { t } = useTranslation();
	return (
		<div className="bg-bg-default text-text-default w-full border-b border-text-transparent-40 last:border-none">
			<details
				data-testid="dropdown-details"
				id={`id-${links.categoryTitle}`}
				onClick={(e) => handleDropdownClick(id, e)}
				open={open === id}
			>
				<summary className="flex text-base py-3 cursor-pointer justify-between">
					<strong className="font-bold">{t(links.categoryTitle)}</strong>
					<ArrowDownShort
						className={`w-6 h-6 fill-text-default mr-2 ${
							open === id && "origin-center rotate-180"
						} duration-100`}
					/>
				</summary>
				<DropdownItems links={links} />
			</details>
		</div>
	);
};

export default Dropdown;
