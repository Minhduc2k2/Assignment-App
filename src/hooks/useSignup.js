import { useState, useEffect } from "react";
import {
  projectAuth,
  projectFireStore,
  projectStorage,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setIsPending(true);

    try {
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!res) {
        throw new Error("Could not complete sign up. Please try again.");
      }

      //TODO: Upload user thumbnail
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;

      const img = await projectStorage.ref(uploadPath).put(thumbnail);

      //TODO: Get user thumbnail
      const imgURL = await img.ref.getDownloadURL();

      //TODO: Add displayName & photoURL
      await res.user.updateProfile({
        displayName: displayName,
        photoURL: imgURL,
      });

      //TODO: Create user document
      await projectFireStore.collection("users").doc(res.user.uid).set({
        online: true,
        displayName: displayName,
        photoURL: imgURL,
      });

      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
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
  return { isPending, error, signup };
};
