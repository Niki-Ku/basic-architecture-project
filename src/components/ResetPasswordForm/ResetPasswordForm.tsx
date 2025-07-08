import { t } from "i18next";
import React, { SetStateAction, useState } from "react";
import { doPasswordReset } from "../../services/firebaseAuth";
import Button from "../Button/Button";

const ResetPasswordForm = ({setIsSendReset} : {setIsSendReset : React.Dispatch<SetStateAction<boolean>>}) => {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (email) {
			try {
				setLoading(true);
				await doPasswordReset(email);
				setIsSendReset(true);
			} catch (error: any) {
				setError(error.code);
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
  };
  
  if (loading) return <div>{t("loading")}</div>;
  
	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-2">
			<input
				type="text"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder={t("email")}
				aria-label={t("email")}
				className="w-full h-10 border px-4 rounded bg-transparent border-bg-hover"
				required
			/>
			<div className="text-red-default font-light text-sm">
				{error && <span>{t(error)}</span>}
			</div>
			<Button label={t("send")} type="submit" />
		</form>
	);
};

export default ResetPasswordForm;
