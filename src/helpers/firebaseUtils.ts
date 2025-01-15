import { addDoc, getDocs, query } from "firebase/firestore";
import { usersColection} from "../index";
import { DbUser, FirebaseUser, Film } from "../types/global";

export const addToDb = async (user:FirebaseUser | null, name:string) => {
	if (!user) {
    console.log("No user is signed in.");
    return;
	} 
	else {
		const { uid } = user;
		await addDoc(usersColection, { uid, name, watchList: [] });
	}
};

export const getUsersList = async (): Promise<DbUser[] | undefined> => {
  try {
    const q = query(usersColection);
    const docUsersSnap = await getDocs(q);
    const users: DbUser[] = docUsersSnap.docs.map(doc => {
      const data = doc.data();
      return {
        docId: doc.id,
        name: data.name,
        uid: data.uid,
        watchList: data.watchList,
      };
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return undefined;
  }
};

export const getUserFromDb = async (id: string | undefined) => {
  if (id) {
    try {
      const users = await getUsersList();
      if (users) {
        const user = users.find(user => user.uid === id);
        return user;
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const removeMovieFromWatchList = (list: Film[], obj: Film) => {
  return list.filter(l => l.id !== obj.id)
}

export const addMovieToWatchList = (list: Film[], obj: Film) => {
  list.push(obj)
  return list
} 