import { useTranslation } from "react-i18next";
import { doSignInWithEmailAndPassword, doSetPersistence } from "../../services/firebaseAuth";
import { useCallback, useEffect, useState } from "react";
import { ReactComponent as PasswordShow } from "../../assets/icons/passwordShow.svg";
import { ReactComponent as PasswordHide } from "../../assets/icons/passwordHide.svg";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signInSchema } from "../../schemas/yupSchemas";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../../context/AuthContext";
import {
	browserLocalPersistence,
	browserSessionPersistence,
} from "firebase/auth";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";

interface ISignIn {
	email: string;
	password: string;
	rememberMe: boolean;
}

const SignInPage = () => {
	const { t } = useTranslation();
	const [passwordType, setPasswordType] = useState<string>("password");
	const [passwordState, setPasswordState] = useState({
		error: "",
		errorCount: 0, 
	})
	const [loading, setLoading] = useState<boolean>(false);
	const [captchaValue, setCaptchaValue] = useState<string | null>("");
	const navigate = useNavigate();
	const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
	const { userLoggedIn } = useAuth();

	useEffect(() => {
		userLoggedIn && navigate("/");
	}, []);

	const showPassClick = () => {
		setPasswordType((prev) => (prev === "password" ? "text" : "password"));
	};

	const handleError = (errorCode: string) => {
		if (errorCode === "auth/invalid-credential") {
			setPasswordState((prev) => {
				return {
					...prev,
					error: "invalid-credential",
					errorCount: prev.errorCount + 1
				}
			})
		} else {
			setPasswordState((prev) => ({...prev, error: errorCode}))
			console.log(errorCode);
		}
	}

	const onSubmit = async () => {
		const persistence = values.rememberMe
		? browserLocalPersistence
		: browserSessionPersistence;
		try {
			setLoading(true);
			await doSetPersistence(persistence);
			await doSignInWithEmailAndPassword(values.email, values.password);
			navigate("/");
		} catch (error: any) {
			handleError(error.code)
		} finally {
			setLoading(false);
		}
	};

	const handleCaptchaChange = useCallback(
		useDebounce((value:string) => setCaptchaValue(value), 300), []
	)

	const { values, handleBlur, isSubmitting, handleChange, handleSubmit } =
		useFormik<ISignIn>({
			initialValues: {
				email: "",
				password: "",
				rememberMe: false,
			},
			onSubmit,
			validationSchema: signInSchema,
		});

	return (
		<div className="relative">
			<div
				className="
        w-full h-[calc(100svh-70px)] md:h-[calc(100svh-78px)] min-h-[550px]
        bg-posters absolute"
			></div>
			<div className="w-full h-[calc(100svh-70px)] md:h-[calc(100svh-78px)] min-h-[550px]">
				<div className="w-full h-[calc(100svh-70px)] sm:rounded sm:h-[500px] sm:mt-10 sm:w-[450px] mx-auto px-[5%] bg-black-default sm:bg-black-70 z-10 relative">
					<h1 className="text-2xl sm:pt-10 sm:text-4xl text-white">
						{t("sign-in")}
					</h1>
					{loading ? (
						<div>{t('loading')}</div>
					) : (
						<form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
							<div>
								<input
									type="text"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder={t("email")}
									aria-label={t("email")}
									name="email"
									className="w-full h-10 border px-4 rounded bg-transparent border-bg-hover"
								/>
							</div>
							<div className="relative">
								<div
									onClick={showPassClick}
									className="absolute top-0 right-0 h-10 w-10  flex justify-center items-center"
								>
									<button
										type="button"
										aria-label={t("show-hide-password")}
										className="hover:bg-gray-secondary p-1 rounded-full"
									>
										{passwordType === "password" ? (
											<PasswordShow className="w-5 h-4 stroke-white" />
										) : (
											<PasswordHide className="w-5 h-4 stroke-white" />
										)}
									</button>
								</div>
								<input
									type={passwordType}
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder={t("password")}
									aria-label={t("password")}
									name="password"
									className="w-full h-10 border px-4 rounded bg-transparent border-bg-hover"
								/>
								<div className="text-red-default font-light text-sm">
									{passwordState.error && <span>{t(passwordState.error)}</span>}
								</div>
							</div>
							<Button
								label={t("sign-in")}
								type="submit"
								disabled={
									isSubmitting || (passwordState.errorCount > 2 && !captchaValue)
								}
							/>
							<div className="flex justify-between">
								<div className="flex items-center gap-2">
									<input
										type="checkbox"
										checked={values.rememberMe}
										name="rememberMe"
										onChange={handleChange}
										id="remember"
										className="h-5 w-5 p-5"
									/>
									<label htmlFor="remember">{t('remember-me')}</label>
								</div>
								<Link 
									onClick={() => window.scrollTo({top: 0,})}
									to="/reset" 
									className="hover:underline"
								>
									{t('forgot-password')}
								</Link>
							</div>
							{passwordState.errorCount > 2 && (
								<div>
									<ReCAPTCHA
										sitekey={`${siteKey}`}
										onChange={(val) => handleCaptchaChange}
									/>
								</div>
							)}
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default SignInPage;
