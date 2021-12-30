import { useEffect, useReducer, useState } from 'react';
import { app } from '../firebase/Firebase.config';
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

const db = getFirestore(app);
const timestamp = Timestamp;

//initialState
let initialState = {
  document: null,
  isLoading: false,
  error: null,
  success: null,
};

//reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'IS_LOADING': {
      return { document: null, isLoading: true, error: null, success: false };
    }

    case 'SUCCESS': {
      return {
        document: action.payload,
        isLoading: false,
        error: null,
        success: true,
      };
    }

    case 'DELETED_DOCUMENT': {
      return {
        document: null,
        isLoading: false,
        error: null,
        success: true,
      };
    }

    case 'UPDATED_DOC': {
      return {
        document: action.payload,
        isLoading: false,
        error: null,
        success: true,
      };
    }

    case 'ERROR': {
      return {
        document: null,
        isLoading: false,
        success: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

const useFireStore = (collectionName) => {
  ///states
  const [response, dispatch] = useReducer(reducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  //add document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_LOADING' });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const response = await addDoc(collection(db, `${collectionName}`), {
        ...doc,
        createdAt,
      });

      if (!isCancelled) {
        dispatch({ type: 'SUCCESS', payload: response });
      }
    } catch (error) {
      if (!isCancelled) {
        dispatch({ type: 'ERROR', payload: error.message });
      }
    }
  };

  //delete document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_LOADING' });

    try {
      await deleteDoc(doc(db, `${collectionName}`, id));
      if (!isCancelled) {
        dispatch({ type: 'DELETED_DOCUMENT' });
      }
    } catch (error) {
      if (!isCancelled) {
        dispatch({ type: 'ERROR', payload: error.message });
      }
    }
  };

  // upate document

  const updateDocument = async (id, updatedDoc) => {
    dispatch({ type: 'IS_LOADING' });

    try {
      const newUpdatedDocRef = doc(db, `${collectionName}`, id);
      await updateDoc(newUpdatedDocRef, {
        comments: updatedDoc,
      });

      dispatch({ type: 'UPDATED_DOC', payload: newUpdatedDocRef });

      return newUpdatedDocRef;
    } catch (error) {
      if (!isCancelled) {
        dispatch({ type: 'ERROR', payload: error.message });
      }
    }
  };

  //cleanup function

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { response, addDocument, deleteDocument, updateDocument };
};

export default useFireStore;
