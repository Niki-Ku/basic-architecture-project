import DisplayMoviesSections from "../../components/DisplayMoviesSections/DisplayMoviesSections";
import SliderHomePage from "../../components/SliderHomePage/SliderHomePage";
import "./HomePage.css";

const HomePage = () => {
	return (
		<div className="min-h-[100svh] w-full overflow-hidden">
			<SliderHomePage />
			<DisplayMoviesSections />
		</div>
	);
};

export default HomePage;
