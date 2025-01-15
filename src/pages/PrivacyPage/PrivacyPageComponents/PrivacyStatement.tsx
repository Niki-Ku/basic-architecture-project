import { forwardRef } from "react";
import { IPrivacyPageComponents } from "../../../types/privacyInterfaces";
import { useTranslation } from "react-i18next";

const PrivacyStatement = forwardRef<HTMLDivElement, IPrivacyPageComponents>(
	({ id }, ref) => {
		const { t } = useTranslation();
		return (
			<section ref={ref} id={id} className="text-black">
				<h1 className="text-3xl">{t("privacyStatement")}</h1>
				<p>{t("privacy_statement_explains")}</p>
			</section>
		);
	}
);

export default PrivacyStatement;
