import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { 
  audioOpenAtom, 
  clientAtom, 
  deviceAtom, 
  editGuestsOpenAtom, 
  editOneGuestOpenAtom, 
  gamePhaseAtom, 
  guestBeingEdittedAtom, 
  hostAtom, 
  languageAtom, 
  languageOpenAtom, 
  mainMenuOpenAtom, 
  musicAtom, 
  musicPlayingAtom, 
  musicVolumeAtom, 
  pauseGameAtom, 
  resetGameOpenAtom, 
  setGameRulesOpenAtom, 
  settingsOpenAtom, 
  soundEffectsAtom, 
  spectatorsAtom, 
  teamsAtom, 
  viewGameRulesOpenAtom, 
  viewGuestsOpenAtom } from "./GlobalState"
import { useParams } from "wouter"
import { useEffect, useState } from "react"
import { Image, Text3D } from "@react-three/drei"
import { socket } from "./SocketManager"
import layout from "./layout"
import { formatName } from "./helpers/helpers"
import GameRules from "./GameRules"
import MeshColors from "./MeshColors"
import useMusicPlayer from "./hooks/useMusicPlayer"

export default function Settings({ position, rotation=[0,0,0], scale }) {
  // #region state setters and getters
  const device = useAtomValue(deviceAtom)
  const client = useAtomValue(clientAtom)
  const host = useAtomValue(hostAtom)
  const gamePhase = useAtomValue(gamePhaseAtom)
  const pauseGame = useAtomValue(pauseGameAtom)
  const params = useParams()

  const [mainMenuOpen, setMainMenuOpen] = useAtom(mainMenuOpenAtom)
  const setSettingsOpen = useSetAtom(settingsOpenAtom)
  // edit players
  const [editGuestsOpen, setEditGuestsOpen] = useAtom(editGuestsOpenAtom)
  const [guestBeingEditted, setGuestBeingEditted] = useAtom(guestBeingEdittedAtom)
  const [editOneGuestOpen, setEditOneGuestOpen] = useAtom(editOneGuestOpenAtom)
  // the rest
  const [resetGameOpen, setResetGameOpen] = useAtom(resetGameOpenAtom)
  const [setGameRulesOpen, setSetGameRulesOpen] = useAtom(setGameRulesOpenAtom)
  const [viewGuestsOpen, setViewGuestsOpen] = useAtom(viewGuestsOpenAtom)
  const [viewGameRulesOpen, setViewGameRulesOpen] = useAtom(viewGameRulesOpenAtom)
  const [audioOpen, setAudioOpen] = useAtom(audioOpenAtom)
  const [languageOpen, setLanguageOpen] = useAtom(languageOpenAtom)
  const [language, setLanguage] = useAtom(languageAtom)
  const [inviteFriendsOpen, setInviteFriendsOpen] = useState(false)
  // #endregion

  function CloseButton({ position, rotation, scale }) {
    const [hover, setHover] = useState(false)

    function handlePointerEnter(e) {
      e.stopPropagation()
      setHover(true)
      document.body.style.cursor = 'pointer'
    }
    function handlePointerLeave(e) {
      e.stopPropagation()
      setHover(false)
      document.body.style.cursor = 'default'
    }
    function handlePointerUp(e) {
      e.stopPropagation()
      setSettingsOpen(false)
      
      // Turn off every other panel
      setMainMenuOpen(false)
      setEditGuestsOpen(false)
      setViewGuestsOpen(false)
      setResetGameOpen(false)
      setSetGameRulesOpen(false)
      setViewGameRulesOpen(false)
      setAudioOpen(false)
      setLanguageOpen(false)
      setInviteFriendsOpen(false)
    }

    return <group position={position} rotation={rotation} scale={scale}>
      {/* background */}
      <group name='background'>
        <mesh name='background-outer' scale={[1.55, 0.01, 0.55]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </mesh>
        <mesh name='background-inner' scale={[1.45, 0.02, 0.45]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh name='background-wrapper' 
        scale={[1.55, 0.02, 0.55]}
        onPointerEnter={e=>handlePointerEnter(e)}
        onPointerLeave={e=>handlePointerLeave(e)}
        onPointerUp={e=>handlePointerUp(e)}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
      </group>
      {/* text */}
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={[-0.63,0.02,0.14]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.26}
        height={0.01}
      >
        X CLOSE
        <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
      </Text3D>
    </group>
  }
  function BackButton({ position, rotation, scale }) {
    const [hover, setHover] = useState(false)

    function handlePointerEnter(e) {
      e.stopPropagation()
      setHover(true)
      document.body.style.cursor = 'pointer'
    }
    function handlePointerLeave(e) {
      e.stopPropagation()
      setHover(false)
      document.body.style.cursor = 'default'
    }
    function handlePointerUp(e) {
      e.stopPropagation()
      if (editGuestsOpen) {
        setEditGuestsOpen(false)
        setMainMenuOpen(true)
      } else if (editOneGuestOpen) {
        setEditOneGuestOpen(false)
        setEditGuestsOpen(true)
      } else if (resetGameOpen) {
        setResetGameOpen(false)
        setMainMenuOpen(true)
      } else if (setGameRulesOpen) {
        setSetGameRulesOpen(false)
        setMainMenuOpen(true)
      } else if (viewGuestsOpen) {
        setViewGuestsOpen(false)
        setMainMenuOpen(true)
      } else if (viewGameRulesOpen) {
        setViewGameRulesOpen(false)
        setMainMenuOpen(true)
      } else if (audioOpen) {
        setAudioOpen(false)
        setMainMenuOpen(true)
      } else if (languageOpen) {
        setLanguageOpen(false)
        setMainMenuOpen(true)
      } else if (inviteFriendsOpen) {
        setInviteFriendsOpen(false)
        setMainMenuOpen(true)
      }
    }

    return <group position={position} rotation={rotation} scale={scale}>
      {/* background */}
      <group name='background'>
        <mesh name='background-outer' scale={[1.55, 0.01, 0.55]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </mesh>
        <mesh name='background-inner' scale={[1.45, 0.02, 0.45]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh name='background-wrapper' 
        scale={[1.55, 0.02, 0.55]}
        onPointerEnter={e=>handlePointerEnter(e)}
        onPointerLeave={e=>handlePointerLeave(e)}
        onPointerUp={e=>handlePointerUp(e)}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
      </group>
      {/* text */}
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={[-0.63,0.02,0.14]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.26}
        height={0.01}
      >
        {`<< BACK`}
        <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
      </Text3D>
    </group>
  }

  function MainMenu({ position }) {
    
    // for host
    function EditGuestsButton({ position, rotation, scale }) {
      const [hover, setHover] = useState(false)
  
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        setEditGuestsOpen(true)
        setMainMenuOpen(false)
      }

      return <group position={position} rotation={rotation} scale={scale}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[5.5, 0.01, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[5.4, 0.02, 0.8]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='background-wrapper' scale={[5.5, 0.02, 0.9]}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-2.55,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          EDIT GUESTS
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }

    function SetAwayButton({ position, rotation, scale }) {
      const [hover, setHover] = useState(false)
  
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        socket.emit('setAway', { 
          roomId: params.id.toUpperCase(), 
          clientId: client._id, 
          name: client.name,
          team: client.team,
          status: client.status !== 'away' ? 'away' : 'playing' 
        }, (response) => {

        });
      }

      return <group position={position} rotation={rotation} scale={scale}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[5.5, 0.01, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[5.4, 0.02, 0.8]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='background-wrapper' scale={[5.5, 0.02, 0.9]}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-2.55,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          { client.status === 'away' ? `SET RETURNED` : `SET AWAY` }
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }

    function ResetGameButton({ position, rotation, scale }) {
      const [hover, setHover] = useState(false)
  
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        setResetGameOpen(true)
        setMainMenuOpen(false)
      }

      return <group position={position} rotation={rotation} scale={scale}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[5.5, 0.01, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[5.4, 0.02, 0.8]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='background-wrapper' 
          scale={[5.5, 0.02, 0.9]}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-2.55,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          RESET GAME
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }

    function PauseGameButton({ position, rotation, scale }) {
      const [hover, setHover] = useState(false)
  
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp() {
        if (!pauseGame)
          socket.emit('pauseGame', { roomId: params.id.toUpperCase(), clientId: client._id, flag: true });
        else 
          socket.emit('pauseGame', { roomId: params.id.toUpperCase(), clientId: client._id, flag: false });
      }

      function PauseGameContent() {
        return <group>
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-2.55,0.02,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            { `PAUSE GAME` }
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
          <group name='pause-symbol' position={[2.2, 0.02, 0]}>
            <mesh position={[0.18, 0, 0]} scale={[0.13, 0.01, 0.45]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
            <mesh position={[0, 0, 0]} scale={[0.13, 0.01, 0.45]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
          </group>
        </group>
      }
      function UnpauseGameContent() {
        return <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-2.55,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          { `UNPAUSE` }
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          <group name='unpause-symbol' position={[4.82, 0.2, 0]}>
            <mesh rotation={[Math.PI/2, Math.PI/2, 0]} scale={[0.25, 0.01, 0.25]}>
              <coneGeometry args={[1, 1, 3]}/>
              <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
            </mesh>
          </group>
        </Text3D>
      }

      return <group position={position} rotation={rotation} scale={scale}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[5.5, 0.01, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[5.4, 0.02, 0.8]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='background-wrapper' 
          scale={[5.5, 0.02, 0.9]}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        { !pauseGame && <PauseGameContent/> }
        { pauseGame && <UnpauseGameContent/> }
      </group>
    }

    function SetGameRulesButton({ position, rotation, scale }) {
      const [hover, setHover] = useState(false)
  
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        setSetGameRulesOpen(true)
        setMainMenuOpen(false)
      }

      return <group position={position} rotation={rotation} scale={scale}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[5.5, 0.01, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[5.4, 0.02, 0.8]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='background-wrapper' 
          scale={[5.5, 0.02, 0.9]}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-2.55,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          SET GAME RULES
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }

    // for guest
    function ViewGuestsButton({ position, rotation, scale }) {
      const [hover, setHover] = useState(false)
  
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        setViewGuestsOpen(true)
        setMainMenuOpen(false)
      }

      return <group position={position} rotation={rotation} scale={scale}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[5.5, 0.01, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[5.4, 0.02, 0.8]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='background-wrapper' 
          scale={[5.5, 0.02, 0.9]}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-2.55,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          VIEW GUESTS
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }

    function ViewGameRulesButton({ position, rotation, scale }) {
      const [hover, setHover] = useState(false)
  
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        setViewGameRulesOpen(true)
        setMainMenuOpen(false)
      }

      return <group position={position} rotation={rotation} scale={scale}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[5.5, 0.01, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[5.4, 0.02, 0.8]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='background-wrapper' 
          scale={[5.5, 0.02, 0.9]}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-2.55,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          VIEW GAME RULES
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }

    // for both
    function AudioButton({ position, rotation, scale }) {
      const [hover, setHover] = useState(false)
  
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        setAudioOpen(true)
        setMainMenuOpen(false)
      }

      return <group position={position} rotation={rotation} scale={scale}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[5.5, 0.01, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[5.4, 0.02, 0.8]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='background-wrapper' 
          scale={[5.5, 0.02, 0.9]}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-2.55,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          AUDIO
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }

    function LanguageButton({ position, rotation, scale }) {
      const [hover, setHover] = useState(false)
  
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        setLanguageOpen(true)
        setMainMenuOpen(false)
      }

      return <group position={position} rotation={rotation} scale={scale}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[5.5, 0.01, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[5.4, 0.02, 0.8]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='background-wrapper' 
          scale={[5.5, 0.02, 0.9]}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-2.55,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          LANGUAGE
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }

    function getPlayerType() {
      let isHost = false
      let isPlayer = false
      if (client.socketId === host.socketId) {
        isHost = true
      }
      if (client.team === 0 || client.team === 1) {
        isPlayer = true
      }
      if (isHost && isPlayer) {
        return 'hostPlayer'
      } else if (isHost && !isPlayer) {
        return 'hostSpectator'
      } else if (!isHost && isPlayer) {
        return 'guestPlayer'
      } else if (!isHost && !isPlayer) {
        return 'guestSpectator'
      }
    }
    // No 'Set Away' button
    const hostSpectatorButtons = [
      <EditGuestsButton/>,
      <ResetGameButton/>,
      <PauseGameButton/>,
      <SetGameRulesButton/>,
      <AudioButton/>,
      <LanguageButton/>
    ]
    const hostPlayerButtons = [
      <EditGuestsButton/>,
      // <SetAwayButton/>,
      <ResetGameButton/>,
      <PauseGameButton/>,
      <SetGameRulesButton/>,
      <AudioButton/>,
      <LanguageButton/>
    ]
    // No 'Set Away' button
    const guestSpectatorButtons = [
      <ViewGuestsButton/>,
      <ViewGameRulesButton/>,
      <AudioButton/>,
      <LanguageButton/>
    ]
    const guestPlayerButtons = [
      <ViewGuestsButton/>,
      // <SetAwayButton/>,
      <ViewGameRulesButton/>,
      <AudioButton/>,
      <LanguageButton/>
    ]
    const backgroundDimensions = {
      'hostSpectator': {
        position: [0,0,-0.5],
        scaleOuter: [6, 0.01, 6.95],
        scaleInner: [5.9, 0.02, 6.85]
      },
      'hostPlayer': {
        position: [0, 0, -2.55 + 0.5 * (hostPlayerButtons.length - 2)],
        scaleOuter: [6, 0.01, 1 * hostPlayerButtons.length + 1],
        scaleInner: [5.9, 0.02, 1 * hostPlayerButtons.length + 0.9]
      },
      'guestSpectator': {
        position: [0,0,-1.5],
        scaleOuter: [6, 0.01, 5],
        scaleInner: [5.9, 0.02, 4.9]
      },
      'guestPlayer': {
        position: [0, 0, -2.55 + 0.5 * (guestPlayerButtons.length - 2)],
        scaleOuter: [6, 0.01, 1 * guestPlayerButtons.length + 1],
        scaleInner: [5.9, 0.02, 1 * guestPlayerButtons.length + 0.9]
      },
    }
    
    return <group position={position}>
      {/* background */}
      <group name='background' position={ backgroundDimensions[getPlayerType()].position }>
        <mesh name='background-outer' scale={backgroundDimensions[getPlayerType()].scaleOuter}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh name='background-inner' scale={backgroundDimensions[getPlayerType()].scaleInner}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
      </group>
      {/* title */}
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={[-2.75,0.02,-3.3]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.45}
        height={0.01}
      >
        MENU
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      {/* close button */}
      <CloseButton position={[2, 0.02, -3.55]} rotation={[0,0,0]}/>
      {/* buttons */}
      { getPlayerType() === 'hostSpectator' && hostSpectatorButtons.map((value, index) => {
        return <group position={[0, 0.02, -2.65 + 1 * index]} key={index}>
          {value}
        </group>
      }) }
      { getPlayerType() === 'hostPlayer' && (client.team === 0 || client.team === 1) && hostPlayerButtons.map((value, index) => {
        return <group position={[0, 0.02, -2.65 + 1 * index]} key={index}>
          {value}
        </group>
      }) }
      { getPlayerType() === 'guestSpectator' && client.team === -1 && guestSpectatorButtons.map((value, index) => {
        return <group position={[0, 0.02, -2.65 + 1 * index]} key={index}>
          {value}
        </group>
      }) }
      { getPlayerType() === 'guestPlayer' && (client.team === 0 || client.team === 1) && guestPlayerButtons.map((value, index) => {
        return <group position={[0, 0.02, -2.65 + 1 * index]} key={index}>
          {value}
        </group>
      }) }
    </group>
  }

  function guestList() {
    const teams = useAtomValue(teamsAtom)
    const spectators = useAtomValue(spectatorsAtom)
    const guests = [] // includes host (and you)

    // you first, host, team rockets, team ufos, and spectators
    if (client.socketId === host.socketId) {
      guests.push({ 
        name: client.name,
        connectionState: client.connectedToRoom,
        isYou: true,
        isHost: true,
        team: client.team,
        status: client.status,
        _id: client._id
      }) // 'host, you'
    } else {
      guests.push({
        name: client.name,
        connectionState: client.connectedToRoom,
        isYou: true,
        isHost: false,
        team: client.team,
        status: client.status,
        _id: client._id
      }) // 'you'
      guests.push({
        name: host.name,
        connectionState: host.connectedToRoom,
        isYou: false,
        isHost: true,
        team: host.team,
        status: host.status,
        _id: host._id
      }) // 'host'
    }
    for (let teamId = 0; teamId < 2; teamId++) {
      for (const player of teams[teamId].players) {
        if (player.socketId !== client.socketId && player.socketId !== host.socketId) {
          guests.push({
            name: player.name,
            connectionState: player.connectedToRoom,
            isYou: false,
            isHost: false,
            team: player.team,
            status: player.status,
            _id: player._id
          })
        }
      }
    }
    for (const spectator of spectators) {
      if (spectator.socketId !== client.socketId && spectator.socketId !== host.socketId) {
        guests.push({
          name: spectator.name,
          connectionState: spectator.connectedToRoom,
          isYou: false,
          isHost: false,
          team: spectator.team,
          status: spectator.status,
          _id: spectator._id
        })
      }
    }
    console.log('[guestList] guests', guests)
    return guests
  }
  function mapTeamToBackgroundColor(team) {
    if (team === -1) {
      return '#313131'
    } else if (team === 0) {
      return '#3A0404'
    } else if (team === 1) {
      return '#04363A'
    }
  }
  function mapTeamToPlayerColor(team) {
    if (team === -1) {
      return '#9F9F9F'
    } else if (team === 0) {
      return 'red'
    } else if (team === 1) {
      return 'turquoise'
    }
  }
  function EditGuests({ position=[0,0,0], scale=1 }) {
    function ActionsButton({ guestInfo, position=[0,0,0] }) {
      const [hover, setHover] = useState(false)
  
      function handlePointerEnter (e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave (e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        setGuestBeingEditted(guestInfo)
        setEditOneGuestOpen(true)
        
        setMainMenuOpen(false)
        setEditGuestsOpen(false)
        setResetGameOpen(false)
        setSetGameRulesOpen(false)
        setAudioOpen(false)
        setLanguageOpen(false)
        setInviteFriendsOpen(false)
      }
  
      return <group position={position}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[2.6, 0.01, 0.8]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[2.5, 0.02, 0.7]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='wrapper'
            onPointerEnter={e => handlePointerEnter(e)}
            onPointerLeave={e => handlePointerLeave(e)}
            onPointerUp={e => handlePointerUp(e)}
            scale={[2.6,0.02,0.8]}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-1.12,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.42}
          height={0.01}
        >
          ACTIONS
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }

    return <group position={position} scale={scale}>
      {/* background */}
      <group name='background' position={[0, 0, -2 + (0.55)*(guestList().length)]}>
        {/* height: title + x * numGuests */}
        <mesh name='background-outer' scale={[10, 0.01, 1 + (1 + 0.1) * guestList().length]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh name='background-inner' scale={[9.9, 0.02, 0.9 + (1 + 0.1) * guestList().length]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
      </group>
      {/* title */}
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={[-4.75,0.02,-1.8]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.45}
        height={0.01}
      >
        EDIT GUESTS
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      {/* navigation buttons */}
      <BackButton position={[2.4, 0.02, -2.025]}/>
      <CloseButton position={[4, 0.02, -2.025]} rotation={[0,0,0]}/>
      {/* players */}
      { guestList().map((value, index) => {
        return <group name='guest' key={index} position={[0, 0.02, (-1 - 0.1) + (1 + 0.1) * index]}>
          {/* background */}
          <mesh name='background' scale={[9.6, 0.01, 1]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={mapTeamToBackgroundColor(value.team)}/>
          </mesh>
          {/* name */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-4.6,0,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            {formatName(value.name)}
            <meshStandardMaterial color={ value.connectionState !== true ? 'grey' : mapTeamToPlayerColor(value.team)}/>
          </Text3D>
          {/* actions / host-you indicator */}
          { value.isYou && value.isHost && <Text3D 
            font="/fonts/Luckiest Guy_Regular.json"
            position={[1.4,0,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            HOST     YOU
            <meshStandardMaterial color={mapTeamToPlayerColor(-1)}/>
          </Text3D> }
          { !value.isYou && !value.isHost && <ActionsButton guestInfo={value} position={[3.4,0.01,0]}/> }
        </group>
      })}
    </group>
  }

  function EditOneGuest({ position=[0,0,0], scale=1 }) {
    function SetTeamToRocketsButton({ position=[0,0,0] }) {
      const [hover, setHover] = useState(false);
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        socket.emit('setTeam', {
          roomId: params.id.toUpperCase(),
          clientId: client._id,
          name: guestBeingEditted.name,
          currTeamId: guestBeingEditted.team,
          newTeamId: 0
        }, (response) => {
          if (response === 'success') {
            setEditOneGuestOpen(false)
            setEditGuestsOpen(true)
          }
        })
      }
      return <group name='set-team-to-rockets-button' position={position}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[8.5, 0.01, 1]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'red' }/>
          </mesh>
          <mesh name='background-inner' scale={[8.4, 0.02, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='wrapper'
            onPointerEnter={e => handlePointerEnter(e)}
            onPointerLeave={e => handlePointerLeave(e)}
            onPointerUp={e => handlePointerUp(e)}
            scale={[8.5, 0.02, 1]}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-4,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          SET TEAM TO ROCKETS
          <meshStandardMaterial color={ hover ? 'green' : 'red' }/>
        </Text3D>
      </group>
    }
    function SetTeamToUfosButton({ position=[0,0,0] }) {
      const [hover, setHover] = useState(false);
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        socket.emit('setTeam', {
          roomId: params.id.toUpperCase(),
          clientId: client._id,
          name: guestBeingEditted.name,
          currTeamId: guestBeingEditted.team,
          newTeamId: 1
        }, (response) => {
          if (response === 'success') {
            setEditOneGuestOpen(false)
            setEditGuestsOpen(true)
          }
        })
      }
      return <group name='set-team-to-ufos-button' position={position}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[8.5, 0.01, 1]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'turquoise' }/>
          </mesh>
          <mesh name='background-inner' scale={[8.4, 0.02, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='wrapper'
            onPointerEnter={e => handlePointerEnter(e)}
            onPointerLeave={e => handlePointerLeave(e)}
            onPointerUp={e => handlePointerUp(e)}
            scale={[8.5, 0.02, 1]}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-4,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          SET TEAM TO UFOS
          <meshStandardMaterial color={ hover ? 'green' : 'turquoise' }/>
        </Text3D>
      </group>
    }
    function AssignHostButton({ position=[0,0,0] }) {
      const [hover, setHover] = useState(false);
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        socket.emit('assignHost', { 
          roomId: params.id.toUpperCase(),
          clientId: client._id,
          userId: guestBeingEditted._id,
          team: guestBeingEditted.team,
          name: guestBeingEditted.name
        }, (response) => {
          if (response === 'success') {
            setEditOneGuestOpen(false)
            setMainMenuOpen(true)
          }
        })
      }
      return <group name='assign-host-button' position={position}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[8.5, 0.01, 1]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[8.4, 0.02, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='wrapper'
            onPointerEnter={e => handlePointerEnter(e)}
            onPointerLeave={e => handlePointerLeave(e)}
            onPointerUp={e => handlePointerUp(e)}
            scale={[8.5, 0.02, 1]}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-4.05,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          ASSIGN HOST
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function KickButton({ position=[0,0,0] }) {
      const [hover, setHover] = useState(false);
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        socket.emit('kick', { 
          roomId: params.id.toUpperCase(),
          clientId: client._id,
          team: guestBeingEditted.team,
          name: guestBeingEditted.name,
        }, (response) => {
          if (response === 'success') {
            setEditOneGuestOpen(false)
            setGuestBeingEditted(null)
            setEditGuestsOpen(true)
          }
        })
      }
      return <group name='kick-button' position={position}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[8.5, 0.01, 1]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'red' }/>
          </mesh>
          <mesh name='background-inner' scale={[8.4, 0.02, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='wrapper'
            onPointerEnter={e => handlePointerEnter(e)}
            onPointerLeave={e => handlePointerLeave(e)}
            onPointerUp={e => handlePointerUp(e)}
            scale={[8.5, 0.02, 1]}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-4.05,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          KICK
          <meshStandardMaterial color={ hover ? 'green' : 'red' }/>
        </Text3D>
      </group>
    }
    function SetAwayHostButton({ position=[0,0,0] }) {
      const [hover, setHover] = useState(false);
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        // set player as away (skip to next player when he's chosen)
        socket.emit('setAway', { 
          roomId: params.id.toUpperCase(), 
          clientId: client._id, 
          name: guestBeingEditted.name, 
          team: guestBeingEditted.team, 
          status: guestBeingEditted.status === 'away' ? 'playing' : 'away' 
        }, (status) => {
          setGuestBeingEditted((guest) => {
            return {
              ...guest,
              status
            }
          })
        });
      }
      return <group name='set-away-host-button' position={position}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[8.5, 0.01, 1]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[8.4, 0.02, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='wrapper'
            onPointerEnter={e => handlePointerEnter(e)}
            onPointerLeave={e => handlePointerLeave(e)}
            onPointerUp={e => handlePointerUp(e)}
            scale={[8.5, 0.02, 1]}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-4.05,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          { guestBeingEditted.status === 'away' ? 'SET RETURNED' : 'SET AWAY' }
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function SetSpectatorButton({ position=[0,0,0] }) {
      const [hover, setHover] = useState(false);
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        // set player to spectator
        socket.emit('setTeam', {
          roomId: params.id.toUpperCase(),
          clientId: client._id,
          userId: guestBeingEditted._id,
          name: guestBeingEditted.name,
          currTeamId: guestBeingEditted.team,
          newTeamId: -1
        }, (response) => {
          if (response === 'success') {
            setEditOneGuestOpen(false)
            setEditGuestsOpen(true)
          }
        })
      }
      return <group name='set-spectator-button' position={position}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[8.5, 0.01, 1]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[8.4, 0.02, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='wrapper'
            onPointerEnter={e => handlePointerEnter(e)}
            onPointerLeave={e => handlePointerLeave(e)}
            onPointerUp={e => handlePointerUp(e)}
            scale={[8.5, 0.02, 1]}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-4.05,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          SET SPECTATOR
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    return <group position={position} scale={scale}>
      {/* background */}
      <group name='background'>
        <mesh name='background-outer' scale={[9, 0.01, 5.4]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh name='background-inner' scale={[8.9, 0.02, 5.3]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
      </group>
      {/* title */}
      <group name='title' position={[0.34, 0.02, -2.2]}>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-4.6,0,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          EDIT
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-3.2,0,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          {guestBeingEditted.name}
          <meshStandardMaterial color={mapTeamToPlayerColor(guestBeingEditted.team)}/>
        </Text3D>
      </group>
      {/* navigation */}
      <BackButton position={[1.9, 0.02, -2.225]}/>
      <CloseButton position={[3.5, 0.02, -2.225]}/>
      {/* action buttons */}
      { guestBeingEditted.team === -1 ? <group name='spectator-buttons'>
        <SetTeamToRocketsButton position={[0, 0.02, (-1 - 0.3) + (1 + 0.1) * 0]}/>
        <SetTeamToUfosButton position={[0, 0.02, (-1 - 0.3) + (1 + 0.1) * 1]}/>
        <AssignHostButton position={[0, 0.02, (-1 - 0.3) + (1 + 0.1) * 2]}/>
        <KickButton position={[0, 0.02, (-1 - 0.3) + (1 + 0.1) * 3]}/>
      </group> : <group name='player-buttons'>
        <SetAwayHostButton position={[0, 0.02, (-1 - 0.3) + (1 + 0.1) * 0]}/>
        <SetSpectatorButton position={[0, 0.02, (-1 - 0.3) + (1 + 0.1) * 1]}/>
        <AssignHostButton position={[0, 0.02, (-1 - 0.3) + (1 + 0.1) * 2]}/>
        <KickButton position={[0, 0.02, (-1 - 0.3) + (1 + 0.1) * 3]}/>
      </group> }
    </group>
  }

  function ResetGame(props) {
    function YesButton({ position=[0,0,0] }) {
      const [hover, setHover] = useState(false);
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        socket.emit('reset', { roomId: params.id.toUpperCase(), clientId: client._id })
        setMainMenuOpen(false)
        setResetGameOpen(false)
        setSettingsOpen(false)
      }
      return <group name='yes-button' position={position}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[4.2, 0.01, 1]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[4.1, 0.02, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='wrapper'
            onPointerEnter={e => handlePointerEnter(e)}
            onPointerLeave={e => handlePointerLeave(e)}
            onPointerUp={e => handlePointerUp(e)}
            scale={[4.25, 0.02, 1]}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-0.5,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          YES
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function NoButton({ position=[0,0,0] }) {
      const [hover, setHover] = useState(false);
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        setMainMenuOpen(false)
        setResetGameOpen(false)
        setSettingsOpen(false)
      }
      return <group name='no-button' position={position}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[4.2, 0.01, 1]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'red' }/>
          </mesh>
          <mesh name='background-inner' scale={[4.1, 0.02, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='wrapper'
            onPointerEnter={e => handlePointerEnter(e)}
            onPointerLeave={e => handlePointerLeave(e)}
            onPointerUp={e => handlePointerUp(e)}
            scale={[4.25, 0.02, 1]}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-0.4,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          NO
          <meshStandardMaterial color={ hover ? 'green' : 'red' }/>
        </Text3D>
      </group>
    }
    return <group {...props}>
      {/* background */}
      <group name='background'>
        <mesh name='background-outer' scale={[9, 0.01, 3.6]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh name='background-inner' scale={[8.9, 0.02, 3.5]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
      </group>
      {/* title */}
      <group name='title' position={[0.34, 0.02, -1.3]}>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-4.6,0,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          RESET GAME
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
      {/* navigation */}
      <BackButton position={[1.9, 0.02, -1.325]}/>
      <CloseButton position={[3.5, 0.02, -1.325]}/>
      {/* text */}
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={[-4.25,0.02,-0.3]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.45}
        height={0.01}
        lineHeight={0.8}
      >
        {`ALL PROGRESS WILL BE ERASED.\nARE YOU SURE?`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      {/* yes */}
      <YesButton position={[-2.15, 0.02, 1.1]}/>
      {/* no */}
      <NoButton position={[2.15, 0.02, 1.1]}/>
    </group>
  }

  function SetGameRules({ position }) {
    return <group position={position}>
      {/* background */}
      <group name='background'>
        <mesh name='background-outer' scale={[7.5, 0.01, 9.8]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh name='background-inner' scale={[7.4, 0.02, 9.7]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
      </group>
      {/* title */}
      <group name='title' position={[0.34, 0.02, -1.4]}>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-3.9,0,-2.8]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          SET RULES
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
      {/* navigation */}
      <BackButton position={[1.15, 0.02, -4.425]}/>
      <CloseButton position={[2.75, 0.02, -4.425]}/>
      {/* buttons */}
      <GameRules position={[-8.45, 0, 0.65]}/>
    </group>
  }

  function ViewGuests({ position, scale }) {
    return <group position={position} scale={scale}>
      {/* background */}
      <group name='background' position={[0, 0, -2 + (0.55)*(guestList().length)]}>
        {/* height: title + x * numGuests */}
        <mesh name='background-outer' scale={[10, 0.01, 1 + (1 + 0.1) * guestList().length]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh name='background-inner' scale={[9.9, 0.02, 0.9 + (1 + 0.1) * guestList().length]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
      </group>
      {/* title */}
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={[-4.75,0.02,-1.8]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.45}
        height={0.01}
      >
        VIEW GUESTS
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      {/* navigation buttons */}
      <BackButton position={[2.4, 0.02, -2.0]}/>
      <CloseButton position={[4, 0.02, -2.0]} rotation={[0,0,0]}/>
      {/* players */}
      { guestList().map((value, index) => {
        return <group name='guest' key={index} position={[0, 0.02, (-1 - 0.1) + (1 + 0.1) * index]}>
          {/* background */}
          <mesh name='background' scale={[9.6, 0.01, 1]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={mapTeamToBackgroundColor(value.team)}/>
          </mesh>
          {/* name */}
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            position={[-4.6,0,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            {formatName(value.name)}
            <meshStandardMaterial color={ value.connectionState !== true ? 'grey' : mapTeamToPlayerColor(value.team)}/>
          </Text3D>
          {/* actions / host-you indicator */}
          { !value.isYou && value.isHost && <Text3D 
            font="/fonts/Luckiest Guy_Regular.json"
            position={[3.1,0,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            HOST
            <meshStandardMaterial color={mapTeamToPlayerColor(-1)}/>
          </Text3D> }
          { value.isYou && !value.isHost && <Text3D 
            font="/fonts/Luckiest Guy_Regular.json"
            position={[3.1,0,0.2]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.45}
            height={0.01}
          >
            YOU
            <meshStandardMaterial color={mapTeamToPlayerColor(-1)}/>
          </Text3D> }
        </group>
      })}
    </group>
  }

  function ViewGameRules({ position }) {
    return <group position={position}>
      {/* background */}
      <group name='background'>
        <mesh name='background-outer' scale={[7.5, 0.01, 9.8]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh name='background-inner' scale={[7.4, 0.02, 9.7]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
      </group>
      {/* title */}
      <group name='title' position={[0.34, 0.02, -1.4]}>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-3.9,0,-2.8]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          VIEW RULES
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
      {/* navigation */}
      <BackButton position={[1.15, 0.02, -4.425]}/>
      <CloseButton position={[2.75, 0.02, -4.425]}/>
      {/* buttons */}
      <GameRules position={[-8.45, 0, 0.65]}/>
    </group>
  }

  function Audio({ position }) {
    const [playMusic, stopMusic] = useMusicPlayer()
    const [music, setMusic] = useAtom(musicAtom)

    function MusicRow({ position }) {
      const [hover, setHover] = useState(false)
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
      }
      function handlePointerUp(e) {
        // enable effects
        e.stopPropagation()
        setHover(false)
        if (!music) {
          playMusic()
        } else {
          stopMusic()
        }
      }
      return <group name='music' position={position}>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-2.75,0.02,0.14]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          MUSIC
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        {/* toggle */}
        <group name='music-toggle' position={[2.45, 0, -0.1]}>
          <mesh scale={[0.6,0.01,0.6]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='yellow'/>
          </mesh>
          <mesh scale={[0.5,0.02,0.5]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh scale={[0.6, 0.02, 0.6]}
          onPointerEnter={e=>handlePointerEnter(e)}
          onPointerLeave={e=>handlePointerLeave(e)}
          onPointerUp={e=>handlePointerUp(e)}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
          <mesh name='toggle' scale={[0.4, 0.03, 0.4]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ music ? 'yellow' : hover ? '#555500' : '#000000' }/>
          </mesh>
        </group>
      </group>
    }
    function EffectsRow({ position }) {
      const [hover, setHover] = useState(false)
      const [soundEffects, setSoundEffects] = useAtom(soundEffectsAtom)
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
      }
      function handlePointerUp(e) {
        // enable effects
        e.stopPropagation()
        setSoundEffects((effects) => {
          return effects ? false : true
        })
      }
      return <group name='effects' position={position}>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-2.75,0.02,0.14]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          EFFECTS
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        {/* toggle */}
        <group name='music-toggle' position={[2.45, 0, -0.1]}>
          <mesh scale={[0.6,0.01,0.6]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='yellow'/>
          </mesh>
          <mesh scale={[0.5,0.02,0.5]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh scale={[0.6, 0.02, 0.6]}
          onPointerEnter={e=>handlePointerEnter(e)}
          onPointerLeave={e=>handlePointerLeave(e)}
          onPointerUp={e=>handlePointerUp(e)}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
          <mesh name='toggle' scale={[0.4, 0.03, 0.4]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ soundEffects ? 'yellow' : hover ? '#555500' : '#000000' }/>
          </mesh>
        </group>
      </group>
    }
    return <group position={position}>
      {/* background */}
      <group name='background'>
        <mesh name='background-outer' scale={[6, 0.01, 2.7]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh name='background-inner' scale={[5.9, 0.02, 2.6]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
      </group>
      {/* title */}
      <group name='title' position={[1.84, 0.02, -0.85]}>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-4.6,0,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          AUDIO
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
      {/* navigation */}
      <BackButton position={[0.4, 0.02, -0.875]}/>
      <CloseButton position={[2.0, 0.02, -0.875]}/>
      {/* music */}
      <MusicRow position={[0, 0.02, 0.1]}/>
      <EffectsRow position={[0, 0.02, 0.9]}/>
    </group>
  }

  function Language({ position }) {
    function EnglishButton({ position=[0,0,0] }) {
      const [hover, setHover] = useState(false);
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
      }
      return <group name='english-button' position={position}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[7.5, 0.01, 1]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[7.4, 0.02, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='wrapper'
            onPointerEnter={e => handlePointerEnter(e)}
            onPointerLeave={e => handlePointerLeave(e)}
            onPointerUp={e => handlePointerUp(e)}
            scale={[8.5, 0.02, 1]}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-3.5, 0.02, 0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          ENGLISH
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
        {/* flag */}
      </group>
    }
    function KoreanButton({ position=[0,0,0] }) {
      const [hover, setHover] = useState(false);
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
      }
      return <group name='korean-button' position={position}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[7.5, 0.01, 1]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[7.4, 0.02, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='wrapper'
            onPointerEnter={e => handlePointerEnter(e)}
            onPointerLeave={e => handlePointerLeave(e)}
            onPointerUp={e => handlePointerUp(e)}
            scale={[8.5, 0.02, 1]}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-3.5, 0.02, 0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          KOREAN
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function SpanishButton({ position=[0,0,0] }) {
      const [hover, setHover] = useState(false);
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
      }
      return <group name='spanish-button' position={position}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[7.5, 0.01, 1]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[7.4, 0.02, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='wrapper'
            onPointerEnter={e => handlePointerEnter(e)}
            onPointerLeave={e => handlePointerLeave(e)}
            onPointerUp={e => handlePointerUp(e)}
            scale={[8.5, 0.02, 1]}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-3.5,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          SPANISH
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function ChineseButton({ position=[0,0,0] }) {
      const [hover, setHover] = useState(false);
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = 'pointer'
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = 'default'
      }
      function handlePointerUp(e) {
        e.stopPropagation()
      }
      return <group name='chinese-button' position={position}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[7.5, 0.01, 1]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[7.4, 0.02, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='wrapper'
            onPointerEnter={e => handlePointerEnter(e)}
            onPointerLeave={e => handlePointerLeave(e)}
            onPointerUp={e => handlePointerUp(e)}
            scale={[8.5, 0.02, 1]}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
        </group>
        {/* text */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-3.5,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          CHINESE
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    return <group position={position} scale={scale}>
      {/* background */}
      <group name='background'>
        <mesh name='background-outer' scale={[8, 0.01, 5.4]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh name='background-inner' scale={[7.9, 0.02, 5.3]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
      </group>
      {/* title */}
      <group name='title' position={[0.34, 0.02, -2.2]}>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-4.1,0,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          LANGUAGE
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
      {/* navigation */}
      <BackButton position={[1.4, 0.02, -2.225]}/>
      <CloseButton position={[3.0, 0.02, -2.225]}/>
      {/* action buttons */}
      <EnglishButton position={[0, 0.02, (-1 - 0.3) + (1 + 0.1) * 0]}/>
      <KoreanButton position={[0, 0.02, (-1 - 0.3) + (1 + 0.1) * 1]}/>
      <SpanishButton position={[0, 0.02, (-1 - 0.3) + (1 + 0.1) * 2]}/>
      <ChineseButton position={[0, 0.02, (-1 - 0.3) + (1 + 0.1) * 3]}/>
    </group>
  }

  return <group position={position} rotation={rotation} scale={scale}>
    { mainMenuOpen && <MainMenu position={layout[device].game.settings.mainMenu.position}/> }
    { editGuestsOpen && <EditGuests position={layout[device].game.settings.editGuests.position}/> }
    { editOneGuestOpen && <EditOneGuest position={layout[device].game.settings.editOneGuest.position}/> }
    { resetGameOpen && <ResetGame position={layout[device].game.settings.resetGame.position}/> }
    { setGameRulesOpen && <SetGameRules position={layout[device].game.settings.setGameRules.position}/> }
    { viewGuestsOpen && <ViewGuests position={layout[device].game.settings.editGuests.position}/> }
    { viewGameRulesOpen && <ViewGameRules position={layout[device].game.settings.setGameRules.position}/> }
    { audioOpen && <Audio position={layout[device].game.settings.audio.position}/> }
    { languageOpen && <Language position={layout[device].game.settings.language.position}/> }
  </group>
}