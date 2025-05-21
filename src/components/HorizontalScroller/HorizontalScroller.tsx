import { DbUser, Film, Genre } from "../../types/global";
import "./HorizontalScroller.css";
import { useRef } from "react";
import { ReactComponent as ArrowShort } from "../../assets/icons/ArrowDownShort.svg";
import { useTranslation } from "react-i18next";
import HorizontalScrollerLink from "./HorizontalScrollerLink";
import HorizontalScrollerMoviesDisplay from "./HorizontalScrollerMoviesDisplay";

interface IHorizontalScroller {
	films: Film[];
	genres: Genre[];
	link?: string;
	heading: string;
	user: DbUser | undefined;
}

const HorizontalScroller: React.FC<IHorizontalScroller> = ({
	films,
	genres,
	link,
	heading,
	user,
}) => {
	const { t } = useTranslation();
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	const scroll = (direction: string) => {
		if (scrollContainerRef.current) {
			const scrollAmount =
				scrollContainerRef.current.getBoundingClientRect().width;
			scrollContainerRef.current.scrollLeft +=
				direction === "left" ? -scrollAmount : scrollAmount;
		}
	};

	return (
		<section className="group/scroll md:px-10 relative">
			<HorizontalScrollerLink heading={heading} link={link} />
			<button
				onClick={() => scroll("left")}
				className="md:group-hover/scroll:block hidden absolute h-full w-10 top-0 left-0"
				aria-label={t("slide-left")}
			>
				<ArrowShort className="w-10 h-10 fill-text-default rotate-90" />
			</button>
			<HorizontalScrollerMoviesDisplay
				genres={genres}
				films={films}
				user={user}
				scrollContainerRef={scrollContainerRef}
			/>
			<button
				onClick={() => scroll("right")}
				className="hidden md:group-hover/scroll:block absolute h-full w-10 top-0 right-0"
				aria-label={t("slide-right")}
			>
				<ArrowShort className="w-10 h-10 fill-text-default -rotate-90" />
			</button>
		</section>
	);
};

export default HorizontalScroller;
