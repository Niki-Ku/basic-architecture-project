import useMobile from "../../hooks/useMobile";
import { Link } from "react-router-dom";
import { Pagination, Autoplay } from "swiper/modules";
import { pagination, autoplay } from "../../helpers/sliderUtils";
import { Swiper, SwiperSlide } from "swiper/react";
import { swiperMovies } from "../../config/swiperMovies";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/pagination";

const SliderHomePage = () => {
	const { t } = useTranslation();
	const isMobile = useMobile();
	return (
		<div className="h-[100svh]">
			<Swiper
				pagination={pagination}
				autoplay={autoplay}
				modules={[Pagination, Autoplay]}
				className="mySwiper"
				loop={true}
			>
				{swiperMovies.map((m) => (
					<SwiperSlide key={m.title}>
						<div
							className={`bg-${m.mobileImage} md:bg-${m.image} bg-center bg-cover w-full h-full block relative`}
							style={{
								backgroundImage: `url(${isMobile ? m.mobileImage : m.image})`,
							}}
						>
							<div className="absolute bottom-5 left-5">
								<Link onClick={() => window.scrollTo({ top: 0 })} to={m.link}>
									<p className="text-3xl md:text-6xl">{t(m.title)}</p>
								</Link>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default SliderHomePage;
