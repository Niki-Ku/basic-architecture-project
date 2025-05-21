import { useQuery } from "react-query";
import { getUserFromDb } from "../helpers/firebaseUtils";
import { DbUser } from "../types/global";
import { useAuth } from "../context/AuthContext";

export const useDbUser = () => {
	const { currentUser } = useAuth();

	return useQuery<DbUser | undefined>(
		["user", currentUser],
		() => getUserFromDb(currentUser?.uid),
		{ refetchInterval: 10000 }
	);
};
