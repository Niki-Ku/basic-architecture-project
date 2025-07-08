import { AuthContext } from "./AuthContext";
import React from "react";

export const MockAuthProvider = ({
	children,
	value = {
		userLoggedIn: true,
		currentUser: { email: "test@example.com" },
		loading: false,
	},
}: {
	children: React.ReactNode;
	value?: any;
}) => {
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
