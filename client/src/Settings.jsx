import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { clientAtom, deviceAtom, gamePhaseAtom, hostAtom, languageAtom, pauseGameAtom, settingsOpenAtom } from "./GlobalState"
import { useParams } from "wouter"
import { useState } from "react"
import { Text3D } from "@react-three/drei"

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
        <mesh name='background-outer' scale={[1.8, 0.01, 0.65]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </mesh>
        <mesh name='background-inner' scale={[1.7, 0.02, 0.55]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
        <mesh name='background-wrapper' 
        scale={[1.8, 0.02, 0.65]}
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
        position={[-0.72,0.02,0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.3}
        height={0.01}
      >
        X CLOSE
        <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
      </Text3D>
    </group>
  }

  function MainMenu() {
    
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
          <mesh name='background-outer' scale={[5.0, 0.01, 0.9]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh>
          <mesh name='background-inner' scale={[4.9, 0.02, 0.8]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='background-wrapper' 
          scale={[5.0, 0.02, 0.9]}
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
          position={[-2.3,0.02,0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.45}
          height={0.01}
        >
          EDIT GUESTS
          <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }

    return <group>
      {/* background */}
      <group name='background'>
        <mesh name='background-outer' scale={[5.5, 0.01, 8.5]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='yellow'/>
        </mesh>
        <mesh name='background-inner' scale={[5.4, 0.02, 8.4]}>
          <boxGeometry args={[1,1,1]}/>
          <meshStandardMaterial color='black'/>
        </mesh>
      </group>
      {/* title */}
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={[-2.5,0.02,-3.5]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.45}
        height={0.01}
      >
        MENU
        <meshStandardMaterial color='yellow'/>
      </Text3D>
      {/* close button */}
      <CloseButton position={[1.6,0.02,-3.7]} rotation={[0,0,0]}/>
      {/* buttons */}
      <EditGuestsButton position={[0,0.02,-2.8]} rotation={[0,0,0]}/>
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
    <group name='background'></group>
    { mainMenuOpen && <MainMenu/> }
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