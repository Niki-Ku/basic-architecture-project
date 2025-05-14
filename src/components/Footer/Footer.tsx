import LanguageSwitcher from "../LanguageSwithcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import DisplayFooterLinks from "../DisplayFooterLinks/DisplayFooterLinks";

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="w-full min-h-full bg-gray-dark py-3 ">
      <div className="w-[90%] mx-auto mb-40">
        <p className="font-light text-normal text-text-secondary mb-7">{t('questionsContactUs')}</p>
        <DisplayFooterLinks />
        <div className="w-[200px] h-[40px] mt-5">
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
