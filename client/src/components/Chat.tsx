import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import moment from 'moment';
function Chat({ eventId }: { eventId: string }) {
  const user = useSelector((state: any) => state.user);
  const [message, setMessage] = useState<any>([]);
  const socketRef = useRef<Socket>();
  const inputM = useRef<string | any>('');

  //nake the chat move to the bottom

  const messageEl = useRef<HTMLDivElement | null>(null);
  if (messageEl.current !== null) {
    messageEl.current.addEventListener('DOMNodeInserted', event => {
      messageEl.current!.scroll({
        top: messageEl.current!.scrollHeight,
        behavior: 'smooth',
      });
    });
  }

  useEffect(() => {
    const res = axios
      .get(`http://localhost:5000/allMessages/${eventId}`)
      .then(res => {
        setMessage(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    socketRef.current = io('http://localhost:5000');
    socketRef.current!.emit('join', {
      room: eventId,
    });
    socketRef.current.on('messageBack', ({ name, message }) => {
      console.log(name, message);
      setMessage((prev: any) => [...prev, { name, message }]);
    });
  }, []);

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socketRef.current!.emit('message', {
      name: user.email,
      message: inputM.current.value,
      room: eventId,
    });
    inputM.current.value = '';
  };

  return (
    <div className="chat">
      <div className="chatMessages" ref={messageEl}>
        {message.map((msg: any) => (
          <div
            className={msg.name === user.email ? 'myMessage' : 'PMessage'}
            key={msg.id}
          >
            <p className="messageName">{msg.name}</p>
            <p className="msgDate">
              {moment(msg.createdAt).format('DD/MM/YYYY') ===
              moment(new Date()).format('DD/MM/YYYY')
                ? `today , ${moment(msg.createdAt).format('HH:mm')}`
                : moment(msg.createdAt).format('DD/MM/YYYY , HH:mm')}
            </p>
            <div className="msg">{msg.message}</div>
          </div>
        ))}
      </div>
      <form onSubmit={e => sendMessage(e)} className="sendMessageInput">
        <input type="text" ref={inputM} />
        <button type="submit" className="send">
          send
        </button>
      </form>
    </div>
  );
}

export default Chat;