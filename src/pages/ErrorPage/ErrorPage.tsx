import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
	const { t } = useTranslation();
	return (
		<div
			className="
      w-full h-[calc(100svh-70px)] md:h-[calc(100svh-78px)]
      bg-error-image bg-[#000] bg-blend-multiply bg-opacity-10 bg-no-repeat bg-cover bg-center text-white
      flex justify-center items-center flex-col"
		>
			<div className="text-center max-w-[90%] sm:max-w-[60%]">
				<h1 className="text-4xl md:text-6xl font-semibold">
					{t("errorPage.lostYourWay")}
				</h1>
				<p className="text-xl my-5">{t("errorPage.description")}</p>
				<Link to="/">
					<Button variant="white" label={`Netflix ${t('home')}`}></Button>
				</Link>
			</div>
			<div>
				<p className="mt-10 border-l-2 border-red-default text-xl md:text-2xl font-light">
					{t("errorPage.errorCode")} <span className="font-semibold">404</span>
				</p>
			</div>
		</div>
	);
};

export default ErrorPage;
