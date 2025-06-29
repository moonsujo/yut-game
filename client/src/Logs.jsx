
import { useAtom, useAtomValue } from "jotai"
import { connectedToServerAtom, gameLogsAtom, gamePhaseAtom } from "./GlobalState"
import { messagesAtom } from "./GlobalState"
import { logDisplayAtom } from "./GlobalState"
import { Html } from "@react-three/drei"
import layout from "./layout"

export default function Logs({ position, rotation, scale, device }) {
  const gameLogs = useAtomValue(gameLogsAtom)
  const messages = useAtomValue(messagesAtom)
  const gamePhase = useAtomValue(gamePhaseAtom)
  const connectedToServer = useAtomValue(connectedToServerAtom)
  const [logDisplay, setLogDisplay] = useAtom(logDisplayAtom)

  function ChatButton({ position, rotation, scale }) {
    const [hover, setHover] = useState(false)
    function handlePointerEnter(e) {
      e.stopPropagation();
      if (!hover) {
        setHover(true)
        document.body.style.cursor = "pointer";
      }
    }
    function handlePointerMove(e) {
      e.stopPropagation();
      if (!hover) {
        setHover(true)
        document.body.style.cursor = "pointer";
      }
    }
    function handlePointerLeave(e) {
      e.stopPropagation();
      if (hover) {
        setHover(false)
        document.body.style.cursor = "default";
      }
    }
    function handlePointerDown(e) {
      e.stopPropagation();
      if (logDisplay !== 'chat') {
        setLogDisplay('chat')
      }
    }

    return <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <meshStandardMaterial color={(hover || logDisplay === 'chat') ? 'green' : 'yellow'}/>
        <boxGeometry args={layout[device].game.chat.button.outerBox.args}/>
      </mesh>
      <mesh>
        <boxGeometry args={layout[device].game.chat.button.innerBox.args}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
        onPointerMove={e => handlePointerMove(e)}
      >
        <boxGeometry args={[
          layout[device].game.chat.button.outerBox.args[0],
          layout[device].game.chat.button.innerBox.args[1],
          layout[device].game.chat.button.outerBox.args[2]
        ]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={layout[device].game.chat.button.text.position}
        rotation={layout[device].game.chat.button.text.rotation}
        size={layout[device].game.chat.button.text.size}
        height={layout[device].game.chat.button.text.height}
      >
        <meshStandardMaterial color={(hover || logDisplay === 'chat') ? 'green' : 'yellow'}/>
        Chat
      </Text3D>
    </group>
  }

  function LogsButton({ position, rotation, scale }) {
    const [hover, setHover] = useState(false)
    function handlePointerEnter(e) {
      e.stopPropagation();
      if (!hover) {
        setHover(true)
        document.body.style.cursor = "pointer";
      }
    }
    function handlePointerMove(e) {
      e.stopPropagation();
      if (!hover) {
        setHover(true)
        document.body.style.cursor = "pointer";
      }
    }
    function handlePointerLeave(e) {
      e.stopPropagation();
      if (hover) {
        setHover(false)
        document.body.style.cursor = "default";
      }
    }
    function handlePointerDown(e) {
      e.stopPropagation();
      if (logDisplay !== 'logs') {
        setLogDisplay('logs')
      }
    }

    return <group position={position} rotation={rotation} scale={scale}>
      <mesh>
        <meshStandardMaterial color={(hover || logDisplay === 'logs') ? 'green' : 'yellow'}/>
        <boxGeometry args={layout[device].game.chat.button.outerBox.args}/>
      </mesh>
      <mesh>
        <boxGeometry args={layout[device].game.chat.button.innerBox.args}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
        onPointerMove={e => handlePointerMove(e)}
      >
        <boxGeometry args={[
          layout[device].game.chat.button.outerBox.args[0],
          layout[device].game.chat.button.innerBox.args[1],
          layout[device].game.chat.button.outerBox.args[2]
        ]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={layout[device].game.chat.button.text.position}
        rotation={layout[device].game.chat.button.text.rotation}
        size={layout[device].game.chat.button.text.size}
        height={layout[device].game.chat.button.text.height}
      >
        <meshStandardMaterial color={(hover || logDisplay === 'logs') ? 'green' : 'yellow'}/>
        Logs
      </Text3D>
    </group>
  }

  return connectedToServer && (gamePhase === 'pregame' || gamePhase === 'game') && <group 
    name='logs'
    position={layout[device].game.chat.position}
    rotation={layout[device].game.chat.rotation}>
    <Chatbox
      device={device}
      boxHeight={layout[device].game.chat.box.height}
      boxWidth={layout[device].game.chat.box.width}
      scale={layout[device].game.chat.scale}
      messages={logDisplay === 'chat' ? messages : gameLogs}
      type={logDisplay}
    />
    <ChatButton 
      position={layout[device].game.chat.button.position} 
      rotation={layout[device].game.chat.button.rotation}
      scale={layout[device].game.chat.button.scale}/>
    <LogsButton
      position={layout[device].game.logs.button.position} 
      rotation={layout[device].game.logs.button.rotation}
      scale={layout[device].game.logs.button.scale}/>
  </group>
}