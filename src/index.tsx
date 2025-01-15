import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./tailwind.output.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store/index";
import { firebaseConfig } from "./config/firebaseConfig";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { ThemeProvider } from "./context/ThemeContext";
import "./i18n"
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const usersColection = collection(db, "users");
export {app, auth, db, usersColection}

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<ThemeProvider>
		<Provider store={store}>
			<Router>
				<AuthContextProvider>
					<QueryClientProvider client={queryClient}> 
						<App />
					</QueryClientProvider>
				</AuthContextProvider>
			</Router>
		</Provider>
	</ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
