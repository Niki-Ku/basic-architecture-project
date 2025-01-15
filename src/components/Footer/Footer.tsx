import { Link } from "react-router-dom";
import { footerLinks } from "../../config/routeConfig";
import LanguageSwitcher from "../LanguageSwithcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="w-full min-h-full bg-gray-dark py-3 ">
      <div className="w-[90%] mx-auto mb-40">
        <p className="font-light text-normal text-text-secondary mb-7">{t('questionsContactUs')}</p>
        <ul className="grow">
          {footerLinks.map((link) => {
            return (
              <li key={link.name} className="inline-block w-3/12 min-w-[100px] mb-4 pr-[22px] text-[13px] text-text-secondary ">
                <Link 
                  onClick={() => window.scrollTo({top: 0,})}
                  key={`link-${link.name}`} 
                  to={link.path}
                  className="hover:underline"
                >{t(`${link.name}`)}</Link>
              </li>
            )
          })}
        </ul>
        <div className="w-[200px] h-[40px] mt-5">
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
