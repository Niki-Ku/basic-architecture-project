import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./tailwind.output.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./context/AuthContext";
import { HeroUIProvider } from "@heroui/system";
import ErrorBoundary from "./context/ErrorBoundary";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<ErrorBoundary>
		<ThemeProvider>
			<HeroUIProvider>
				<Router>
					<AuthContextProvider>
						<QueryClientProvider client={queryClient}>
							<App />
						</QueryClientProvider>
					</AuthContextProvider>
				</Router>
			</HeroUIProvider>
		</ThemeProvider>
	</ErrorBoundary>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
