import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useThemeContext } from "./context/ThemeContext";
import PrivateRoute from "./context/PrivateRoute";
import { getFromLocalStorage, setToLocalStorage } from "./helpers/storageUtils";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";

const PromotionalBanner = lazy(
	() => import("./components/PromotionalBanner/PromotionalBanner")
);
const UserPage = lazy(() => import("./pages/UserPage/UserPage"));
const FaqPage = lazy(() => import("./pages/FaqPage/FaqPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage/PrivacyPage"));
const TermsOfUsePage = lazy(
	() => import("./pages/TermsOfUsePage/TermsOfUsePage")
);
const SignUpPage = lazy(() => import("./pages/SignUpPage/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage/SignInPage"));
const ResetPasswordPage = lazy(
	() => import("./pages/ResetPasswordPage/ResetPasswordPage")
);
const MoviePage = lazy(() => import("./pages/MoviePage/MoviePage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));
const CookieConsentBanner = lazy(
	() => import("./components/CookieConsentBanner/CookieConsentBanner")
);

function App() {
	const [isBannerVisible, setIsBannerVisible] = useState(false);
	const [isPromotionalBannerVisible, setIsPromotionalBannerVisible] =
		useState<boolean>();
	const darkMode = useThemeContext();

	const date = new Date();
	const bannerShowedDate = getFromLocalStorage("bannerDate");

	useEffect(() => {
		const diffInMilliseconds = date.getTime() - bannerShowedDate;
		const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
		if (diffInDays > 1) {
			setToLocalStorage("bannerDate", date.getTime());
			setIsPromotionalBannerVisible(true);
		} else {
			setIsPromotionalBannerVisible(false);
		}
	}, []);

	useEffect(() => {
		const theme = localStorage.getItem("theme");
		darkMode.setDarkMode(theme || "dark");
	}, []);

	const handleDarkModeChange = () => {
		darkMode.setDarkMode((prev) => {
			const newTheme = prev === "dark" ? "light" : "dark";
			localStorage.setItem("theme", newTheme);
			return newTheme;
		});
	};

	const handlePromotionalBannerClose = () => {
		setIsPromotionalBannerVisible(false);
	};

	useEffect(() => {
		const cookieConsent = document.cookie
			.split("; ")
			.find((row) => row.startsWith("cookieConsent="));

		if (!cookieConsent) {
			setIsBannerVisible(true);
		}
	}, []);

	const setCookie = (name: string, value: string, days: number): void => {
		const expires = new Date(Date.now() + days * 864e5).toUTCString();
		document.cookie = `${name}=${value}; expires=${expires}; path=/`;
	};

	const handleAccept = (): void => {
		setCookie("cookieConsent", "accepted", 30);
		setIsBannerVisible(false);
	};

	const handleDecline = (): void => {
		setCookie("cookieConsent", "declined", 30);
		setIsBannerVisible(false);
	};

	return (
		<div className={`App ${darkMode.darkMode === "dark" && "dark-theme"}`}>
			<main className="bg-bg-primary text-text-default grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
					<Header
						darkMode={darkMode.darkMode}
						handleDarkModeChange={handleDarkModeChange}
					/>
				<Routes>
					<Route
						path="/"
						element={
							<Suspense fallback={<div className="h-[200svh]">Loading home...</div>}>
								<HomePage />
							</Suspense>
						}
					/>
					<Route
						path="/search"
						element={
							<Suspense fallback={<div className="h-[200svh]">Loading search...</div>}>
								<SearchPage />
							</Suspense>
						}
					/>
					<Route
						path="/login"
						element={
							<Suspense fallback={<div className="h-[100svh]">Loading login...</div>}>
								<SignInPage />
							</Suspense>
						}
					/>
					<Route
						path="/reset"
						element={
							<Suspense fallback={<div className="h-[100svh]">Loading reset...</div>}>
								<ResetPasswordPage />
							</Suspense>
						}
					/>
					<Route
						path="/faq"
						element={
							<Suspense fallback={<div className="h-[200svh]">Loading faq...</div>}>
								<FaqPage />
							</Suspense>
						}
					/>
					<Route
						path="/privacy"
						element={
							<Suspense fallback={<div className="h-[200svh]">Loading privacy...</div>}>
								<PrivacyPage />
							</Suspense>
						}
					/>
					<Route
						path="/termsofuse"
						element={
							<Suspense fallback={<div className="h-[200svh]">Loading terms...</div>}>
								<TermsOfUsePage />
							</Suspense>
						}
					/>
					<Route
						path="*"
						element={
							<Suspense fallback={<div className="h-[100svh]">Loading error...</div>}>
								<ErrorPage />
							</Suspense>
						}
					/>
					<Route
						path="/sign-up"
						element={
							<Suspense fallback={<div className="h-[100svh]">Loading sign up...</div>}>
								<SignUpPage />
							</Suspense>
						}
					/>
					<Route
						path="movies/:movieId"
						element={
							<Suspense fallback={<div className="h-[200svh]">Loading movie page...</div>}>
								<MoviePage />
							</Suspense>
						}
					/>
					<Route element={<PrivateRoute />}>
						<Route
							path="/user"
							element={
								<Suspense fallback={<div className="h-[200svh]">Loading user...</div>}>
									<UserPage />
								</Suspense>
							}
						/>
					</Route>
				</Routes>
					<Footer />
				{isBannerVisible && (
					<CookieConsentBanner
						onAcceptClick={handleAccept}
						onDeclineClick={handleDecline}
					/>
				)}
				<Suspense fallback={<div>Loading promo banner...</div>}>
					{isPromotionalBannerVisible && (
						<PromotionalBanner
							alt="our new show"
							onCloseClick={handlePromotionalBannerClose}
						/>
					)}
				</Suspense>
			</main>
		</div>
	);
}

export default App;
