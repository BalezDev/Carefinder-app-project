import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase.config";

const useAuth = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      }, (error) => {
        // Handle error if necessary
        console.error("Auth state change error:", error);
      });
      
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, []); // Empty dependency array to only run on mount/unmount

    return { currentUser };
};

export default useAuth;
