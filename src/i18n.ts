import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import es from "./locales/es.json";
import uk from "./locales/uk.json";
import hr from "./locales/hr.json";
import LanguageDetector from "i18next-browser-languagedetector";
import LocalStorageBackend from "i18next-localstorage-backend"; // or use i18next-http-backend for remote loading

i18n
	.use(LanguageDetector)
	.use(LocalStorageBackend)
	.use(initReactI18next)
	.init({
		resources: {
			en: { translation: en },
			es: { translation: es },
			uk: { translation: uk },
			hr: { translation: hr },
		},
		lng: "en",
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
