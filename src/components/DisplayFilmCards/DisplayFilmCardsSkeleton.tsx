const DisplayFilmCardsSkeleton = () => {
	return (
		<div className="gap-2 md:gap-5 sm:gap-4 justify-evenly pt-4 mb-4 grid grid-cols-cards">
			{Array.from({ length: 20 }, (_, i) => i).map((i) => (
				<div key={i} className="w-[230px] aspect-[3/4]"></div>
			))}
		</div>
	);
};

export default DisplayFilmCardsSkeleton;
