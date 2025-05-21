import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./tailwind.output.css";
import App from "./App";
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
