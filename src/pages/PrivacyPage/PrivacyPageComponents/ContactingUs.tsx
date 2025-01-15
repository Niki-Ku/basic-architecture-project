import { forwardRef } from "react";
import { IPrivacyPageComponents } from "../../../types/privacyInterfaces";
import { useTranslation } from "react-i18next";

const ContactingUs = forwardRef<HTMLDivElement, IPrivacyPageComponents>(
	({ id }, ref) => {
		const { t } = useTranslation();
		return (
			<section id={id} ref={ref} className="text-black">
				<h3 className="text-3xl">{t("contactingUs")}</h3>
				<p>{t("privacyContact")}</p>
				<p>{t("data_controller_info")}</p>
			</section>
		);
	}
);

export default ContactingUs;
