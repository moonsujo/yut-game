import { Html, Scroll } from "@react-three/drei";
import { socket } from "./SocketManager";
import { useAtomValue } from "jotai";
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "wouter";
import layout from "./layout";
import { messagesAtom } from "./GlobalState"
import ScrollToBottom from 'react-scroll-to-bottom';

export default function Chatbox({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1, 
  device='landscapeDesktop',
  boxHeight='300px',
  boxWidth='500px',
}) {

  const messages = useAtomValue(messagesAtom)
  const [message, setMessage] = useState('');
  const params = useParams();

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  function onMessageSubmit(e) {
    e.preventDefault();
    socket.emit("sendMessage", { message, roomId: params.id.toUpperCase() }, ({ joinRoomId, error }) => {
      if (error) {
        console.log('[sendMessage] error sending message to room', joinRoomId)
      } else {
        setMessage('')
      }
    })
  }

  function getColorByTeam(team) {
    if (team === undefined) {
      return 'grey'
    } else if (team == 0) {
      return 'red'
    } else {
      return 'turquoise'
    }
  }

  return <Html 
    position={position}
    rotation={rotation}
    scale={scale}
    transform
  >
    <div style={{
      position: 'absolute'
    }}>
      <div style={{
        borderRadius: layout[device].game.chat.box.borderRadius,
        height: boxHeight,
        width: boxWidth,
        padding: layout[device].game.chat.box.padding,
        fontSize: layout[device].game.chat.box.fontSize,
        'background': 'rgba(128, 128, 128, 0.3)',
        'overflowY': 'auto',
        'wordWrap': 'break-word',
        'letterSpacing': '1.5px'
      }}>
        {messages.map((value, index) => 
          <p style={{
            color: 'white', 
            margin: 0,
            fontFamily: 'Luckiest Guy'
            }} key={index}>
            <span style={{color: getColorByTeam(value.team)}}>{value.name}: </span> 
            {value.text}
          </p>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={(e) => onMessageSubmit(e)}>
        <input 
          id='input-message'
          style={{ 
            height: layout[device].game.chat.input.height,
            borderRadius: layout[device].game.chat.input.borderRadius,
            padding: layout[device].game.chat.input.padding,
            border: layout[device].game.chat.input.border,
            width: boxWidth,
            fontSize: layout[device].game.chat.input.fontSize,
            fontFamily: 'Luckiest Guy'
          }} 
          onChange={e => setMessage(e.target.value)} 
          value={message}
          placeholder="say something..."
        />
      </form>
    </div>
  </Html>
}