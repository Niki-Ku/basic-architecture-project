import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button/Button";
import { doPasswordReset } from "../../services/firebaseAuth";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isSendReset, setIsSendReset] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        setLoading(true);
        await doPasswordReset(email);
        setIsSendReset(true);
      } catch (error: any) {
        setError(error.code)
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }
  
	return (
		<div className="relative">
			<div
				className="
        w-full h-[calc(100svh-70px)] md:h-[calc(100svh-78px)] min-h-[550px]
        bg-posters absolute"
			></div>
			<div className="w-full h-[calc(100svh-70px)] min-h-[550px]">
				<div className="w-full h-[calc(100svh-70px)] sm:rounded sm:h-[500px] sm:mt-10 sm:w-[450px] mx-auto px-[5%] bg-black-default sm:bg-black-70 z-10 relative">
          {isSendReset ?
            <div className="pt-10">
              <p className="text-lg">{t('we-sent-you-letter')}</p>
              <Link
                className="text-blue-500 hover:underline pt-4 inline-block"
                to="/login"
                onClick={() => window.scrollTo({top: 0,})}
              >
                {t('back-to-login-page')}
              </Link>
            </div>
          :
            <div>
              <h1 className="text-2xl sm:pt-10 sm:text-4xl text-white">{t("reset-password")}</h1>
              {loading ? (
                <div>{t('loading')}</div>
              ) : (
                <div>
                  <p className="my-4">{t('we-will-send-you-letter')}</p>
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
                    <Button
                      label={t("send")}
                      type="submit"
                    />
                  </form>
                </div>
              )}
            </div>
          }
				</div>
			</div>
		</div>
	);
}

export default ResetPasswordPage;