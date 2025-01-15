import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, fetchData } from "../src/store/actions/dataActions";
import "./App.css";
import { RootState } from "./store/index";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage/SearchPage";
import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";
import FaqPage from "./pages/FaqPage/FaqPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PrivacyPage from "./pages/PrivacyPage/PrivacyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage/TermsOfUsePage";
import CookieConsentBanner from "./components/CookieConsentBanner/CookieConsentBanner";
import PromotionalBanner from "./components/PromotionalBanner/PromotionalBanner";
import Banner from './assets/images/movie-trendy-banner-vector.jpg'
import { useThemeContext } from "./context/ThemeContext";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import PrivateRoute from "./context/PrivateRoute";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { getFromLocalStorage, setToLocalStorage } from "./helpers/storageUtils";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isPromotionalBannerVisible, setIsPromotionalBannerVisible] = useState<boolean>();
  const darkMode = useThemeContext();

  const date = new Date()
  const bannerShowedDate = getFromLocalStorage('bannerDate');
  useEffect(() => {
    const diffInMilliseconds = date.getTime() - bannerShowedDate;
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
    if (diffInDays > 1) {
      setToLocalStorage('bannerDate', date.getTime());
      setIsPromotionalBannerVisible(true);
    } else {
      setIsPromotionalBannerVisible(false);
    }
  }, [])

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    darkMode.setDarkMode(theme || "dark")
   }, [])

  const handleDarkModeChange = () => {
    darkMode.setDarkMode(prev => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }

  const handlePromotionalBannerClose = () => {
    setIsPromotionalBannerVisible(false);
  }

  const data = useSelector((state: RootState) => state.yourStateSlice.data);
  const loading = useSelector(
    (state: RootState) => state.yourStateSlice.loading
  );
  const error = useSelector((state: RootState) => state.yourStateSlice.error);

  useEffect(() => {
    const cookieConsent = document.cookie
      .split('; ')
      .find(row => row.startsWith('cookieConsent='));
    
    if (!cookieConsent) {
      setIsBannerVisible(true);
    }
  }, []);

  const setCookie = (name: string, value: string, days: number): void => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  };

  const handleAccept = (): void => {
    setCookie('cookieConsent', 'accepted', 30); // Set for 30 days
    setIsBannerVisible(false);
  };

  const handleDecline = (): void => {
    setCookie('cookieConsent', 'declined', 30); // Set for 30 days
    setIsBannerVisible(false);
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(data, "data");
  return (
    <div className={`App ${darkMode.darkMode === "dark" && 'dark-theme'}`}>
      <main className="bg-bg-primary text-text-default grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
        <Header darkMode={darkMode.darkMode} handleDarkModeChange={handleDarkModeChange} />
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/reset" element={<ResetPasswordPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/termsofuse" element={<TermsOfUsePage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="movies/:movieId" element={<MoviePage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/user" element={<UserPage />} />
          </Route>
        </Routes>
        <Footer />
        {isBannerVisible && (
          <CookieConsentBanner onAcceptClick={handleAccept} onDeclineClick={handleDecline} />
        )}
        {isPromotionalBannerVisible && (
          <PromotionalBanner image={Banner} alt="our new show" onCloseClick={handlePromotionalBannerClose}/>
        )}
      </main>
    </div>
  );
}

export default App;
