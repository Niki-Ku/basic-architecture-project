import { t } from "i18next";
import { ReactComponent as ArrowDown } from "../../../assets/icons/ArrowDownFull.svg";

const ExploreTopicsLink = ({
	exploreTopics,
}: {
	exploreTopics: HTMLDivElement | null;
}) => {
	return (
		<div className="mx-auto w-6/12 text-text-default relative justify-self-end text-center">
			<button
				onClick={() => {
					exploreTopics?.scrollIntoView({ behavior: "smooth" });
				}}
				className="arrow-parent pb-10 inline-block hover:underline"
			>
				<span className="font-bold">{t("explore_topics")}</span>
				<ArrowDown className="arrow h-6 w-6 absolute top-6 left-0 right-0 mx-auto w-[100px] fill-text-default" />
			</button>
		</div>
	);
};

export default ExploreTopicsLink;
