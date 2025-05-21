import React, { useState, useRef, useEffect, useCallback } from "react";
import "./FaqPage.css";
import { useTranslation } from "react-i18next";
import PopularTopics from "./FaqPageComponents/PopularTopics";
import ExploreTopicsLink from "./FaqPageComponents/ExploreTopicsLink";
import DisplayDropdowns from "./FaqPageComponents/DisplayDropdowns";
import DisplayQuickLinks from "./FaqPageComponents/DisplayQuickLinks";
import DisplaySearchBar from "./FaqPageComponents/DisplaySearchBar";

const FaqPage = () => {
	const { t } = useTranslation();
	const [open, setOpen] = useState("");
	const heading = useRef<HTMLHeadingElement | null>(null);
	const [exploreTopics, setExploreTopics] = useState<HTMLDivElement | null>(
		null
	);
	const [headingIsVisible, setHeadingIsVisible] = useState(true);
	const [searchValue, setSearchValue] = useState<string>("");

	const handleDropdownClick = useCallback((id: string, e: React.MouseEvent) => {
		e.preventDefault();
		setOpen((prevOpen) => (prevOpen === id ? "" : id));
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			setHeadingIsVisible(entry.isIntersecting);
		});
		if (!heading.current) return;
		observer.observe(heading?.current);
	}, []);

	return (
		<div className="bg-bg-primary text-text-default">
			<div className="min-h-[360px]">
				<section
					className="flex flex-col justify-center"
					style={{ minHeight: "calc(100svh - 70px)" }}
				>
					<div className="px-3 py-12 grow flex items-center">
						<div className="w-full max-w-[600px] m-auto">
							<h1
								ref={heading}
								className="font-extrabold text-[40px] mb-6 text-center"
							>
								{t("how_can_we_help")}
							</h1>
							<DisplaySearchBar
								query={searchValue}
								onQueryChange={setSearchValue}
								headingIsVisible={headingIsVisible}
							/>
							<PopularTopics />
						</div>
					</div>
					<ExploreTopicsLink exploreTopics={exploreTopics} />
				</section>
			</div>
			<section className="px-3 py-12">
				<DisplayDropdowns
					sectionRef={setExploreTopics}
					open={open}
					handleDropdownClick={handleDropdownClick}
				/>
				<DisplayQuickLinks />
			</section>
		</div>
	);
};

export default FaqPage;
