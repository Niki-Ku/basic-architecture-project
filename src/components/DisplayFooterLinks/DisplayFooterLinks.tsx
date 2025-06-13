import React from "react";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { footerLinks } from "../../config/routeConfig";

const DisplayFooterLinks = () => {
	return (
		<ul className="grow">
			{footerLinks.map((link) => (
				<li
					key={link.name}
					className="inline-block w-3/12 min-w-[100px] mb-4 pr-[22px] text-[13px] text-text-secondary "
				>
					<Link
						onClick={() => window.scrollTo({ top: 0 })}
						key={`link-${link.name}`}
						to={link.path}
						className="hover:underline"
					>
						{t(`${link.name}`)}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default DisplayFooterLinks;
