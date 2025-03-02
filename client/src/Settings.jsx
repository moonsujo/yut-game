import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { clientAtom, deviceAtom, editGuestsOpenAtom, editOneGuestOpenAtom, gamePhaseAtom, guestBeingEdittedAtom, hostAtom, languageAtom, mainMenuOpenAtom, pauseGameAtom, settingsOpenAtom, spectatorsAtom, teamsAtom } from "./GlobalState"
import { useParams } from "wouter"
import { useEffect, useState } from "react"
import { Text3D } from "@react-three/drei"
import { socket } from "./SocketManager"
import layout from "./layout"
import { formatName } from "./helpers/helpers"

export default function Settings({ position, rotation, scale }) {
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
  const [resetGameOpen, setResetGameOpen] = useState(false)
  const [setGameRulesOpen, setSetGameRulesOpen] = useState(false)
  const [viewGuestsOpen, setViewGuestsOpen] = useState(false)
  const [viewGameRulesOpen, setViewGameRulesOpen] = useState(false)
  const [audioOpen, setAudioOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
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
        }, (response) => {});
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
          LANGUAGE
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }

    const hostBackgroundPosition = [0,0,0]
    const guestBackgroundPosition = [0,0,-1]
    const hostBackgroundOuterScale = [6, 0.01, 8.1]
    const hostBackgroundInnerScale = [5.9, 0.02, 8.0]
    const guestBackgroundOuterScale = [6, 0.01, 5.1]
    const guestBackgroundInnerScale = [5.9, 0.02, 5.0]
    const hostAudioButtonPosition = [0, 0.02, 2.4]
    const guestAudioButtonPosition = [0, 0.02, -0.1]
    const hostLanguageButtonPosition = [0, 0.02, 3.4]
    const guestLanguageButtonPosition = [0, 0.02, 0.9]
    return <group position={position}>
      {/* background */}
      <group name='background' position={ client.socketId === host.socketId ? hostBackgroundPosition : guestBackgroundPosition }>
        <mesh name='background-outer' 
        scale={client.socketId === host.socketId ? 
          hostBackgroundOuterScale :
          guestBackgroundOuterScale}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh name='background-inner' 
        scale={client.socketId === host.socketId ? 
          hostBackgroundInnerScale :
          guestBackgroundInnerScale}>
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
      <CloseButton position={[1.975, 0.02, -3.525]} rotation={[0,0,0]}/>
      {/* buttons */}
      { client.socketId === host.socketId && <EditGuestsButton position={[0, 0.02, -2.6]} rotation={[0,0,0]}/> }
      { client.socketId === host.socketId && <SetAwayButton position={[0, 0.02, -1.6]} rotation={[0,0,0]}/> }
      { client.socketId === host.socketId && <ResetGameButton position={[0, 0.02, -0.6]} rotation={[0,0,0]}/> }
      { client.socketId === host.socketId && <PauseGameButton position={[0, 0.02, 0.4]} rotation={[0,0,0]}/> }
      { client.socketId === host.socketId && <SetGameRulesButton position={[0, 0.02, 1.4]} rotation={[0,0,0]}/> }
      { client.socketId !== host.socketId && <ViewGuestsButton position={[0, 0.02, -1.1]} rotation={[0,0,0]}/> }
      { client.socketId !== host.socketId && <ViewGameRulesButton position={[0, 0.02, -0.1]} rotation={[0,0,0]}/> }
      <AudioButton 
      position={ client.socketId === host.socketId ? hostAudioButtonPosition : guestAudioButtonPosition } 
      rotation={[0,0,0]}/>
      <LanguageButton 
      position={ client.socketId === host.socketId ? hostLanguageButtonPosition : guestLanguageButtonPosition } 
      rotation={[0,0,0]}/>
    </group>
  }

  // -1 team: spectator
  function formatGuest({ name, connectionState, isHost, isYou, team, status, _id }) {
    return { name, connectionState, isHost, isYou, team, status, _id }
  }

  function guestList() {
    const teams = useAtomValue(teamsAtom)
    const spectators = useAtomValue(spectatorsAtom)
    const guests = [] // includes host (and you)

    // you first, host, team rockets, team ufos, and spectators
    if (client.socketId === host.socketId) {
      guests.push(formatGuest({ 
        name: client.name,
        connectionState: client.connectedToRoom,
        isYou: true,
        isHost: true,
        team: client.team,
        status: client.status,
        _id: client._id
      })) // 'host, you'
    } else {
      guests.push(formatGuest({
        name: client.name,
        connectionState: client.connectedToRoom,
        isYou: true,
        isHost: false,
        team: client.team,
        status: client.status,
        _id: client._id
      })) // 'you'
      guests.push(formatGuest({
        name: host.name,
        connectionState: host.connectedToRoom,
        isYou: false,
        isHost: true,
        team: host.team,
        status: host.status,
        _id: host._id
      })) // 'host'
    }
    for (let teamId = 0; teamId < 2; teamId++) {
      for (const player of teams[teamId].players) {
        if (player.socketId !== client.socketId && player.socketId !== host.socketId) {
          guests.push(formatGuest({
            name: player.name,
            connectionState: player.connectedToRoom,
            isYou: false,
            isHost: false,
            team: player.team,
            status: player.status,
            _id: player._id
          }))
        }
      }
    }
    for (const spectator of spectators) {
      if (spectator.socketId !== client.socketId && spectator.socketId !== host.socketId) {
        guests.push(formatGuest({
          name: spectator.name,
          connectionState: spectator.connectedToRoom,
          isYou: false,
          isHost: false,
          team: spectator.team,
          status: spectator.status,
          _id: spectator._id
        }))
      }
    }
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
            <meshStandardMaterial color={mapTeamToPlayerColor(value.team)}/>
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
          { !value.isYou && !value.isHost && <ActionsButton guestInfo={value} position={[3.4,0,0]}/> }
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

  function ResetGame() {

  }

  function SetGameRules() {

  }

  function ViewGuests() {

  }

  function ViewGameRules() {

  }

  function Audio() {

  }

  function Language() {

  }

  return <group position={position} rotation={rotation} scale={scale}>
    { mainMenuOpen && <MainMenu position={layout[device].game.settings.mainMenu.position}/> }
    { editGuestsOpen && <EditGuests position={layout[device].game.settings.editGuests.position}/> }
    { editOneGuestOpen && <EditOneGuest position={layout[device].game.settings.editOneGuest.position}/> }
    { resetGameOpen && <ResetGame/> }
    { setGameRulesOpen && <SetGameRules/> }
    { viewGuestsOpen && <ViewGuests/> }
    { viewGameRulesOpen && <ViewGameRules/> }
    { audioOpen && <Audio/> }
    { languageOpen && <Language/> }
  </group>
}