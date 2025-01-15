import { forwardRef } from "react";
import { IPrivacyPageComponents } from "../../../types/privacyInterfaces";
import { useTranslation } from "react-i18next";

const TheCategoriesOfPersonal = forwardRef<
	HTMLDivElement,
	IPrivacyPageComponents
>(({ id }, ref) => {
	const { t } = useTranslation();
	return (
		<article id={id} ref={ref} className="text-black">
			<h3 className="text-3xl">
				{t("theCategoriesOfPersonalInformationWeCollect")}
			</h3>
			<p>{t("collect_personal_info")}</p>
			<ul>
				<li>{t("personal_details")}</li>
				<li>{t("payment_details")}</li>
				<li>{t("netflix_account_profile_information")}</li>
				<li>{t("usage_information")}</li>
				<li>{t("advertising_information")}</li>
			</ul>
		</article>
	);
});

export default TheCategoriesOfPersonal;
