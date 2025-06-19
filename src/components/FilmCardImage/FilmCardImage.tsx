import React from "react";
import { t } from "i18next";
import NoImage from "../../assets/images/no-image.webp";

const FilmCardImage = ({
	posterUrl,
	title,
}: {
	posterUrl?: string;
	title?: string;
}) => {
	return (
		<div className="overflow-hidden rounded-2xl relative w-[230px] aspect-[3/4]">
			<div className="absolute w-full h-full pointer-events-none bg-black-black-30 -top-full group-hover:top-0 right-0 z-10"></div>
			{posterUrl ? (
				<img
					className="w-full h-full object-cover"
					loading="eager"
					src={`https://image.tmdb.org/t/p/w300${posterUrl}`}
					alt={title + " " + t("movie")}
				/>
			) : (
				<img
					className="w-full h-full object-cover"
					src={NoImage}
					alt={title ? title + " " + t("movie") :  t("no_data")}
				/>
			)}
		</div>
	);
};

export default FilmCardImage;
