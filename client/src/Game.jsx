// js
import React, { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import layout from "./layout.js";
import { useSpring, animated } from '@react-spring/three';

import Board from "./Board.jsx";
import PiecesSection from "./PiecesSection.jsx";
import Team from "./Team.jsx";
import GameCamera from "./GameCamera.jsx";
import DisconnectModal from "./DisconnectModal.jsx";
import JoinTeamModal from "./JoinTeamModal.jsx";

// three js
// import { Leva, useControls } from "leva"
import { Perf } from 'r3f-perf'

// server
import { socket } from "./SocketManager";
import { useParams } from "wouter";
import { 
  deviceAtom, 
  readyToStartAtom, 
  hostAtom, 
  disconnectAtom, 
  gamePhaseAtom, 
  turnAtom,
  legalTilesAtom,
  tilesAtom,
  helperTilesAtom,
  winnerAtom,
  clientAtom,
  joinTeamAtom,
  yootAnimationAtom,
  teamsAtom,
  hasTurnAtom,
} from "./GlobalState.jsx";
import MoveList from "./MoveList.jsx";
import PiecesOnBoard from "./PiecesOnBoard.jsx";
import ScoreButtons from "./ScoreButtons.jsx";
import RocketsWin from "./RocketsWin.jsx";
import UfosWin from "./UfosWin.jsx";
import { Text3D, useGLTF } from "@react-three/drei";
import { Color, MeshStandardMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import GameLog from "./GameLog.jsx";
import HowToPlay from "./HowToPlay.jsx";

// react spring
import { MeshDistortMaterial } from '@react-three/drei'
import YootNew from "./YootNew.jsx";
import YootButtonNew from "./YootButtonNew.jsx";
import useResponsiveSetting from "./ResponsiveSetting.jsx";
import MeteorsRealShader from "./shader/meteorsReal/MeteorsRealShader.jsx";

import QRCode from 'qrcode';
import QRCode3D from "./QRCode3D.jsx";

// There should be no state
export default function Game() {
  
  useResponsiveSetting();
  // const [playMusic] = useMusicPlayer();
  const [device] = useAtom(deviceAtom)
  const [disconnect] = useAtom(disconnectAtom)
  // To adjust board size
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [turn] = useAtom(turnAtom)
  const [hasTurn] = useAtom(hasTurnAtom);
  // To pass to Board
  const [legalTiles] = useAtom(legalTilesAtom)
  const [helperTiles] = useAtom(helperTilesAtom)
  const [tiles] = useAtom(tilesAtom)
  const [winner] = useAtom(winnerAtom)
  const [readyToStart] = useAtom(readyToStartAtom)
  const [host] = useAtom(hostAtom)
  const [showRulebook, setShowRulebook] = useState(false);
  const [client] = useAtom(clientAtom)
  const [teams] = useAtom(teamsAtom)
  const [yootAnimation] = useAtom(yootAnimationAtom);
  
  const params = useParams();

  useEffect(() => {
    socket.emit('joinRoom', { roomId: params.id })
    return (() => {
      // remove player from room (grey text)
      socket.emit('disconnectFromRoom', { roomId: params.id });
    })
  }, [])

  function LetsPlayButton({ position }) {

    function DisabledButton({ position, scale }) {
      const button = useRef();

      return <group position={position} scale={scale} ref={button}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          position={layout[device].game.letsPlayButton.disabledButton.border.position}
          rotation={layout[device].game.letsPlayButton.disabledButton.border.rotation}
          scale={layout[device].game.letsPlayButton.disabledButton.border.scaleInner}
        >
          <meshStandardMaterial color='black' transparent opacity={0.5}/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          position={layout[device].game.letsPlayButton.disabledButton.border.position}
          rotation={layout[device].game.letsPlayButton.disabledButton.border.rotation}
          scale={layout[device].game.letsPlayButton.disabledButton.border.scaleOuter}
        >
          <meshStandardMaterial color='gray' transparent opacity={1}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].game.letsPlayButton.disabledButton.text.position}
          rotation={layout[device].game.letsPlayButton.disabledButton.text.rotation}
          size={layout[device].game.letsPlayButton.disabledButton.text.size}
          height={layout[device].game.letsPlayButton.disabledButton.text.height}
          lineHeight={layout[device].game.letsPlayButton.disabledButton.text.lineHeight}
        >
          {`waiting\nfor\nplayers`}
          <meshStandardMaterial color='grey'/>
        </Text3D>
      </group>
    }

    function ActivatedButton({ position }) {

      const [pointerDown, setPointerDown] = useState(false);
      const [pushSprings, pushApi] = useSpring(() => ({        
        from: {
          scale: 1, 
        }
      }))

      const letsPlayTextMaterial = new MeshStandardMaterial({ color: new Color('limegreen') });
      const letsPlayBackgroundMaterial = new MeshStandardMaterial({ color: new Color('black'), transparent: true, opacity: 1 });
      const letsPlayButton = useRef()
      useFrame((state) => {
        const time = state.clock.elapsedTime;
        letsPlayTextMaterial.color.setHSL(Math.cos(time * 3) * 0.05 + 0.07, 1, 0.3);
        letsPlayButton.current.scale.x = Math.cos(time * 2) * 0.2 + 0.8;
      })
  
      const backdropHeight = layout[device].game.letsPlayButton.activeButton.backdropHeight
      const backdropWidth = layout[device].game.letsPlayButton.activeButton.backdropWidth
  
      function handlePointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = "pointer";
      }
      
      function handlePointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = "default";
        if (pointerDown) {
          setPointerDown(false)
          pushApi.start({
            from: {
              scale: 1.2
            },
            to: {
              scale: 1
            }
          })
        }
      }

      function handlePointerDown(e) {
        e.stopPropagation();
        setPointerDown(true)
        pushApi.start({
          from: {
            scale: 1,
          },
          to: {
            scale: 1.2
          }
        })
      }

      function handlePointerUp(e) {
        e.stopPropagation();
        if (readyToStart) {
          socket.emit("startGame", { roomId: params.id })
        }
        setPointerDown(false)
        pushApi.start({
          from: {
            scale: 1.2
          },
          to: {
            scale: 1
          }
        })
      }
  
      return <animated.group 
        name='lets-play-button-active' 
        position={position} 
        scale={pushSprings.scale}
      >
        <group ref={letsPlayButton}>
          <mesh 
            position={[0, 0, 0]} 
            rotation={[0, 0, 0]} 
            scale={[backdropWidth, 0.1, backdropHeight]} 
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            material={letsPlayBackgroundMaterial}
          >
            <cylinderGeometry args={[1, 1, 0.1, 48]}/>
          </mesh>
          <mesh 
            position={[0, 0, 0]} 
            rotation={[0, 0, 0]} 
            scale={[backdropWidth+0.1, 0.05, backdropHeight+0.1]} 
            material={letsPlayTextMaterial}
          >
            <cylinderGeometry args={[1, 1, 0.1, 48]}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={layout[device].game.letsPlayButton.activeButton.text.position}
            rotation={layout[device].game.letsPlayButton.activeButton.text.rotation}
            size={layout[device].game.letsPlayButton.activeButton.text.size}
            height={layout[device].game.letsPlayButton.activeButton.text.height}
            lineHeight={layout[device].game.letsPlayButton.activeButton.text.lineHeight}
            material={letsPlayTextMaterial}
          >
            {`Let's\nPlay!`}
          </Text3D>
        </group>
      </animated.group>
    }

    function WaitingForHostButton({ position, scale }) {    
      return <group position={position} scale={scale}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          position={layout[device].game.letsPlayButton.disabledButton.border.position}
          rotation={layout[device].game.letsPlayButton.disabledButton.border.rotation}
          scale={layout[device].game.letsPlayButton.disabledButton.border.scaleInner}
        >
          <meshStandardMaterial color='black' transparent opacity={0.5}/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          position={layout[device].game.letsPlayButton.disabledButton.border.position}
          rotation={layout[device].game.letsPlayButton.disabledButton.border.rotation}
          scale={layout[device].game.letsPlayButton.disabledButton.border.scaleOuter}
        >
          <meshStandardMaterial color='gray' transparent opacity={1}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].game.letsPlayButton.waitingForHostButton.text.position}
          rotation={layout[device].game.letsPlayButton.waitingForHostButton.text.rotation}
          size={layout[device].game.letsPlayButton.waitingForHostButton.text.size}
          height={layout[device].game.letsPlayButton.waitingForHostButton.text.height}
          lineHeight={layout[device].game.letsPlayButton.waitingForHostButton.text.lineHeight}
        >
          {`waiting\nfor\nhost`}
          <meshStandardMaterial color='grey'/>
        </Text3D>
      </group>
    }

    return <group>
      { host && host.socketId === client.socketId && gamePhase === 'lobby' && <group position={position}>
        { readyToStart ? <ActivatedButton
        position={layout[device].game.letsPlayButton.activeButton.position}/> : <DisabledButton 
        position={layout[device].game.letsPlayButton.disabledButton.position}
        scale={layout[device].game.letsPlayButton.disabledButton.scale}
        /> }
      </group> }
      { host && host.socketId !== client.socketId && gamePhase === 'lobby' && <group position={position}>
        { readyToStart ? <WaitingForHostButton
        position={layout[device].game.letsPlayButton.waitingForHostButton.position}
        scale={layout[device].game.letsPlayButton.waitingForHostButton.scale}/> : <DisabledButton 
        position={layout[device].game.letsPlayButton.disabledButton.position}
        scale={layout[device].game.letsPlayButton.disabledButton.scale}
        /> }
      </group> }
    </group>
  }

  function InitialJoinTeamModal({ position }) {
    const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom)
    // e.stopPropagation doesn't stop tile from being clicked
    
    const [joinRocketsHover, setJoinRocketsHover] = useState(false)
    const [joinUfosHover, setJoinUfosHover] = useState(false)

    function handleJoinRocketsPointerEnter(e) {
      e.stopPropagation()
      setJoinRocketsHover(true)
    }
    function handleJoinRocketsPointerLeave(e) {
      e.stopPropagation()
      setJoinRocketsHover(false)
    }
    function handleJoinRocketsClick(e) {
      e.stopPropagation()
      setJoinRocketsHover(false)
      setJoinTeam(0)
    }
    function handleJoinUfosPointerEnter(e) {
      e.stopPropagation()
      setJoinUfosHover(true)
    }
    function handleJoinUfosPointerLeave(e) {
      e.stopPropagation()
      setJoinUfosHover(false)
    }
    function handleJoinUfosClick(e) {
      e.stopPropagation()
      setJoinUfosHover(false)
      setJoinTeam(1)
    }
    return <group position={position}>
      { joinTeam === null && <group name='pick-a-team-modal'>
        <group name='background'>
          <mesh>
            <boxGeometry args={[7.6, 0.01, 5]}/>
            <meshStandardMaterial color='yellow'/>
          </mesh>
          <mesh>
            <boxGeometry args={[7.5, 0.02, 4.9]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
        </group>
        <Text3D name='guide-text'
          font="fonts/Luckiest Guy_Regular.json"
          position={[-2,0.03,-1.5]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.5}
          height={0.01}
        >
          pick a team
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <group name='join-rockets-button' position={[-1.8, 0.02, 0.3]}>
          <mesh>
            <boxGeometry args={[3.4, 0.01, 2.5]}/>
            <meshStandardMaterial color={ joinRocketsHover ? 'green' : 'red' }/>
          </mesh>
          <mesh>
            <boxGeometry args={[3.3, 0.02, 2.4]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh 
            name='wrapper'
            onPointerEnter={e => handleJoinRocketsPointerEnter(e)}
            onPointerLeave={e => handleJoinRocketsPointerLeave(e)}
            onClick={e => handleJoinRocketsClick(e)}
          >
            <boxGeometry args={[3.4, 0.02, 2.5]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.4,0.03,-0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.5}
            height={0.01}
          >
            {`join the\nrockets`}
            <meshStandardMaterial color={ joinRocketsHover ? 'green' : 'red' }/>
          </Text3D>
        </group>
        <group name='join-ufos-button' position={[1.8, 0.02, 0.3]}>
          <mesh>
            <boxGeometry args={[3.4, 0.01, 2.5]}/>
            <meshStandardMaterial color={ joinUfosHover ? 'green' : 'turquoise' }/>
          </mesh>
          <mesh>
            <boxGeometry args={[3.3, 0.02, 2.4]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh 
            name='wrapper'
            onPointerEnter={e => handleJoinUfosPointerEnter(e)}
            onPointerLeave={e => handleJoinUfosPointerLeave(e)}
            onClick={e => handleJoinUfosClick(e)}
          >
            <boxGeometry args={[3.4, 0.02, 2.5]}/>
            <meshStandardMaterial transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1.4,0.03,-0.3]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.5}
            height={0.01}
          >
            {`join the\nufos`}
            <meshStandardMaterial color={ joinUfosHover ? 'green' : 'turquoise' }/>
          </Text3D>
        </group>
      </group>}
    </group>
  }

  // Animations
  const { boardScale, boardPosition, gameScale, winScreenScale } = useSpring({
    boardScale: layout[device].game.board[gamePhase].scale,
    boardPosition: layout[device].game.board[gamePhase].position,
    gameScale: gamePhase !== 'finished' ? 1 : 1,
    winScreenScale: gamePhase === 'finished' ? 1 : 0
  })

  function DiscordButton({ position }) {
    const [hover, setHover] = useState(false);

    function handlePointerEnter(e) {
      e.stopPropagation();
      setHover(true);
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      setHover(false);
    }

    function handlePointerDown(e) {
      e.stopPropagation();
    }

    return <group position={position}>
      <mesh>
        <boxGeometry args={[1.83, 0.03, 0.55]}/>
        <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
      </mesh>
      <mesh>
        <boxGeometry args={[1.77, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[1.83, 0.1, 0.55]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.77, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={layout[device].game.discord.size}
        height={layout[device].game.discord.height}
      >
        DISCORD
        <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
      </Text3D>
    </group>
  }

  function SettingsButton({ position, scale }) {
    const yellowMaterial = new MeshStandardMaterial({ color: new Color('yellow')});

    function handlePointerEnter(e) {
      e.stopPropagation();
      yellowMaterial.color = new Color('green')
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      yellowMaterial.color = new Color('yellow')
    }

    function handlePointerDown(e) {
      e.stopPropagation();
    }

    return <group position={position} scale={scale}>
      <mesh
        material={yellowMaterial}
      >
        <boxGeometry args={[2.1, 0.03, 0.55]}/>
      </mesh>
      <mesh>
        <boxGeometry args={[2.05, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[1.2, 0.1, 0.6]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].game.settings.text.position}
        rotation={layout[device].game.settings.text.rotation}
        size={layout[device].game.settings.text.size}
        height={layout[device].game.settings.text.height}
        material={yellowMaterial}
      >
        Settings
      </Text3D>
    </group>
  }

  function RulebookButton({ position, scale }) {
    const [hover, setHover] = useState(false)

    function handlePointerEnter(e) {
      e.stopPropagation();
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      setHover(false)
    }

    function handlePointerDown(e) {
      e.stopPropagation();
      if (showRulebook) {
        setShowRulebook(false)
      } else {
        setShowRulebook(true)
      }
    }

    return <group position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[1.5, 0.03, 0.6]}/>
        <meshStandardMaterial color={ hover || showRulebook ? 'green': 'yellow' }/>
      </mesh>
      <mesh>
        <boxGeometry args={[1.45, 0.04, 0.5]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerDown(e)}
      >
        <boxGeometry args={[1.5, 0.1, 0.6]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.6,0.02,0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.3}
        height={0.01}
      >
        Rules
        <meshStandardMaterial color={ hover || showRulebook ? 'green': 'yellow' }/>
      </Text3D>
    </group>
  }

  function DisplayHostAndSpectating() {
    // case 0: spectating
    const Spectating = () => {
      return <Text3D 
        name='spectating-text'
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].game.spectating.position}
        rotation={layout[device].game.spectating.rotation}
        size={layout[device].game.spectating.size}
        height={layout[device].game.spectating.height}
      >
        {`SPECTATING`}
        <meshStandardMaterial color='grey'/>
      </Text3D>
    }
    
    // case 1: spectating and hosting
    const SpectatingAndHosting = () => {
      return <group>
        <Text3D 
          name='spectating-text'
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].game.spectatingAndHosting.line0Pos}
          rotation={layout[device].game.spectatingAndHosting.rotation}
          size={layout[device].game.spectatingAndHosting.size}
          height={layout[device].game.spectatingAndHosting.height}
        >
          {`SPECTATING`}
          <meshStandardMaterial color='grey'/>
        </Text3D>
        <Text3D 
          name='host-text'
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].game.spectatingAndHosting.line1Pos}
          rotation={layout[device].game.spectatingAndHosting.rotation}
          size={layout[device].game.spectatingAndHosting.size}
          height={layout[device].game.spectatingAndHosting.height}
        >
          {`HOST`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
      </group>
    }

    // case 2: hosting
    const Hosting = () => {
      return <Text3D 
        name='host-text'
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].game.hosting.position}
        rotation={layout[device].game.hosting.rotation}
        size={layout[device].game.hosting.size}
        height={layout[device].game.hosting.height}
      >
        {`HOST`}
        <meshStandardMaterial color='yellow'/>
      </Text3D>
    }

    if (host && client.team === -1 && client.socketId === host.socketId) {
      return <SpectatingAndHosting/>
    } else if (client.team === -1) {
      return <Spectating/>
    } else if (host && client.team !== -1 && client.socketId === host.socketId) {
      return <Hosting/>
    } else {
      return <></>
    }
  }

  // UI prop guideline
  // Pass position, rotation and scale
  // pass device if component has another responsive attribute
    // such as HtmlElement fontsize or team display
    // children positions
  // If state is contained globally, don't pass it as a prop
    // example: <Host/> is in this component. 'device' is
    // declared at the top. don't pass it in as a prop
    // because that will make other components render

  const { nodes, materials } = useGLTF("/models/rounded-rectangle.glb");

  function InviteInstructions() {
    const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

    const [hover, setHover] = useState(false);
    const [pointerDown, setPointerDown] = useState(false);
    const [springs, api] = useSpring(() => ({        
      from: {
        opacity: 0, 
      }
    }))
    const [pushSprings, pushApi] = useSpring(() => ({        
      from: {
        scale: 1, 
      }
    }))

    function handlePointerEnter(e) {
      e.stopPropagation();
      document.body.style.cursor = "pointer";
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      document.body.style.cursor = "default";
      setHover(false);
      if (pointerDown) {
        setPointerDown(false);
        pushApi.start({
          from: {
            scale: 1.2
          },
          to: {
            scale: 1
          }
        })
      }
    }

    function copyURLToClipboard() {
      const url = window.location.href;
    
      if (navigator.clipboard && navigator.clipboard.writeText) {
        // Modern browsers with Clipboard API support
        navigator.clipboard.writeText(url)
          .then(() => {
          })
          .catch(err => {
            console.error("Failed to copy URL: ", err);
          });
      } else {
        // Fallback for older browsers
        const tempInput = document.createElement("input");
        document.body.appendChild(tempInput);
        tempInput.value = url;
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
    }

    function handlePointerDown(e) {
      e.stopPropagation();  
      setPointerDown(true)
      pushApi.start({
        from: {
          scale: 1,
        },
        to: {
          scale: 1.2
        }
      })
    }

    function handlePointerUp(e) {
      e.stopPropagation();
      console.log(e)
      setPointerDown(false)
      copyURLToClipboard();
      api.start({
        from: {
          opacity: 1
        },
        to: [
          {
            opacity: 1
          },
          { 
            opacity: 0,
            delay: 500,
            config: {
              tension: 170,
              friction: 26
            }
          }
        ]
      })
      pushApi.start({
        from: {
          scale: 1.2
        },
        to: {
          scale: 1
        }
      })
    }

    return <group position={layout[device].game.invite.position}>
      <animated.group scale={ pushSprings.scale } position={layout[device].game.invite.button.position}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].game.invite.text.position}
          rotation={[-Math.PI/2, 0, 0]}
          size={layout[device].game.invite.text.size}
          height={0.01}
        >
          {layout[device].game.invite.text.content}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          position={layout[device].game.invite.border.position}
          rotation={layout[device].game.invite.border.rotation}
          scale={layout[device].game.invite.border.scaleInner}
          onPointerEnter={e => handlePointerEnter(e)}
          onPointerLeave={e => handlePointerLeave(e)}
          onPointerDown={e => handlePointerDown(e)}
          onPointerUp={e => handlePointerUp(e)}
        >
          <meshStandardMaterial color='black' transparent opacity={0.5}/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          position={layout[device].game.invite.border.position}
          rotation={layout[device].game.invite.border.rotation}
          scale={layout[device].game.invite.border.scaleOuter}
        >
          <meshStandardMaterial color='limegreen' transparent opacity={1}/>
        </mesh>
      </animated.group>
      <Text3D 
        name='copied-tooltip'
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].game.invite.copiedText.position}
        rotation={[-Math.PI/2, 0, 0]}
        size={layout[device].game.invite.copiedText.size}
        height={layout[device].game.invite.copiedText.height}
      >
        copied!
        <AnimatedMeshDistortMaterial
          speed={5}
          distort={0}
          color='limegreen'
          transparent
          opacity={springs.opacity}
        />
      </Text3D>
    </group>
  }

  function InviteInstructions2() {
    const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

    const [hover, setHover] = useState(false);
    const [pointerDown, setPointerDown] = useState(false);
    const [springs, api] = useSpring(() => ({        
      from: {
        opacity: 0, 
      }
    }))
    const [pushSprings, pushApi] = useSpring(() => ({ 
      from: {
        scale: 1, 
      }
    }))

    function handlePointerEnter(e) {
      e.stopPropagation();
      document.body.style.cursor = "pointer";
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      document.body.style.cursor = "default";
      setHover(false);
      if (pointerDown) {
        setPointerDown(false);
        pushApi.start({
          from: {
            scale: 1.2
          },
          to: {
            scale: 1
          }
        })
      }
    }

    function copyURLToClipboard() {
      const url = window.location.href;
    
      if (navigator.clipboard && navigator.clipboard.writeText) {
        // Modern browsers with Clipboard API support
        navigator.clipboard.writeText(url)
          .then(() => {
          })
          .catch(err => {
            console.error("Failed to copy URL: ", err);
          });
      } else {
        // Fallback for older browsers
        const tempInput = document.createElement("input");
        document.body.appendChild(tempInput);
        tempInput.value = url;
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
    }

    function handlePointerDown(e) {
      e.stopPropagation();  
      setPointerDown(true)
      pushApi.start({
        from: {
          scale: 1,
        },
        to: {
          scale: 1.2
        }
      })
    }

    function handlePointerUp(e) {
      e.stopPropagation();
      console.log(e)
      setPointerDown(false)
      copyURLToClipboard();
      api.start({
        from: {
          opacity: 1
        },
        to: [
          {
            opacity: 1
          },
          { 
            opacity: 0,
            delay: 500,
            config: {
              tension: 170,
              friction: 26
            }
          }
        ]
      })
      pushApi.start({
        from: {
          scale: 1.2
        },
        to: {
          scale: 1
        }
      })
    }

    return <group position={layout[device].game.invite.position}>
      <animated.group scale={ pushSprings.scale } position={layout[device].game.invite.button.position}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].game.invite.text.position}
          rotation={[-Math.PI/2, 0, 0]}
          size={layout[device].game.invite.text.size}
          height={0.01}
        >
          {layout[device].game.invite.text.content}
          <meshStandardMaterial color='limegreen'/>
        </Text3D>
        {/* have to prepend 'www' for safari to redirect to the website instead of searching it in google */}
        {/* <QRCode3D url={'www.yutnori.app/E70E'}/>  */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          position={layout[device].game.invite.border.position}
          rotation={layout[device].game.invite.border.rotation}
          scale={layout[device].game.invite.border.scaleInner}
          onPointerEnter={e => handlePointerEnter(e)}
          onPointerLeave={e => handlePointerLeave(e)}
          onPointerDown={e => handlePointerDown(e)}
          onPointerUp={e => handlePointerUp(e)}
        >
          <meshStandardMaterial color='black' transparent opacity={0.5}/>
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          position={layout[device].game.invite.border.position}
          rotation={layout[device].game.invite.border.rotation}
          scale={layout[device].game.invite.border.scaleOuter}
        >
          <meshStandardMaterial color='limegreen' transparent opacity={1}/>
        </mesh>
      </animated.group>
      <Text3D 
        name='copied-tooltip'
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].game.invite.copiedText.position}
        rotation={[-Math.PI/2, 0, 0]}
        size={layout[device].game.invite.copiedText.size}
        height={layout[device].game.invite.copiedText.height}
      >
        copied!
        <AnimatedMeshDistortMaterial
          speed={5}
          distort={0}
          color='limegreen'
          transparent
          opacity={springs.opacity}
        />
      </Text3D>
    </group>
  }

  return (<>
      {/* <Perf/> */}
      {/* <Leva hidden /> */}
      <GameCamera position={layout[device].camera.position} lookAtOffset={[0,0,0]}/>
      { gamePhase !== 'finished' && <animated.group scale={gameScale}>
        <Team 
          position={layout[device].game.team0.position}
          scale={layout[device].game.team0.scale}
          device={device}
          team={0} 
        />
        <Team 
          position={layout[device].game.team1.position}
          scale={layout[device].game.team1.scale}
          device={device}
          team={1} 
        />
        <JoinTeamModal 
          position={layout[device].game.joinTeamModal.position}
          rotation={layout[device].game.joinTeamModal.rotation}
          scale={layout[device].game.joinTeamModal.scale}
          teams={teams}
        />
        { !disconnect && (gamePhase === 'pregame' || gamePhase === 'game') && <GameLog
          position={layout[device].game.chat.position}
          rotation={layout[device].game.chat.rotation}
          scale={layout[device].game.chat.scale}
        /> }
        {/* { gamePhase === 'lobby' && <InviteInstructions
          position={layout[device].game.chat.position}
          rotation={layout[device].game.chat.rotation}
          scale={layout[device].game.chat.scale}
        /> } */}
        { gamePhase === 'lobby' && <InviteInstructions2
          position={layout[device].game.chat.position}
          rotation={layout[device].game.chat.rotation}
          scale={layout[device].game.chat.scale}
        /> }
        {/* <InviteButton position={layout[device].game.invite.position}/> */}
        {/* <DiscordButton position={layout[device].game.discord.position}/> */}
        { disconnect && <DisconnectModal
          position={layout[device].game.disconnectModal.position}
          rotation={layout[device].game.disconnectModal.rotation}
        /> }
        <LetsPlayButton
          position={layout[device].game.letsPlayButton.position}
          rotation={layout[device].game.letsPlayButton.rotation}
        />
        <animated.group position={boardPosition} scale={boardScale}>
          <Board 
            position={[0,0,0]}
            scale={1}
            tiles={tiles}
            legalTiles={legalTiles}
            helperTiles={helperTiles}
            interactive={true}
            showStart={true}
            device={device}
          />
        </animated.group>
        {/* Who Goes First components */}
        { gamePhase === "pregame" && <group>
          <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].game.whoGoesFirst.title.position}
          rotation={layout[device].game.whoGoesFirst.title.rotation}
          size={layout[device].game.whoGoesFirst.title.size}
          height={layout[device].game.whoGoesFirst.title.height}
          >
            {`Who goes first?`}
            <meshStandardMaterial color="limegreen"/>
          </Text3D>
          <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          position={layout[device].game.whoGoesFirst.description.position}
          rotation={layout[device].game.whoGoesFirst.description.rotation}
          size={layout[device].game.whoGoesFirst.description.size}
          height={layout[device].game.whoGoesFirst.title.height}
          lineHeight={layout[device].game.whoGoesFirst.title.lineHeight}
          >
            {`One player from each team throws\nthe yoot. The team with a higher\nnumber goes first.`}
            <meshStandardMaterial color="limegreen"/>
          </Text3D>
        </group>}
        { yootAnimation && <YootNew
          animation={yootAnimation}
          scale={0.22}
          position={[0, 2, 0]}
        /> }
        { (gamePhase === 'pregame' || gamePhase === 'game') && <YootButtonNew
          position={layout[device].game.yootButton.position}
          rotation={layout[device].game.yootButton.rotation}
          scale={layout[device].game.yootButton.scale}
          hasThrow={teams[turn.team].throws > 0}
          device={device}
        /> }
        <SettingsButton 
          position={layout[device].game.settings.position}
          scale={layout[device].game.settings.scale}
        />
        <RulebookButton 
          position={layout[device].game.rulebookButton.position}
          scale={layout[device].game.rulebookButton.scale}
        />
        { ((device === 'portrait' && !(29 in legalTiles)) || device === 'landscapeDesktop') && <PiecesSection 
        position={layout[device].game.piecesSection.position}
        device={device}
        /> }
        { (29 in legalTiles) && <ScoreButtons
          position={layout[device].game.scoreButtons.position}
          rotation={layout[device].game.scoreButtons.rotation}
          buttonPos={layout[device].game.scoreButtons.buttons.position}
          text={layout[device].game.scoreButtons.text}
          textSize={layout[device].game.scoreButtons.textSize}
          lineHeight={layout[device].game.scoreButtons.lineHeight}
          legalTiles={legalTiles}
          enabled={hasTurn}
        /> }
        <PiecesOnBoard/>
        { (gamePhase === 'pregame' || gamePhase === 'game') && (device === 'landscapeDesktop' || (device === 'portrait' && !(29 in legalTiles))) && <MoveList
          position={layout[device].game.moveList.position}
          rotation={layout[device].game.moveList.rotation}
          tokenScale={layout[device].game.moveList.tokenScale}
          tokenPosition={layout[device].game.moveList.tokenPosition}
          size={layout[device].game.moveList.size}
          piecePosition={layout[device].game.moveList.piecePosition}
          pieceScale={layout[device].game.moveList.pieceScale}
          gamePhase={gamePhase}
        /> }
        {/* { gamePhase === 'pregame' && <PregameMoveDisplay/> } */}
      </animated.group> }
      { gamePhase === 'finished' && <animated.group scale={winScreenScale}>
        { (gamePhase === 'finished' && winner === 0) && <RocketsWin/>}
        { (gamePhase === 'finished' && winner === 1) && <UfosWin/>}
      </animated.group> }
      { showRulebook && gamePhase !== 'finished' && <group>
        <mesh name='blocker' position={layout[device].game.rulebook.blocker.position}>
          <boxGeometry args={layout[device].game.rulebook.blocker.args}/>
          <meshStandardMaterial color='black' transparent opacity={0.95}/>
        </mesh>
        <HowToPlay 
          device={device} 
          position={layout[device].game.rulebook.position} 
          scale={layout[device].game.rulebook.scale}
          closeButton={true}
          setShowRulebook={setShowRulebook}
        />
      </group> }
      {/* { parseInt(client.team) === -1 && <InitialJoinTeamModal position={[0, 2.7, 1]} />} */}
      {/* host */}
      { gamePhase !== 'finished' && <DisplayHostAndSpectating/> }
      <MeteorsRealShader/>
    </>
  );
}