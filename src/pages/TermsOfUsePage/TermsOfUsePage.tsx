import { ReactComponent as ArrowDownFull } from "../../assets/icons/ArrowDownFull.svg";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";

const TermsOfUsePage = () => {
const { t } = useTranslation();

  return(
    <div className="bg-bg-primary text-text-default pt-8 pb-12 flex justify-center">
      <div className="px-3 max-w-[1248px]">
        <div className="flex items-center relative">
          <ul className="grow flex mb-8">
            <li className="flex items-center">
              <ArrowDownFull className="w-5 h-5 mr-2 rotate-90 fill-text-default" />
            </li>
            <li>
              <Link
                onClick={() => window.scrollTo({ top: 0, })}
                to="/faq"
                className="hover:underline hover:text-black-70"
              >
                {t('backToHelpHome')}
              </Link>
            </li>
          </ul>
          <div className="mb-8 self-start">
            <Button label="Print" variant="secondary" icon="PrinterIcon" onClick={() => window.print()}></Button>
          </div>
        </div>
        <div>
          <h1 className="text-[32px] md:text-[40px] font-extrabold">Netflix {t('termsOfUse')}</h1>
          <p>
            {t('netflixDescription')}
          </p>
          <p>
            {t('terms.intro')}
          </p>
          <ol className="list-decimal pl-4">
            <li className="mt-8">
              <p>
                <strong className="">{t('membership.title')}</strong>
                <br />
                <br />
                <span>
                  {t('membership.1.1')}
                </span>
                <br />
                <br/>
                <span>
                  {t('membership.1.2')}
                </span>
              </p>
            </li>
            <li className="mt-8">
              <p>
                <strong>{t('promotionalOffers.title')}. </strong>
                {t('promotionalOffers.description')}
              </p>
            </li>
            <li className="mt-8">
              <p>
                <strong>{t('billingAndCancellation.title')}</strong>
                <br />
                <br />
                  3.1. <span className="underline">{t('billingAndCancellation.3.1.title')}.</span>
                  {' '}
                  {t('billingAndCancellation.3.1.description')}
                  <br />
                  <br />
                  3.2. <span className="underline">{t('billingAndCancellation.3.2.title')}.</span>
                  {' '}
                  {t('billingAndCancellation.3.2.description')}
                  <br />
                  <br />
                  3.3. <span className="underline">{t('billingAndCancellation.3.3.title')}.</span>
                  {' '}
                  {t('billingAndCancellation.3.3.description')}
                  <br />
                  <br />
                  3.4. <span className="underline">{t('billingAndCancellation.3.4.title')}.</span>
                  {' '}
                  {t('billingAndCancellation.3.4.description')}
                  <br />
                  <br />
                  3.5. <span className="underline">{t('billingAndCancellation.3.5.title')}.</span>
                  {' '}
                  {t('billingAndCancellation.3.5.description')}
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
};

export default TermsOfUsePage;