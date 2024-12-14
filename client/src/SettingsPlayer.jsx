import { Text3D } from "@react-three/drei";
import Star from "./meshes/Star";
import { useState } from "react";

export default function SettingsPlayer(props) {
  // hover and open states
  // on click
  // clear-hover and close all others
  const [editPlayersOpen, setEditPlayersOpen] = useState(false)
  const [editPlayersHover, setEditPlayersHover] = useState(false)
  const [resetGameOpen, setResetGameOpen] = useState(false)
  const [resetGameHover, setResetGameHover] = useState(false)
  // fill in states and handle pointer functions

  function handleEditPlayersPointerEnter(e) {
    e.stopPropagation();
    setEditPlayersHover(true)
  }
  function handleEditPlayersPointerLeave(e) {
    e.stopPropagation();
    setEditPlayersHover(false)
  }
  function handleEditPlayersPointerUp(e) {
    e.stopPropagation();
    if (editPlayersOpen) {
      setEditPlayersOpen(false)
    } else {
      setEditPlayersOpen(true)
      setResetGameOpen(false)
    }
  }
  function handleResetGamePointerEnter(e) {
    e.stopPropagation();
    setResetGameHover(true)
  }
  function handleResetGamePointerLeave(e) {
    e.stopPropagation();
    setResetGameHover(false)
  }
  function handleResetGamePointerUp(e) {
    e.stopPropagation();
    if (resetGameOpen) {
      setResetGameOpen(false)
    } else {
      setResetGameOpen(true)
      setEditPlayersOpen(false)
    }
  }

  return <group {...props}>
    <group name='panel'>
      <mesh
        position={[0,0,0]} // temporary
        rotation={[0, 0, 0]}
        scale={[4,0.01,5.1]}
      >
        <boxGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial color='yellow'/>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        position={[0,0,0]} // temporary
        rotation={[0, 0, 0]}
        scale={[3.95,0.02, 5.05]}
      >
        <boxGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <Star 
      position={[-1.98, 0, -2.51]}
      scale={0.23}/>
    </group>
    {/* for visibility */}
    <group name='buttons'> 
      <group name='edit-player-button' position={[0, 0.1, -2.08]}>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.7,0.01,0.6]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (editPlayersOpen || editPlayersHover) ? 'green' : 'yellow' }/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.65,0.02,0.55]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.7,0.02,0.6]}
          onPointerEnter={e => handleEditPlayersPointerEnter(e)}
          onPointerLeave={e => handleEditPlayersPointerLeave(e)}
          onPointerUp={e => handleEditPlayersPointerUp(e)}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='white' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-1.7,0,0.15]}
          rotation={[-Math.PI/4,0,0]}
          size={0.3}
          height={0.01}
        >
          Edit Players
          <meshStandardMaterial color={ (editPlayersOpen || editPlayersHover) ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
      <group name='reset-game-button' position={[0, 0.1, -1.38]}>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.7,0.01,0.6]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (resetGameOpen || resetGameHover) ? 'green' : 'yellow' }/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.65,0.02,0.55]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.7,0.02,0.6]}
          onPointerEnter={e => handleResetGamePointerEnter(e)}
          onPointerLeave={e => handleResetGamePointerLeave(e)}
          onPointerUp={e => handleResetGamePointerUp(e)}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='white' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-1.7,0,0.15]}
          rotation={[-Math.PI/4,0,0]}
          size={0.3}
          height={0.01}
        >
          Reset Game
          <meshStandardMaterial color={ (resetGameOpen || resetGameHover) ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
      <group name='pause-game-button' position={[0, 0.1, -0.68]}>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.7,0.01,0.6]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (resetGameOpen || resetGameHover) ? 'green' : 'yellow' }/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.65,0.02,0.55]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.7,0.02,0.6]}
          onPointerEnter={e => handleResetGamePointerEnter(e)}
          onPointerLeave={e => handleResetGamePointerLeave(e)}
          onPointerUp={e => handleResetGamePointerUp(e)}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='white' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-1.7,0,0.15]}
          rotation={[-Math.PI/4,0,0]}
          size={0.3}
          height={0.01}
        >
          Pause Game
          <meshStandardMaterial color={ (resetGameOpen || resetGameHover) ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
      <group name='set-game-rules-button' position={[0, 0.1, 0.02]}>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.7,0.01,0.6]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (resetGameOpen || resetGameHover) ? 'green' : 'yellow' }/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.65,0.02,0.55]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.7,0.02,0.6]}
          onPointerEnter={e => handleResetGamePointerEnter(e)}
          onPointerLeave={e => handleResetGamePointerLeave(e)}
          onPointerUp={e => handleResetGamePointerUp(e)}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='white' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-1.7,0,0.15]}
          rotation={[-Math.PI/4,0,0]}
          size={0.3}
          height={0.01}
        >
          Set Game Rules
          <meshStandardMaterial color={ (resetGameOpen || resetGameHover) ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
      <group name='audio-button' position={[0, 0.1, 0.72]}>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.7,0.01,0.6]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (resetGameOpen || resetGameHover) ? 'green' : 'yellow' }/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.65,0.02,0.55]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.7,0.02,0.6]}
          onPointerEnter={e => handleResetGamePointerEnter(e)}
          onPointerLeave={e => handleResetGamePointerLeave(e)}
          onPointerUp={e => handleResetGamePointerUp(e)}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='white' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-1.7,0,0.15]}
          rotation={[-Math.PI/4,0,0]}
          size={0.3}
          height={0.01}
        >
          Audio
          <meshStandardMaterial color={ (resetGameOpen || resetGameHover) ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
      <group name='language-button' position={[0, 0.1, 1.42]}>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.7,0.01,0.6]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (resetGameOpen || resetGameHover) ? 'green' : 'yellow' }/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.65,0.02,0.55]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.7,0.02,0.6]}
          onPointerEnter={e => handleResetGamePointerEnter(e)}
          onPointerLeave={e => handleResetGamePointerLeave(e)}
          onPointerUp={e => handleResetGamePointerUp(e)}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='white' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-1.7,0,0.15]}
          rotation={[-Math.PI/4,0,0]}
          size={0.3}
          height={0.01}
        >
          Language
          <meshStandardMaterial color={ (resetGameOpen || resetGameHover) ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
      <group name='invite-friends-button' position={[0, 0.1, 2.12]}>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.7,0.01,0.6]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (resetGameOpen || resetGameHover) ? 'green' : 'yellow' }/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.65,0.02,0.55]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
          scale={[3.7,0.02,0.6]}
          onPointerEnter={e => handleResetGamePointerEnter(e)}
          onPointerLeave={e => handleResetGamePointerLeave(e)}
          onPointerUp={e => handleResetGamePointerUp(e)}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='white' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={[-1.7,0,0.15]}
          rotation={[-Math.PI/4,0,0]}
          size={0.3}
          height={0.01}
        >
          Invite Friends
          <meshStandardMaterial color={ (resetGameOpen || resetGameHover) ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    </group>
  </group>
}

// how to layer elements
// board, pieces, menu, alert, yoot