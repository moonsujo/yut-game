import React, { useState } from 'react';
import { auth } from './firebase'
import { signInAnonymously } from 'firebase/auth';
import { Text3D, Html } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { nameAtom, teamsAtom, socket } from './SocketManager';
import { useAtom } from 'jotai';
import layout from '../../layout';

export default function UserForm() {
  const [name, setName] = useAtom(nameAtom)
  const [alert, setAlert] = useState('')
  const [teams] = useAtom(teamsAtom)

  async function handleSubmit(e) {
    e.preventDefault()
    if (name.length == 0) {
      setAlert('Enter something')
    } else if (name.length > 15) {
      setAlert('Must be shorter than 16 characters.')
    } else if (!validateName(name)) {
      setAlert('Name is already taken.')
    } else {
      setAlert("let's go!")
      localStorage.setItem('userName', name)
      // await signInAnonymously(auth);
      socket.emit("submitName", { name })
    }
  }

  function validateName(name) {
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams[i].players.length; j++) {
        if (teams[i].players[j].displayName === name) {
          return false;
        }
      }
    }
    return true;
  }

  return (
      <form 
        className="user-form" 
        onSubmit={handleSubmit}>
        <h1 style={{ fontFamily: 'Luckiest Guy', color: 'yellow', fontSize: '70px' }}>YOOT GAME</h1>
        <h1 style={{ fontFamily: 'Luckiest Guy'}}>Enter your name</h1>
        <input 
          id='input-name'
          style={{ 
            height: '20px',
            borderRadius: '5px',
            padding: '5px',
            border: 0,
            fontFamily: 'Luckiest Guy'
          }} 
          onChange={e => setName(e.target.value)} 
          placeholder="Enter your name..."
        />
        <button
          style={{ 
            height: '50px',
            width: '60px',
            backgroundColor: 'yellow',
            marginTop: '5px',
            borderRadius: '5px',
            color: 'black',
            padding: '5px',
            fontFamily: 'Luckiest Guy'
          }}
          type="submit"
        >Submit</button>
        <div style={{ marginTop: '5px', fontFamily: 'Arial' }}>{alert}</div>
      </form>  
  )
}