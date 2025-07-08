import {
	browserLocalPersistence,
	browserSessionPersistence,
} from "firebase/auth";
import { useFormik } from "formik";
import { t } from "i18next";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { signInSchema } from "../../schemas/yupSchemas";
import {
	doSetPersistence,
	doSignInWithEmailAndPassword,
} from "../../services/firebaseAuth";
import { ISignIn } from "../../types/global";
import Button from "../Button/Button";
import HideShowPassButton from "../HideShowPassButton/HideShowPassButton";

const SignInForm = () => {
	const navigate = useNavigate();
	const [passwordType, setPasswordType] = useState<string>("password");
	const [passwordState, setPasswordState] = useState({
		error: "",
		errorCount: 0,
	});
	const [loading, setLoading] = useState<boolean>(false);
	const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

	const handleError = (errorCode: string) => {
		if (errorCode === "auth/invalid-credential") {
			setPasswordState((prev) => {
				return {
					...prev,
					error: "invalid-credential",
					errorCount: prev.errorCount + 1,
				};
			});
		} else {
			setPasswordState((prev) => ({ ...prev, error: errorCode }));
			console.log(errorCode);
		}
	};

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
			handleError(error.code);
		} finally {
			setLoading(false);
		}
	};

	const handleCaptchaChange = (value: string | null) => {
		setPasswordState((prev) => ({ ...prev, errorCount: 0 }));
	};

	const {
		values,
		handleBlur,
		isSubmitting,
		handleChange,
		handleSubmit,
		errors,
		touched,
	} = useFormik<ISignIn>({
		initialValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
		onSubmit,
		validationSchema: signInSchema,
	});

	if (loading) return <div>{t("loading")}</div>;

	return (
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
				{errors.email && touched.email && (
					<span className="text-red-default font-light text-sm">
						{t(errors.email)}
					</span>
				)}
			</div>
			<div className="relative">
				<HideShowPassButton
					setPasswordType={setPasswordType}
					passwordType={passwordType}
				/>
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
				{(passwordState.error || (errors.password && touched.password)) && (
					<span className="text-red-default font-light text-sm">
						{passwordState.error
							? t(passwordState.error)
							: errors.password && t(errors.password)}
					</span>
				)}
			</div>
			<Button
				label={t("sign-in")}
				type="submit"
				disabled={isSubmitting || passwordState.errorCount > 2}
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
					<label htmlFor="remember">{t("remember-me")}</label>
				</div>
				<Link
					onClick={() => window.scrollTo({ top: 0 })}
					to="/reset"
					className="hover:underline"
				>
					{t("forgot-password")}
				</Link>
			</div>
			{passwordState.errorCount > 2 && (
				<div>
					<ReCAPTCHA
						sitekey={`${siteKey}`}
						onChange={(val) => handleCaptchaChange(val)}
					/>
				</div>
			)}
		</form>
	);
};

export default SignInForm;
