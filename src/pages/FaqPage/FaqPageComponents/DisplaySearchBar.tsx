import SearchBar from "../../../components/SearchBar/SearchBar";
import { footerLinks } from "../../../config/routeConfig";

const DisplaySearchBar = ({
	query,
	onQueryChange,
	headingIsVisible,
}: {
	query: string;
	onQueryChange: (query: string) => void;
	headingIsVisible: boolean;
}) => {
	return (
		<div
			className={`h-[46px] mb-6`}
			style={headingIsVisible ? { height: "auto" } : { height: "46px" }}
		>
			<div
				className={`${
					headingIsVisible
						? ""
						: "fixed bg-bg-primary z-10 w-full left-0 top-0 h-[80px] py-auto border-b border-text-transparent-40 flex justify-center items-center"
				}`}
			>
				<div className={`${headingIsVisible ? "" : "w-full max-w-[600px]"}`}>
					<SearchBar
						links={footerLinks}
						query={query}
						onQueryChange={onQueryChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default DisplaySearchBar;
