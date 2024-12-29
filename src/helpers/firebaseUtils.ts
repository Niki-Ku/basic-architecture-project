import { addDoc, getDocs, query } from "firebase/firestore";
import { usersColection} from "../index";
import { FirebaseUser } from "../types/global";

export const addToDb = async (user:FirebaseUser | null, name:string) => {
	if (!user) {
    console.log("No user is signed in.");
    return;
	} 
	else {
		const { uid } = user;
		await addDoc(usersColection, { uid, name, account_id: await generateUniqueId() });
	}
};

export const generateUniqueId = async () => {
	const newId = Math.floor(Math.random() * 200_000_000);
	const q = query(usersColection);
	const docUsersSnap = await getDocs(q);
	docUsersSnap.forEach((doc) => {
		if (doc.data().account_id === newId) return generateUniqueId()
	})
	return newId;
}