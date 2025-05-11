import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useGenres } from "../../hooks/useGenres";
import { useDbUser } from "../../hooks/useDbUser";
import DisplayFilmCards from "../../components/DisplayFilmCards/DisplayFilmCards";

const UserPage = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  const { data: additionalUser } = useDbUser();
	const { data: genersData } = useGenres(lang);

  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);

  if (!additionalUser) return <div>You should log in...</div>

  return(
    <>
      <div className="w-[90%] mx-auto">
        <div>
          <h3 className="text-4xl mb-4">{additionalUser.name} {t('page').toLocaleLowerCase()}</h3>
        </div>
        <section>
          <h4 className="text-2xl mb-2">{t('yourWatchlist')}</h4>
          <DisplayFilmCards movies={additionalUser.watchList} user={additionalUser} genres={genersData?.genres} />
        </section>
      </div>
    </>
  )
};

export default UserPage;
