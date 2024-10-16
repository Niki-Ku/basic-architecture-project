import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, fetchData } from "../src/store/actions/dataActions";
import "./App.css";
import { RootState } from "./store/index";

import { Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage/SearchPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserPage from "./pages/UserPage/UserPage";
import FaqPage from "./pages/FaqPage/FaqPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PrivacyPage from "./pages/PrivacyPage/PrivacyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage/TermsOfUsePage";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: RootState) => state.yourStateSlice.data);
  const loading = useSelector(
    (state: RootState) => state.yourStateSlice.loading
  );
  const error = useSelector((state: RootState) => state.yourStateSlice.error);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(data, "data");
  return (
    <div className="App">
      <main className="bg-gray-dark text-white grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
        <Header />
        <Routes >
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/termsofuse" element={<TermsOfUsePage />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
