import {
	createContext,
	Dispatch,
	SetStateAction,
	ReactNode,
	useState,
	useContext,
} from "react";

export interface IThemeContext {
	darkMode: string;
	setDarkMode: Dispatch<SetStateAction<string>>;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);
export const useThemeContext = () => {
	const dark = useContext(ThemeContext);
	if (dark?.darkMode === undefined) {
		throw new Error("DarkMode is undefined");
	};
	return dark;
};
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [darkMode, setDarkMode] = useState("dark");

	return (
		<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
			{children}
		</ThemeContext.Provider>
	);
};
