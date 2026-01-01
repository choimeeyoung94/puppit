import React from 'react';
import { useParams } from 'react-router-dom';

function ChatRoom() {
  const { roomId } = useParams();

  return (
    <div>
      <h2>Chat Room - {roomId}</h2>
      <p>Chat room page - To be implemented</p>
    </div>
  );
}

export default ChatRoom;

