import { t } from "i18next";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowDownFull } from "../../../assets/icons/ArrowDownFull.svg";
import Button from "../../../components/Button/Button";

const PrivacyPageHeader = () => {
	return (
		<>
			<ul className="grow flex mb-8">
				<li className="flex items-center">
					<ArrowDownFull className="w-5 h-5 mr-2 rotate-90 fill-text-default" />
				</li>
				<li>
					<Link
						onClick={() => window.scrollTo({ top: 0 })}
						to="/faq"
						className="hover:underline hover:text-text-hover"
					>
						{t("backToHelpHome")}
					</Link>
				</li>
			</ul>
			<div className="mb-8 self-start">
				<Button
					label={t("print")}
					variant="secondary"
					icon="PrinterIcon"
					onClick={() => window.print()}
				></Button>
			</div>
		</>
	);
};

export default PrivacyPageHeader;
