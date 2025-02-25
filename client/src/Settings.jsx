import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { clientAtom, deviceAtom, gamePhaseAtom, hostAtom, languageAtom, pauseGameAtom, settingsOpenAtom } from "./GlobalState"
import { useParams } from "wouter"
import { useEffect, useState } from "react"
import { Text3D } from "@react-three/drei"
import { socket } from "./SocketManager"
import layout from "./layout"

export default function Settings({ position, rotation, scale }) {
  // #region state setters and getters
  const device = useAtomValue(deviceAtom)
  const client = useAtomValue(clientAtom)
  const host = useAtomValue(hostAtom)
  const gamePhase = useAtomValue(gamePhaseAtom)
  const pauseGame = useAtomValue(pauseGameAtom)
  const params = useParams()

  const [mainMenuOpen, setMainMenuOpen] = useState(true)
  const setSettingsOpen = useSetAtom(settingsOpenAtom)
  // edit players
  const [editGuestsOpen, setEditGuestsOpen] = useState(false)
  const [guestBeingEditted, setGuestBeingEditted] = useState(null)
  const [editAGuestOpen, setEditAGuestOpen] = useState(false)
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
    }
    function handlePointerLeave(e) {
      e.stopPropagation()
      setHover(false)
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

  function MainMenu({ position }) {
    
    // for host
    function EditGuestsButton({ position, rotation, scale }) {
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

    function ResetGameButton({ position, rotation, scale }) {
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
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
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
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
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
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
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
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
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
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
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
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
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
    const hostBackgroundOuterScale = [6, 0.01, 7.1]
    const hostBackgroundInnerScale = [5.9, 0.02, 7.0]
    const guestBackgroundOuterScale = [6, 0.01, 5.1]
    const guestBackgroundInnerScale = [5.9, 0.02, 5.0]
    const hostAudioButtonPosition = [0, 0.02, 1.9]
    const guestAudioButtonPosition = [0, 0.02, -0.1]
    const hostLanguageButtonPosition = [0, 0.02, 2.9]
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
        position={[-2.75,0.02,-2.8]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.45}
        height={0.01}
      >
        MENU
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      {/* close button */}
      <CloseButton position={[1.975, 0.02, -3.025]} rotation={[0,0,0]}/>
      {/* buttons */}
      { client.socketId === host.socketId && <EditGuestsButton position={[0, 0.02, -2.1]} rotation={[0,0,0]}/> }
      { client.socketId === host.socketId && <ResetGameButton position={[0, 0.02, -1.1]} rotation={[0,0,0]}/> }
      { client.socketId === host.socketId && <PauseGameButton position={[0, 0.02, -0.1]} rotation={[0,0,0]}/> }
      { client.socketId === host.socketId && <SetGameRulesButton position={[0, 0.02, 0.9]} rotation={[0,0,0]}/> }
      { client.socketId !== host.socketId && <ViewGuestsButton position={[0, 0.02, -2.1]} rotation={[0,0,0]}/> }
      { client.socketId !== host.socketId && <ViewGameRulesButton position={[0, 0.02, -1.1]} rotation={[0,0,0]}/> }
      <AudioButton 
      position={ client.socketId === host.socketId ? hostAudioButtonPosition : guestAudioButtonPosition } 
      rotation={[0,0,0]}/>
      <LanguageButton 
      position={ client.socketId === host.socketId ? hostLanguageButtonPosition : guestLanguageButtonPosition } 
      rotation={[0,0,0]}/>
    </group>
  }

  function EditGuests() {
    return 
  }

  function EditOneGuest() {
    
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
    { editGuestsOpen && <EditGuests/> }
    { editAGuestOpen && <EditOneGuest/> }
    { resetGameOpen && <ResetGame/> }
    { setGameRulesOpen && <SetGameRules/> }
    { viewGuestsOpen && <ViewGuests/> }
    { viewGameRulesOpen && <ViewGameRules/> }
    { audioOpen && <Audio/> }
    { languageOpen && <Language/> }
  </group>
}