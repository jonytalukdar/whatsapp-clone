import React from 'react';

import { useParams } from 'react-router-dom';
import useDocument from '../../hooks/useDocument';

import './Chat.css';
import ChatForm from './ChatForm';
import ChatMessage from './ChatMessage';
import ChatHeader from './ChatHeader';

const RoomChat = () => {
  //states
  const { id } = useParams();
  const { document } = useDocument('rooms', id);

  return (
    <div className="chat">
      <>
        {document && <ChatHeader document={document} />}
        {document && <ChatMessage documents={document.messages} />}
        {document && <ChatForm document={document} />}
      </>
    </div>
  );
};

export default RoomChat;
