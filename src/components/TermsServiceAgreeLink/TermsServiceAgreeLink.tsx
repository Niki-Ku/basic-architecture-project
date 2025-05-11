import { t } from "i18next";
import { Link } from "react-router-dom";

const TermsServiceAgreeLink = () => {
	return (
		<label className="text-white" htmlFor="terms-and-service">
			{t("i-agree-to")}{" "}
			<Link
				onClick={() => window.scrollTo({ top: 0 })}
				to="/termsofuse"
				target="blank"
				className="text-blue-600 hover:underline"
			>
				{t("termsOfUse")}
			</Link>{" "}
			{t("and")}{" "}
			<Link
				onClick={() => window.scrollTo({ top: 0 })}
				to="/privacy"
				target="blank"
				className="text-blue-600 hover:underline"
			>
				{t("privacy-policy")}
			</Link>
		</label>
	);
};

export default TermsServiceAgreeLink;
