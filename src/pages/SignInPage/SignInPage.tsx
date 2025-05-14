import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SignInForm from "../../components/SignInForm/SignInForm";

const SignInPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { userLoggedIn } = useAuth();

	useEffect(() => {
		userLoggedIn && navigate("/");
	}, [userLoggedIn, navigate]);

	return (
		<div className="relative">
			<div
				className="
        w-full h-[calc(100svh-70px)] md:h-[calc(100svh-78px)] min-h-[550px]
        sm:bg-posters absolute"
			></div>
			<div className="w-full h-[calc(100svh-70px)] md:h-[calc(100svh-78px)] min-h-[550px]">
				<div className="w-full h-[calc(100svh-70px)] sm:rounded sm:h-[500px] sm:mt-10 sm:w-[450px] mx-auto px-[5%] bg-black-default sm:bg-black-70 z-10 relative">
					<h1 className="text-2xl sm:pt-10 sm:text-4xl text-white">
						{t("sign-in")}
					</h1>
					<SignInForm />
				</div>
			</div>
		</div>
	);
};

export default SignInPage;
