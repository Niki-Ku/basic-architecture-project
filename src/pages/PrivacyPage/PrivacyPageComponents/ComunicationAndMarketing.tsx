import { forwardRef } from "react";
import { IPrivacyPageComponents } from "../../../types/privacyInterfaces";
import { useTranslation } from "react-i18next";

const ComunicationAndMarketing = forwardRef<
	HTMLDivElement,
	IPrivacyPageComponents
>(({ id }, ref) => {
	const { t } = useTranslation();
	return (
		<article id={id} ref={ref} className="text-black">
			<h3 className="text-3xl">{t('communicationAndMarketingPreferences')}</h3>
			<ul>
				<li>
					{t('communicationPreferences')}
				</li>
			</ul>
		</article>
	);
});

export default ComunicationAndMarketing;
