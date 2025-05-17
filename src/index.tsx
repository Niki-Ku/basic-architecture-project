import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./tailwind.output.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/index";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n"
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./context/AuthContext";
import { HeroUIProvider } from "@heroui/system";
import { getMultiplePages } from "./helpers/fetchUtils";
import { fetchMovies } from "./api/MoviesApi";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const queryClient = new QueryClient();

queryClient.prefetchQuery(["allMovies"], () => getMultiplePages(1, "en"))
queryClient.prefetchQuery(["upcoming"], () => fetchMovies(1, "en", "upcoming"))
queryClient.prefetchQuery(["top_rated"], () => fetchMovies(1, "en", "top_rated"))
queryClient.prefetchQuery(["popular"], () => fetchMovies(1, "en", "popular"))
queryClient.prefetchQuery(["now_playing"], () => fetchMovies(1, "en", "now_playing"))

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<ErrorBoundary>
		<ThemeProvider>
			<HeroUIProvider>
				<Provider store={store}>
					<Router>
						<AuthContextProvider>
							<QueryClientProvider client={queryClient}> 
								<App />
							</QueryClientProvider>
						</AuthContextProvider>
					</Router>
				</Provider>
			</HeroUIProvider>
		</ThemeProvider>
	</ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
