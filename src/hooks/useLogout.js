import { useEffect, useState } from "react";
import { projectAuth, projectFireStore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch, user } = useAuthContext();
  const logout = async () => {
    setIsPending(true);

    try {
      //TODO: Update online state
      const { uid } = user;
      await projectFireStore
        .collection("users")
        .doc(uid)
        .update({ online: false });

      await projectAuth.signOut();

      dispatch({ type: "LOGOUT" });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setIsPending(false);
        setError(err.message);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { isPending, error, logout };
};
