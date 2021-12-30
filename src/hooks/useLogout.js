import { useContext, useEffect, useState } from 'react';

import { app } from '../firebase/Firebase.config';
import { getAuth, signOut } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';

import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);

const useLogout = () => {
  const { dispatch, user } = useContext(AuthContext);

  //states
  const [isCancelled, setIsCancelled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  //signout function
  const signout = async () => {
    setIsLoading(true);

    try {
      const { uid } = user;

      /// update online status
      const updatedUsers = doc(db, 'users', uid);
      await updateDoc(updatedUsers, {
        online: false,
      });

      await signOut(auth);

      dispatch({ type: 'LOGOUT' });

      //update state
      if (!isCancelled) {
        setIsLoading(false);
        setError('');
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.code);
        setIsLoading(false);
      }
    }
  };

  //cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isLoading, signout };
};

export default useLogout;
