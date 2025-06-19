import React from "react";
import { t } from "i18next";
import { ReactComponent as Arrow } from "../../../assets/icons/ArrowDownFull.svg";
import { Link } from "react-router-dom";

const HorizontalScrollerLink = ({
	heading,
	link,
}: {
	link?: string;
	heading: string;
}) => {
	if (link)
		return (
			<Link onClick={() => window.scrollTo({ top: 0 })} to={link}>
				<div className="text-2xl inline-block mb-2 mx-2">
					<span>{t(heading)}</span>
					<Arrow className="-rotate-90 w-8 h-8 fill-text-default inline" />
				</div>
			</Link>
		);
	
	return (
		<div className="text-2xl inline-block mb-2 mx-2">
			<span>{t(heading)}</span>
		</div>
	);
};

export default HorizontalScrollerLink;
