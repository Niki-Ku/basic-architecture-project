import { useAuth } from "../../context/AuthContext";
import { useQuery } from "react-query";
import { DbUser, Genre } from "../../types/global";
import { getUserFromDb } from "../../helpers/firebaseUtils";
import { useTranslation } from "react-i18next";
import FilmCard from "../../components/FilmCard/FilmCard";
import { useState, useEffect } from "react";
import { dataFetch } from "../../helpers/fetchUtils";
import { fetchGenres } from "../../api/MoviesApi";

const UserPage = () => {
  const { currentUser } = useAuth();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const genresOptions = fetchGenres(lang);
  
  const { data: additionalUser } = useQuery<DbUser | undefined >(
    ["user", currentUser],
    () => getUserFromDb(currentUser?.uid),
    {refetchInterval: 10000}
  )

  const { data: genersData } = useQuery<{ genres: Genre[] }>(
    ["genresData", lang],
    () => dataFetch(genresOptions)
  );

  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);

  return(
    <>
      <div className="w-[90%] mx-auto">
        <div>
          <h3 className="text-4xl mb-4">{additionalUser?.name} {t('page').toLocaleLowerCase()}</h3>
        </div>
        <section>
          <h4 className="text-2xl mb-2">{t('yourWatchlist')}</h4>
          <div className="flex gap-10 sm:gap-4 flex-wrap">
            {genersData && additionalUser?.watchList.map(movie =>
              <div key={`watchlist-${movie.title}`} className="basis-full sm:basis-[30%] md:basis-[15%] xl:basis-[10%]">
                <FilmCard cardData={movie} genres={genersData?.genres} link={`../movies/${movie.id}`} user={additionalUser} />
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
};

export default UserPage;
