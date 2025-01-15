import { forwardRef } from "react";
import { IPrivacyPageComponents } from "../../../types/privacyInterfaces";
import { useTranslation } from "react-i18next";

const HowWeUsePersonal = forwardRef<HTMLDivElement, IPrivacyPageComponents>(
	({ id }, ref) => {
		const { t } = useTranslation();
		return (
			<article id={id} ref={ref} className="text-black">
				<h3 className="text-3xl">{t("howWeUseYourPersonalInformation")}</h3>
				<p>{t("use_of_personal_info")}</p>
				<ul>
					<li>{t("service_provision")}</li>
				</ul>
			</article>
		);
	}
);

export default HowWeUsePersonal;
