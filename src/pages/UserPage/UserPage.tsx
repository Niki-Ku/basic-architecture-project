import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useGenres } from "../../hooks/useGenres";
import { useDbUser } from "../../hooks/useDbUser";
import DisplayFilmCards from "../../components/DisplayFilmCards/DisplayFilmCards";
import DisplayFilmCardsSkeleton from "../../components/DisplayFilmCards/DisplayFilmCardsSkeleton";

const UserPage = () => {
	const { t, i18n } = useTranslation();
	const [lang, setLang] = useState(i18n.language);
	const { data: additionalUser, isLoading } = useDbUser();
	const { data: genersData } = useGenres(lang);

	useEffect(() => {
		setLang(i18n.language);
	}, [i18n.language]);

  if (!additionalUser) return (
    <>
      <div>You should log in...</div>
      <DisplayFilmCardsSkeleton />
    </>
  );

	return (
		<>
			<div className="w-[90%] max-w-[1280px] min-w-[320px] mx-auto">
				<div>
					<h3 className="text-4xl mb-4">
						{additionalUser.name} {t("page").toLocaleLowerCase()}
					</h3>
				</div>
				<section>
					<h4 className="text-2xl mb-2">{t("yourWatchlist")}</h4>
					{isLoading ? (
						<DisplayFilmCardsSkeleton />
					) : (
						<DisplayFilmCards
							movies={additionalUser.watchList}
							user={additionalUser}
							genres={genersData?.genres}
						/>
					)}
				</section>
			</div>
		</>
	);
};

export default UserPage;
