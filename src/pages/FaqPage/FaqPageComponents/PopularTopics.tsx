import { popularTopicsLinks } from "../../../config/helpCenterConfig";
import { t } from "i18next";
import { Link } from "react-router-dom";

const PopularTopics = () => {
	return (
		<div className="text-center text-text-transparent-70">
			<p className="inline font-bold">{t("popular_topics")}: </p>
			<div className="inline">
				{popularTopicsLinks.map((topic) => (
					<div
						key={topic.title}
						className="inline font-medium mr-1 after:content-[','] last:after:content-['']"
					>
						<Link
							to={topic.link}
							onClick={() => window.scrollTo({ top: 0 })}
							className="underline hover:text-text-accent"
						>
							{t(topic.title)}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default PopularTopics;
