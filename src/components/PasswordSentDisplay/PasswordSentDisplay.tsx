import React from "react";
import { t } from "i18next";
import { Link } from "react-router-dom";

const PasswordSentDisplay = () => {
	return (
		<div className="pt-10">
			<p className="text-lg">{t("we-sent-you-letter")}</p>
			<Link
				className="text-blue-500 hover:underline pt-4 inline-block"
				to="/login"
				onClick={() => window.scrollTo({ top: 0 })}
			>
				{t("back-to-login-page")}
			</Link>
		</div>
	);
};

export default PasswordSentDisplay;
