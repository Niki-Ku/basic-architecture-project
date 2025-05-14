import { t } from "i18next";
import { Link } from "react-router-dom";
import { quickLinksIcons } from "../../../config/dynamicIcons";
import { quickLinks } from "../../../config/helpCenterConfig";

const DisplayQuickLinks = () => {
	return (
		<div className=" max-w-[600px] m-auto">
			<h3 className="text-lg font-bold border-b border-text-hover pb-2">
				{t("quick_links")}
			</h3>
			<ul>
				{quickLinks.map((item, index) => {
					const Icon = quickLinksIcons[item.icon];
					return (
						<li
							key={index}
							className="flex gap-4 items-center py-3 border-b border-text-hover last:border-0"
						>
							<Icon className="w-4 h-4 fill-text-default" />
							<Link
								to={item.link}
								className="underline font-bold hover:text-text-transparent-70"
							>
								{t(item.title)}
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default DisplayQuickLinks;
