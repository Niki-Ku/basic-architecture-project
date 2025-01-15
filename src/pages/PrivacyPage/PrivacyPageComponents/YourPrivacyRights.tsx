import { forwardRef } from "react";
import { IPrivacyPageComponents } from "../../../types/privacyInterfaces";
import { useTranslation } from "react-i18next";

const YourPrivacyRights = forwardRef<HTMLDivElement, IPrivacyPageComponents>(
	({ id }, ref) => {
		const { t } = useTranslation();
		return (
			<article id={id} ref={ref} className="text-black">
				<h3 className="text-3xl">{t("yourPrivacyRights")}</h3>
				<ul>
					<li>{t("access_correct_update_delete")}</li>
				</ul>
			</article>
		);
	}
);

export default YourPrivacyRights;
