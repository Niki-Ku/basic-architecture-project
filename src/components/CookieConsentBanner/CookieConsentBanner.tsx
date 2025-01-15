import { useTranslation } from "react-i18next";
import Button from "../Button/Button";

interface CookieConsentBannerProps {
  onAcceptClick: () => void;
  onDeclineClick: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onAcceptClick, onDeclineClick }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white text-black-default p-2 fixed bottom-0">
      <h3 className="text-xl font-bold">{t('weValueYourPrivacy')}</h3>
      <p>
        {t('cookieUsageNotice')}
      </p>
      <div className="mt-4">
        <span className="mr-2">
          <Button label={t("accept")} onClick={onAcceptClick}></Button>
        </span>
        <span>
          <Button label={t("decline")} variant="secondary" onClick={onDeclineClick}></Button>
        </span>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
