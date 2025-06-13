import React from "react";
import { ReactComponent as ArticleIcon } from "../../assets/icons/ArticleIcon.svg";
import { ICategory } from "../../types/global";
import { t } from "i18next";
import { Link } from "react-router-dom";

const DropdownItems = ({ links }: { links: ICategory }) => {
	return (
		<ul className="pt-4 pb-1">
			{links.subCategories.map((subCategory) => (
				<li key={subCategory.subCategoryName} className="flex flex-nowrap mb-4">
					<ArticleIcon className="w-[16px] h-[16px] fill-text-default mr-2 mt-1" />
					<Link
						onClick={() => window.scrollTo({ top: 0 })}
						to={subCategory.subCategoryPath}
						className="underline hover:text-text-accent"
					>
						<span className="text-wrap break-normal">
							{t(subCategory.subCategoryName)}
						</span>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default DropdownItems;
