import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  InsertEmoticon,
  Mic,
  SendOutlined,
  CancelOutlined,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import Picker from 'emoji-picker-react';
import Upload from '../../svg/Upload';

import { AuthContext } from '../../context/AuthContext';
import useFireStore from '../../hooks/useFireStore';
import { Timestamp } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes, getStorage } from 'firebase/storage';
import { app } from '../../firebase/Firebase.config';

const timestamp = Timestamp;
const storage = getStorage(app);

const ChatForm = ({ document, addMessagesHandler }) => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();

  const { updateDocument: updateRoomsMessage, response } =
    useFireStore('rooms');

  //states
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  //submit handler
  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    //for photoUpload
    let url;
    if (photo) {
      const photoRef = ref(
        storage,
        `images/${new Date().getTime()} - ${photo.name}`
      );
      const snap = await uploadBytes(photoRef, photo);
      url = await getDownloadURL(ref(storage, snap.ref.fullPath));
    }

    const newMessage = {
      creator: user.displayName,
      createdAt: timestamp.fromDate(new Date()),
      content: message,
      id: Math.random(),
      media: url || '',
    };

    if (pathname === `/room/${document.id}`) {
      await updateRoomsMessage(document.id, [...document.messages, newMessage]);
    }

    if (pathname === `/user/${document.id}`) {
      addMessagesHandler(message);
    }

    if (!response.error) {
      setMessage('');
      setPhoto(null);
    }
    setShowPicker(false);
  };

  //emoji picker
  const onEmojiClick = (e, emojiObject) => {
    setMessage((prevState) => prevState + emojiObject.emoji);
  };

  return (
    <div className="chat-footer">
      <InsertEmoticon
        onClick={() => setShowPicker((val) => !val)}
        style={{ cursor: 'pointer' }}
      />
      {showPicker && (
        <div className="emoji-picker">
          <Picker onEmojiClick={onEmojiClick} />

          <CancelOutlined onClick={() => setShowPicker(false)} />
        </div>
      )}

      <form onSubmit={handleSubmitMessage}>
        <label htmlFor="photo">
          <Upload />
        </label>
        {photo && 'Photo Added'}
        <input
          type="file"
          id="photo"
          style={{ display: 'none' }}
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {(message || photo) && (
          <Button type="submit" variant="outlined" endIcon={<SendOutlined />}>
            Send
          </Button>
        )}
      </form>

      <Mic />
    </div>
  );
};

export default ChatForm;
