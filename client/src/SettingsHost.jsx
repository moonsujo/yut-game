import { Image, Text3D } from "@react-three/drei";
import Star from "./meshes/Star";
import { useState } from "react";

export default function SettingsPlayer(props) {
  // #region state setters and getters
  const [mainMenuOpen, setMainMenuOpen] = useState(true)
  const [editPlayersOpen, setEditPlayersOpen] = useState(false)
  const [editPlayersHover, setEditPlayersHover] = useState(false)
  const [resetGameOpen, setResetGameOpen] = useState(false)
  const [resetGameHover, setResetGameHover] = useState(false)
  const [pauseGameOpen, setPauseGameOpen] = useState(false)
  const [pauseGameHover, setPauseGameHover] = useState(false)
  const [setGameRulesOpen, setSetGameRulesOpen] = useState(false)
  const [setGameRulesHover, setSetGameRulesHover] = useState(false)
  const [audioOpen, setAudioOpen] = useState(false)
  const [audioHover, setAudioHover] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [languageHover, setLanguageHover] = useState(false)
  const [inviteFriendsOpen, setInviteFriendsOpen] = useState(false)
  const [inviteFriendsHover, setInviteFriendsHover] = useState(false)
  // #endregion

  // #region pointer handlers
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
      setMainMenuOpen(false)
      setEditPlayersOpen(true)
      setResetGameOpen(false)
      setPauseGameOpen(false)
      setSetGameRulesOpen(false)
      setAudioOpen(false)
      setLanguageOpen(false)
      setInviteFriendsOpen(false)
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
      setMainMenuOpen(false)
      setEditPlayersOpen(false)
      setResetGameOpen(true)
      setPauseGameOpen(false)
      setSetGameRulesOpen(false)
      setAudioOpen(false)
      setLanguageOpen(false)
      setInviteFriendsOpen(false)
    }
  }
  function handlePauseGamePointerEnter(e) {
    e.stopPropagation();
    setPauseGameHover(true)
  }
  function handlePauseGamePointerLeave(e) {
    e.stopPropagation();
    setPauseGameHover(false)
  }
  function handlePauseGamePointerUp(e) {
    e.stopPropagation();
    if (pauseGameOpen) {
      setPauseGameOpen(false)
    } else {
      setMainMenuOpen(false)
      setEditPlayersOpen(false)
      setResetGameOpen(false)
      setPauseGameOpen(true)
      setSetGameRulesOpen(false)
      setAudioOpen(false)
      setLanguageOpen(false)
      setInviteFriendsOpen(false)
    }
  }
  function handleSetGameRulesPointerEnter(e) {
    e.stopPropagation();
    setSetGameRulesHover(true)
  }
  function handleSetGameRulesPointerLeave(e) {
    e.stopPropagation();
    setSetGameRulesHover(false)
  }
  function handleSetGameRulesPointerUp(e) {
    e.stopPropagation();
    if (setGameRulesOpen) {
      setSetGameRulesOpen(false)
    } else {
      setMainMenuOpen(false)
      setEditPlayersOpen(false)
      setResetGameOpen(false)
      setPauseGameOpen(false)
      setSetGameRulesOpen(true)
      setAudioOpen(false)
      setLanguageOpen(false)
      setInviteFriendsOpen(false)
    }
  }
  function handleAudioPointerEnter(e) {
    e.stopPropagation();
    setAudioHover(true)
  }
  function handleAudioPointerLeave(e) {
    e.stopPropagation();
    setAudioHover(false)
  }
  function handleAudioPointerUp(e) {
    e.stopPropagation();
    if (audioOpen) {
      setAudioOpen(false)
    } else {
      setMainMenuOpen(false)
      setEditPlayersOpen(false)
      setResetGameOpen(false)
      setPauseGameOpen(false)
      setSetGameRulesOpen(false)
      setAudioOpen(true)
      setLanguageOpen(false)
      setInviteFriendsOpen(false)
    }
  }
  function handleLanguagePointerEnter(e) {
    e.stopPropagation();
    setLanguageHover(true)
  }
  function handleLanguagePointerLeave(e) {
    e.stopPropagation();
    setLanguageHover(false)
  }
  function handleLanguagePointerUp(e) {
    e.stopPropagation();
    if (languageOpen) {
      setLanguageOpen(false)
    } else {
      setMainMenuOpen(false)
      setEditPlayersOpen(false)
      setResetGameOpen(false)
      setPauseGameOpen(false)
      setSetGameRulesOpen(false)
      setAudioOpen(false)
      setLanguageOpen(true)
      setInviteFriendsOpen(false)
    }
  }
  function handleInviteFriendsPointerEnter(e) {
    e.stopPropagation();
    setInviteFriendsHover(true)
  }
  function handleInviteFriendsPointerLeave(e) {
    e.stopPropagation();
    setInviteFriendsHover(false)
  }
  function handleInviteFriendsPointerUp(e) {
    e.stopPropagation();
    if (inviteFriendsOpen) {
      setInviteFriendsOpen(false)
    } else {
      setMainMenuOpen(false)
      setEditPlayersOpen(false)
      setResetGameOpen(false)
      setPauseGameOpen(false)
      setSetGameRulesOpen(false)
      setAudioOpen(false)
      setLanguageOpen(false)
      setInviteFriendsOpen(true)
    }
  }
  // #endregion

  return <group {...props}>
    { mainMenuOpen && <group name='main-menu'>
      <group name='background'>
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
          <meshStandardMaterial color='#090f16'/>
        </mesh>
        <Star 
        position={[-1.98, 0, -2.51]}
        scale={0.23}/>
      </group>
      <group name='buttons'> 
        <group name='edit-guests-button' position={[0, 0.1, -2.08]}>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.01,0.6]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={ (editGuestsOpen || editGuestsHover) ? 'green' : 'yellow' }/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.65,0.02,0.55]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='#090f16'/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.02,0.6]}
            onPointerEnter={e => handleEditGuestsPointerEnter(e)}
            onPointerLeave={e => handleEditGuestsPointerLeave(e)}
            onPointerUp={e => handleEditGuestsPointerUp(e)}
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
            EDIT GUESTS
            <meshStandardMaterial color={ (editGuestsOpen || editGuestsHover) ? 'green' : 'yellow' }/>
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
            <meshStandardMaterial color='#090f16'/>
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
            RESET GAME
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
            <meshStandardMaterial color={ pauseGameHover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.65,0.02,0.55]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='#090f16'/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.02,0.6]}
            onPointerEnter={e => handlePauseGamePointerEnter(e)}
            onPointerLeave={e => handlePauseGamePointerLeave(e)}
            onPointerUp={e => handlePauseGamePointerUp(e)}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='white' transparent opacity={0}/>
          </mesh>
          { !pauseGame && <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.7,0,0.15]}
            rotation={[-Math.PI/4,0,0]}
            size={0.3}
            height={0.01}
          >
            PAUSE GAME          ||
            <meshStandardMaterial color={ pauseGameHover ? 'green' : 'yellow' }/>
          </Text3D>}
          { pauseGame && <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.7,0,0.15]}
            rotation={[-Math.PI/4,0,0]}
            size={0.3}
            height={0.01}
          >
            UNPAUSE GAME
            <meshStandardMaterial color={ pauseGameHover ? 'green' : 'yellow' }/>
          </Text3D>}
        </group>
        <group name='set-game-rules-button' position={[0, 0.1, 0.02]}>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.01,0.6]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={ (setGameRulesOpen || setGameRulesHover) ? 'green' : 'yellow' }/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.65,0.02,0.55]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='#090f16'/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.02,0.6]}
            onPointerEnter={e => handleSetGameRulesPointerEnter(e)}
            onPointerLeave={e => handleSetGameRulesPointerLeave(e)}
            onPointerUp={e => handleSetGameRulesPointerUp(e)}
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
            SET GAME RULES
            <meshStandardMaterial color={ (setGameRulesOpen || setGameRulesHover) ? 'green' : 'yellow' }/>
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
            <meshStandardMaterial color={ (audioOpen || audioHover) ? 'green' : 'yellow' }/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.65,0.02,0.55]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='#090f16'/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.02,0.6]}
            onPointerEnter={e => handleAudioPointerEnter(e)}
            onPointerLeave={e => handleAudioPointerLeave(e)}
            onPointerUp={e => handleAudioPointerUp(e)}
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
            AUDIO
            <meshStandardMaterial color={ (audioOpen || audioHover) ? 'green' : 'yellow' }/>
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
            <meshStandardMaterial color={ (languageOpen || languageHover) ? 'green' : 'yellow' }/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.65,0.02,0.55]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='#090f16'/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.02,0.6]}
            onPointerEnter={e => handleLanguagePointerEnter(e)}
            onPointerLeave={e => handleLanguagePointerLeave(e)}
            onPointerUp={e => handleLanguagePointerUp(e)}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='white' transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.7,0.02,0.15]}
            rotation={[-Math.PI/2,0,0]}
            size={0.3}
            height={0.01}
          >
            LANGUAGE      EN<Image url='images/us-flag.png' position={[3.25,0.15,0]} scale={0.35}/>
            <meshStandardMaterial color={ (languageOpen || languageHover) ? 'green' : 'yellow' }/>
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
            <meshStandardMaterial color={ (inviteFriendsOpen || inviteFriendsHover) ? 'green' : 'yellow' }/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.65,0.02,0.55]}
          >
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='#090f16'/>
          </mesh>
          <mesh
            castShadow
            receiveShadow
            rotation={[0, 0, 0]}
            scale={[3.7,0.02,0.6]}
            onPointerEnter={e => handleInviteFriendsPointerEnter(e)}
            onPointerLeave={e => handleInviteFriendsPointerLeave(e)}
            onPointerUp={e => handleInviteFriendsPointerUp(e)}
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
            INVITE FRIENDS
            <meshStandardMaterial color={ (inviteFriendsOpen || inviteFriendsHover) ? 'green' : 'yellow' }/>
          </Text3D>
        </group> 
      </group>
    </group> }
    { editPlayersOpen && <group name='edit-players'>
      {/* title */}
      {/* navigation buttons */}
      {/* for each player, map item*/}
      
    </group> }
  </group>
}

// how to layer elements
// board, pieces, menu, alert, yoot