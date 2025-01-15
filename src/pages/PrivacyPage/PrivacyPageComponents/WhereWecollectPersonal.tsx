import { forwardRef } from "react";
import { IPrivacyPageComponents } from "../../../types/privacyInterfaces";
import { useTranslation } from "react-i18next";

const WhereWeCollectPersonal = forwardRef<
	HTMLDivElement,
	IPrivacyPageComponents
>(({ id }, ref) => {
	const { t } = useTranslation();
	return (
		<article id={id} ref={ref} className="text-black">
			<h3 className="text-3xl">{t("whereWeCollectPersonalInformationFrom")}</h3>
			<p>{t("collect_sources")}</p>
			<ul>
				<li>{t("directly_from_you")}</li>
				<li>{t("automatically_when_using_service")}</li>
				<li>{t("from_partners")}</li>
			</ul>
		</article>
	);
});

export default WhereWeCollectPersonal;
