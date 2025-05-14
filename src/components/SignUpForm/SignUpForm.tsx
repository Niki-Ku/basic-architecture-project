import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { addToDb } from "../../helpers/firebaseUtils";
import { registrationSchema } from "../../schemas/yupSchemas";
import { doCreateUserWithEmailAndPassword } from "../../services/firebaseAuth";
import Button from "../Button/Button";
import { IRegistration } from "../../types/global";

import TermsServiceAgreeLink from "../TermsServiceAgreeLink/TermsServiceAgreeLink";
import HideShowPassButton from "../HideShowPassButton/HideShowPassButton";

const SignUpForm = () => {
	const { t } = useTranslation();
	const [passwordType, setPasswordType] = useState<string>("password");
	const [loading, setLoading] = useState<boolean>(false);
	const [firebaseError, setFirebaseError] = useState<string | undefined>("");
	const navigate = useNavigate();

	const onSubmit = async () => {
		try {
			setLoading(true);
			const user = await doCreateUserWithEmailAndPassword(
				values.email,
				values.password
			);
			await addToDb(user, values.name);
			setLoading(false);
			navigate("/");
		} catch (error: any) {
			console.log(error);
			setFirebaseError(error?.code);
		}
	};

	const {
		values,
		handleBlur,
		isSubmitting,
		errors,
		touched,
		handleChange,
		handleSubmit,
	} = useFormik<IRegistration>({
		initialValues: {
			email: "",
			name: "",
			password: "",
			passwordRepeat: "",
			termsAndService: false,
		},
		onSubmit,
		validationSchema: registrationSchema,
	});

	if (loading) return <div>{t("loading")}</div>;

	if (firebaseError)
		return (
			<div>
				{t("error")}: {firebaseError}
			</div>
		);

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-5">
			<div>
				<input
					type="text"
					value={values.email}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={t("email")}
					aria-label={t("email")}
					name="email"
					className={`w-full h-10 border ${
						errors.email && touched.email
							? "border-red-default"
							: "border-bg-hover"
					} px-4 rounded bg-transparent`}
				/>
				{errors.email && touched.email && (
					<span className="text-red-default font-light text-sm">
						{t(errors.email)}
					</span>
				)}
			</div>
			<div>
				<input
					type="text"
					value={values.name}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={t("name")}
					aria-label={t("name")}
					name="name"
					className={`w-full h-10 border ${
						errors.name && touched.name
							? "border-red-default"
							: "border-bg-hover"
					} px-4 rounded bg-transparent`}
				/>
				{errors.name && touched.name && (
					<span className="text-red-default font-light text-sm">
						{t(errors.name)}
					</span>
				)}
			</div>
			<div className="relative">
				<HideShowPassButton
					passwordType={passwordType}
					setPasswordType={setPasswordType}
				/>
				<input
					type={passwordType}
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={t("password")}
					aria-label={t("password")}
					name="password"
					className={`w-full h-10 border px-4 rounded bg-transparent ${
						errors.password && touched.password
							? "border-red-default"
							: "border-bg-hover"
					}`}
				/>
				{errors.password && touched.password && (
					<span className="text-red-default font-light text-sm">
						{t(errors.password)}
					</span>
				)}
			</div>
			<div>
				<input
					type={passwordType}
					value={values.passwordRepeat}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={t("repeat-password")}
					aria-label={t("repeat-password")}
					name="passwordRepeat"
					className={`w-full h-10 border ${
						errors.passwordRepeat && touched.passwordRepeat
							? "border-red-default"
							: "border-bg-hover"
					} px-4 rounded bg-transparent`}
				/>
				{errors.passwordRepeat && touched.passwordRepeat && (
					<span className="text-red-default font-light text-sm">
						{t(errors.passwordRepeat)}
					</span>
				)}
			</div>
			<div className="text-sm flex">
				<input
					checked={values.termsAndService}
					onChange={handleChange}
					onBlur={handleBlur}
					name="termsAndService"
					type="checkbox"
					id="terms-and-service"
					className="self-start mt-[5px] mr-2"
				/>
				<TermsServiceAgreeLink />
			</div>
			<Button
				label={t("register")}
				type="submit"
				disabled={!values.termsAndService || isSubmitting}
			/>
			<div className="m-1"></div>
		</form>
	);
};

export default SignUpForm;
