import { Html, Scroll, ScrollControls } from "@react-three/drei";
import { socket } from "./SocketManager";
import { useAtomValue } from "jotai";
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useParams } from "wouter";
import layout from "./layout";
import { logDisplayAtom, messagesAtom } from "./GlobalState"
import useAutoScroll from "./hooks/useAutoScroll";
import DOMPurify from 'dompurify';

export default function Chatbox({ 
  position=[0,0,0], 
  rotation=[0,0,0], 
  scale=1, 
  device='landscapeDesktop',
  boxHeight,
  boxWidth,
  padding,
  fontSize,
  borderRadius,
}) {

  const messages = useAtomValue(messagesAtom)
  const logDisplay = useAtomValue(logDisplayAtom)
  const [message, setMessage] = useState('');
  const params = useParams();

  const messagesEndRef = useRef(null);

  const container = useRef()

  useAutoScroll(container, [messages, logDisplay]);
  
  function onMessageSubmit(e) {
    e.preventDefault();
    const sanitizedMessage = DOMPurify.sanitize(message).trimStart().trimEnd();
    if (sanitizedMessage) {
      socket.emit("sendMessage", { message: sanitizedMessage, roomId: params.id.toUpperCase() }, ({ joinRoomId, error }) => {
        if (error) {
          console.log('[sendMessage] error sending message to room', joinRoomId)
        } else {
          setMessage('')
        }
      })
    }
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
  transform>
    <div style={{
      position: 'absolute'
    }}>
      <form onSubmit={(e) => onMessageSubmit(e)}>
      <div ref={container} style={{
        borderRadius: borderRadius,
        height: boxHeight,
        width: boxWidth,
        padding: padding,
        fontSize: fontSize,
        'background': 'rgba(128, 128, 128, 0.3)',
        'overflowY': 'scroll',
        'wordWrap': 'break-word',
        'letterSpacing': '1.5px'
      }}>
        {messages.map((value, index) => <p style={{
          color: 'white', 
          fontFamily: 'Luckiest Guy',
          margin: '5px'
          }} 
          key={index}
          >
          <span style={{color: getColorByTeam(value.team)}}>{value.name}: </span> 
          {value.text}
        </p>
        )}
        <div ref={messagesEndRef}/>
        </div>
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
          onChange={e => { console.log('change'); setMessage(e.target.value)} }
          value={message}
          placeholder="say something..."
        />
      </form>
    </div>
  </Html>
}