import { useContext, useEffect, useState } from 'react';
import { app } from '../firebase/Firebase.config';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';

import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);

const useLogin = () => {
  const { dispatch } = useContext(AuthContext);

  //states
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signin = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      const user = response.user;

      if (!response) {
        throw new Error('Could not complete login!');
      }

      //update dispatch
      dispatch({ type: 'LOGIN', payload: user });

      if (!isCancelled) {
        setIsLoading(false);
        setError('');
      }
    } catch (error) {
      if (!isCancelled) {
        setIsLoading(false);
        setError(error.code);
      }
    }
  };

  //signin with google
  const provider = new GoogleAuthProvider();

  const signinWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(response);
      const token = credential.accessToken;

      const user = response.user;

      dispatch({ type: 'LOGIN', payload: user });
      if (!isCancelled) {
        setIsLoading(false);
        setError(error.code);
      }
    } catch (error) {
      if (!isCancelled) {
        setIsLoading(false);
        setError(error.code);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { signin, signinWithGoogle, error, isLoading };
};

export default useLogin;
