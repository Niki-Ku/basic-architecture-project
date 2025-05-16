import { createContext, ReactNode, startTransition, useContext, useEffect, useState } from "react";
import { initFirebase } from "../helpers/firebaseUtils";
import { User } from "firebase/auth";

interface IAuthContextType {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const useAuth = (): IAuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export const AuthContextProvider = ({ children } : { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState<boolean>(false);

  useEffect(() => {
    let unsubscribe: () => void;
    const getAuth = async ()=> {
      const { auth, onAuthStateChanged } = await initFirebase()
      if (auth && onAuthStateChanged) {
      unsubscribe = onAuthStateChanged(auth, (user) => {
        startTransition(() => {
          initializeUser(user);
          setAuthReady(true);
        });
      });
      }
    }
    getAuth();
    return () => {
      if (unsubscribe) unsubscribe();
    }
  }, [])

  const initializeUser = async (user: User | null) => {  
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value = {
    currentUser,
    userLoggedIn,
    loading
  }

  if (!authReady) return <div>Loading auth...</div>

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}