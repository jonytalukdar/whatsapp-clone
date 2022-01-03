import React, { useContext, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import useDocument from '../../hooks/useDocument';
import { app } from '../../firebase/Firebase.config';
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';

import './Chat.css';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import ChatHeader from './ChatHeader';
import { AuthContext } from '../../context/AuthContext';

const db = getFirestore(app);

const UserChat = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { document } = useDocument('users', id);
  //states
  const [msgs, setMsgs] = useState(null);

  const user1 = user.uid;
  const user2 = document && document.id;

  const addMessagesHandler = async (message) => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    await addDoc(collection(db, 'messages', id, 'chat'), {
      content: message,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      creator: user.displayName,
    });
  };

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, 'messages', id, 'chat');
    const q = query(msgsRef, orderBy('createdAt', 'asc'));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMsgs(messages);
    });
    return () => unsub();
  }, [user1, user2]);

  return (
    <div className="chat">
      <>
        {document && <ChatHeader document={document} />}
        {document && msgs && <ChatMessage documents={msgs} />}
        {document && msgs && (
          <ChatForm
            document={document}
            addMessagesHandler={addMessagesHandler}
          />
        )}
      </>
    </div>
  );
};

export default UserChat;
