// js
import React, { useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
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
  settingsOpenAtom,
  connectedToServerAtom,
  pauseGameAtom,
  timerAtom,
  animationPlayingAtom,
  turnExpireTimeAtom,
  backdoLaunchAtom,
  nakAtom,
  yutMoCatchAtom,
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
import useResponsiveSetting from "./hooks/useResponsiveSetting.jsx";
import MeteorsRealShader from "./shader/meteorsReal/MeteorsRealShader.jsx";
import SettingsHtml from "./SettingsHtml.jsx";
import PauseGame from "./PauseGame.jsx";
import Timer from "./Timer.jsx";
import useMusicPlayer from "./hooks/useMusicPlayer.jsx";
import TeamLobby from "./TeamLobby.jsx";
import MeshColors from "./MeshColors.jsx";
import QRCodeStyling from "qr-code-styling";
import QrCode3d from "./QRCode3D.jsx";

// There should be no state
export default function Game() {
  
  useResponsiveSetting();
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
  const pauseGame = useAtomValue(pauseGameAtom)
  const timer = useAtomValue(timerAtom)
  const animationPlaying = useAtomValue(animationPlayingAtom)
  const [playMusic] = useMusicPlayer();
  
  const params = useParams();
  const connectedToServer = useAtomValue(connectedToServerAtom)

  useEffect(() => {
    // socket.emit('joinRoom', { roomId: params.id.toUpperCase() })
    return (() => {
      // remove player from room (grey text)
      socket.emit('disconnectFromRoom', { roomId: params.id.toUpperCase() });
    })
  }, [])

  useEffect(() => {
    if (connectedToServer) {
      socket.emit('addUser', {}, () => {
        socket.emit('joinRoom', { roomId: params.id.toUpperCase() })
      })
    }
  }, [connectedToServer])

  function StartGameButton({ position }) {

    const colorMaterial = new MeshStandardMaterial({ color: 'turquoise' })

    const [hover, setHover] = useState(false);

    function handlePointerEnter(e) {
      e.stopPropagation();
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      setHover(false)
    }

    function handlePointerUp(e) {
      // const audio = new Audio('sounds/effects/join.wav');
      // audio.volume=0.3;
      // audio.play();
      e.stopPropagation();
      setHover(false)
      if (readyToStart) {
        socket.emit('gameStart', { roomId: params.id.toUpperCase(), clientId: client._id })
      }
    }

    return <group
      position={position}
      scale={2}
    >
      <mesh
        name='background-outer'
        scale={[1.3, 1, 0.45]}
      >
        <cylinderGeometry args={[1, 1, 0.01, 32]}/>
        <meshStandardMaterial color={ !readyToStart ? 'grey' : hover ? 'green' : 'yellow' }/>
      </mesh>
      <mesh
        name='background-inner'
        scale={[1.3, 1, 0.42]}
      >
        <cylinderGeometry args={[0.97, 0.95, 0.02, 32]}/>
        <meshStandardMaterial color='black'/>
      </mesh>
      <mesh 
        name='wrapper' 
        scale={[1.3, 1, 0.45]}
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerDown={e => handlePointerUp(e)}
      >
        <cylinderGeometry args={[1, 1, 0.01, 32]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-1.02, 0.025, 0.12]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.25}
        height={0.01}
        lineHeight={0.7}
      >
        {`START GAME!`}
        <meshStandardMaterial color={ !readyToStart ? 'grey' : hover ? 'green' : 'yellow' }/>
      </Text3D>
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
  const { boardScale, boardPosition, gameScale, winScreenScale, lobbyScale } = useSpring({
    boardScale: layout[device].game.board[gamePhase].scale,
    boardPosition: layout[device].game.board[gamePhase].position,
    gameScale: (gamePhase === 'pregame' || gamePhase === 'game') ? 1 : 0,
    winScreenScale: gamePhase === 'finished' ? 1 : 0,
    lobbyScale: gamePhase === 'lobby' ? 1 : 0,
    config: {
      tension: 170,
      friction: 26
    },
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
    const [open, setOpen] = useAtom(settingsOpenAtom)
    const [hover, setHover] = useState(false)
    function handlePointerEnter(e) {
      e.stopPropagation();
      if (!hover) {
        setHover(true)
      }
    }
    function handlePointerMove(e) {
      e.stopPropagation();
      if (!hover) {
        setHover(true)
      }
    }
    function handlePointerLeave(e) {
      e.stopPropagation();
      if (hover) {
        setHover(false)
      }
    }

    function handlePointerDown(e) {
      e.stopPropagation();
      if (open) {
        setOpen(false)
        if (hover) {
          setHover(false)
        }
      } else {
        setOpen(true)
      }
    }

    return <group position={position} scale={scale}>
      <mesh>
        <meshStandardMaterial color={hover? 'green' : 'yellow'}/>
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
        onPointerMove={e => handlePointerMove(e)}
      >
        <boxGeometry args={[1.2, 0.1, 0.6]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={layout[device].game.settings.mainButton.text.position}
        rotation={layout[device].game.settings.mainButton.text.rotation}
        size={layout[device].game.settings.mainButton.text.size}
        height={layout[device].game.settings.mainButton.text.height}
      >
        <meshStandardMaterial color={hover? 'green' : 'yellow'}/>
        Settings
      </Text3D>
      {/* display different panes based on user state (spectator/player) */}
      { open && <SettingsHtml
        position={[-3.5,3,3.5]}
        rotation={[0,0,0]}
        scale={[1,1,1]}
      /> }
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

  function ThirdSection() {
    const [inviteFriendsVisible, setInviteFriendsVisible] = useState(false)
    const [settingsVisible, setSettingsVisible] = useState(true)
    // const [inviteFriendsVisible, setInviteFriendsVisible] = useState(true)
    // const [settingsVisible, setSettingsVisible] = useState(false)
    function InviteFriendsButton() {
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
        console.log('[InviteFriendsButton] click')
        setInviteFriendsVisible(true)
        setSettingsVisible(false)
      }
      return <group name='invite-friends-button' position={[7, 0, -5.6]}>
        <mesh name='background-outer' scale={[4.2, 0.01, 0.75]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (hover || inviteFriendsVisible) ? 'green' : 'yellow' }/>
        </mesh> 
        <mesh name='background-inner' scale={[4.15, 0.02, 0.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[4.2, 0.02, 0.75]}
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerUp={e => handlePointerUp(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.9, 0.02, 0.19]}
        >
          INVITE FRIENDS
          <meshStandardMaterial color={ (hover || inviteFriendsVisible) ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function SettingsButtonLobby() {
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
        console.log('[SettingsButton] click')
        setSettingsVisible(true)
        setInviteFriendsVisible(false)
      }
      return <group name='settings-button' position={[10.6, 0, -5.6]}>
        <mesh name='background-outer' scale={[2.8, 0.01, 0.75]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={ (hover || settingsVisible) ? 'green' : 'yellow' }/>
        </mesh> 
        <mesh name='background-inner' scale={[2.75, 0.02, 0.7]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={MeshColors.spaceDark}/>
        </mesh>
        <mesh 
        name='wrapper' 
        scale={[2.8, 0.02, 0.75]}
        onPointerEnter={e => handlePointerEnter(e)}
        onPointerLeave={e => handlePointerLeave(e)}
        onPointerUp={e => handlePointerUp(e)}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color='yellow' transparent opacity={0}/>
        </mesh>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          size={0.4}
          height={0.01}
          rotation={[-Math.PI/2, 0, 0]}
          position={[-1.2, 0.02, 0.19]}
        >
          SETTINGS
          <meshStandardMaterial color={ (hover || settingsVisible) ? 'green' : 'yellow' }/>
        </Text3D>
      </group>
    }
    function InviteFriends() {
      function CopyLinkButton({ position }) {
        const [hover, setHover] = useState(false)
        function handlePointerEnter(e) {
          e.stopPropagation()
          setHover(true)
        }
        function handlePointerLeave(e) {
          e.stopPropagation()
          setHover(false)
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
        const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)
        const [springs, api] = useSpring(() => ({        
          from: {
            opacity: 0, 
          }
        }))
        function handlePointerUp(e) {
          e.stopPropagation()
          console.log('[CopyLinkButton] click')
          copyURLToClipboard()
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
        }
        return <group name='copy-link-button' position={position}>
          <mesh name='background-outer' scale={[3, 0.01, 0.75]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </mesh> 
          <mesh name='background-inner' scale={[2.95, 0.02, 0.7]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={MeshColors.spaceDark}/>
          </mesh>
          <mesh 
          name='wrapper' 
          scale={[2.7, 0.02, 0.75]}
          onPointerEnter={e => handlePointerEnter(e)}
          onPointerLeave={e => handlePointerLeave(e)}
          onPointerUp={e => handlePointerUp(e)}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='yellow' transparent opacity={0}/>
          </mesh>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            size={0.4}
            height={0.01}
            rotation={[-Math.PI/2, 0, 0]}
            position={[-1.3, 0.02, 0.19]}
          >
            COPY LINK
            <meshStandardMaterial color={ hover ? 'green' : 'yellow' }/>
          </Text3D>
          <Text3D 
            name='copied-tooltip'
            font="fonts/Luckiest Guy_Regular.json"
            position={[-1,0,-0.6]}
            rotation={[-Math.PI/2, 0, 0]}
            size={0.4}
            height={0.01}
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

      // get image before download
      // display it as drei-image
      return <group>
        <QrCode3d text={window.location.href} position={[8.5,0,-2]} scale={0.8} rotation={[-Math.PI/2,0,0]}/>
        <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[5,0,1.5]}
        rotation={[-Math.PI/2,0,0]}
        size={0.4}
        height={0.01}>
          {`SCAN THE QR CODE TO JOIN\nTHIS ROOM, OR COPY THE\nLINK AND SHARE WITH YOUR\nFRIENDS`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <CopyLinkButton position={[8.6, 0, 5]}/>
      </group>
    }
    // reuse this component in the Settings menu in Game
    function SettingsLobby() {
      // hover states
      const [setting0Hover, setSetting0Hover] = useState(false)
      const [setting1Hover, setSetting1Hover] = useState(false)
      const [setting2Hover, setSetting2Hover] = useState(false)
      const [setting3Hover, setSetting3Hover] = useState(false)
      // toggle states (global)
      // pointer handlers (enter, leave, and up for each rule)
      const backdoLaunch = useAtomValue(backdoLaunchAtom)
      const timer = useAtomValue(timerAtom)
      const nak = useAtomValue(nakAtom)
      const yutMoCatch = useAtomValue(yutMoCatchAtom)
      const { 
        setting0TogglePosition, 
        setting0ToggleBackgroundColor,
        setting1TogglePosition, 
        setting1ToggleBackgroundColor,
      } = useSpring({
        setting0TogglePosition: !backdoLaunch ? [0,0,0] : [0.4, 0, 0],
        setting0ToggleBackgroundColor: !backdoLaunch ? '#5C5800' : 'green',
        setting1TogglePosition: !timer ? [0,0,0] : [0.4, 0, 0],
        setting1ToggleBackgroundColor: !timer ? '#5C5800' : 'green',
        config: {
          tension: 170,
          friction: 26
        },
      })
      function handleSetting0PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSetting0Hover(true)
      }
      function handleSetting0PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSetting0Hover(false)
      }
      function handleSetting0PointerUp(e) {
        console.log('[handleSetting0PointerUp]')
        e.stopPropagation()
        if (!backdoLaunch) {
          console.log('[handleSetting0PointerUp] enable backdoLaunch')
          socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'backdoLaunch', flag: true }))
        }
        else {
          console.log('[handleSetting0PointerUp] disable backdoLaunch')
          socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'backdoLaunch', flag: false }))
        }
      }
      function handleSetting1PointerEnter(e) {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        setSetting1Hover(true)
      }
      function handleSetting1PointerLeave(e) {
        e.stopPropagation()
        document.body.style.cursor = 'default'
        setSetting1Hover(false)
      }
      function handleSetting1PointerUp(e) {
        console.log('[handleSetting1PointerUp]')
        e.stopPropagation()
        if (!timer) {
          console.log('[handleSetting1PointerUp] enable timer')
          socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'timer', flag: true }))
        }
        else {
          console.log('[handleSetting1PointerUp] disable timer')
          socket.emit('setGameRule', ({ roomId: params.id.toUpperCase(), clientId: client._id, rule: 'timer', flag: false }))
        }
      }
      
      const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial)

      return <group position={[0,0,0]}>
        <group name='setting-0' position={[5.2, 0, -3.2]}>
          <group name='setting-0-background'>
            { client.socketId === host.socketId && <mesh
            name='setting-0-background-outer'
            position={[3.25, 0, 0]}
            scale={[7.1, 0.01, 2.9]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='yellow'/>
            </mesh> }
            <mesh 
            name='setting-0-background-inner'
            position={[3.25, 0, 0]}
            scale={[7.05, 0.02, 2.85]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial 
              color={ !setting0Hover ? MeshColors.disabledGreyBackground : '#444444' } 
              transparent 
              opacity={1}/>
            </mesh>
            <mesh 
            name='setting-0-background-wrapper'
            position={[3.25, 0, 0]}
            scale={[7.1, 0.02, 2.9]}
            onPointerEnter={e=>handleSetting0PointerEnter(e)}
            onPointerLeave={e=>handleSetting0PointerLeave(e)}
            onPointerUp={e=>handleSetting0PointerUp(e)}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial 
              transparent 
              opacity={0}/>
            </mesh>
          </group>
          <Text3D 
          name='setting-0-title'
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.1,0.02,-0.8]}
          rotation={[-Math.PI/2,0,0]}
          size={0.4}
          height={0.01}>
            BACKDO LAUNCH
            <meshStandardMaterial color='yellow'/>
          </Text3D>
          { client.socketId === host.socketId && <group 
          name='setting-0-toggle' 
          position={[5.95, 0.02, -1]}>
            <group name='setting-0-toggle-background'>
              <mesh 
              name='setting-0-toggle-background-left-circle'
              scale={[0.25, 0.01, 0.25]}
              >
                <cylinderGeometry args={[1, 1, 1, 32]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting0ToggleBackgroundColor}
                />
              </mesh>
              <mesh
              name='setting-0-toggle-background-block'
              position={[0.2, 0, 0]}
              scale={[0.4, 0.01, 0.5]}
              >
                <boxGeometry args={[1, 1, 1]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting0ToggleBackgroundColor}
                />
              </mesh>
              <mesh 
              name='setting-0-toggle-background-right-circle'
              position={[0.4, 0, 0]}
              scale={[0.25, 0.01, 0.25]}
              >
                <cylinderGeometry args={[1, 1, 1, 32]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting0ToggleBackgroundColor}
                />
              </mesh>
            </group>
            <animated.mesh
            name='setting-0-toggle-switch'
            scale={[0.15, 0.02, 0.15]}
            position={setting0TogglePosition}>
              <cylinderGeometry args={[1, 1, 1, 32]}/>
              <meshStandardMaterial color={MeshColors.disabledGreyBackground} />
            </animated.mesh>
          </group> }
          <Text3D 
          name='setting-0-description'
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.1,0.02,-0.2]}
          rotation={[-Math.PI/2,0,0]}
          size={0.3}
          height={0.01}
          lineHeight={0.8}>
            {`IF A TEAM THROWS A BACKDO (-1)\nAND HAS NO PIECES ON THE BOARD,\nTHEY CAN PUT A PIECE ON THE STAR\nBEHIND EARTH.`}
            <meshStandardMaterial color='yellow'/>
          </Text3D>
        </group>
        <group name='setting-1' position={[5.2, 0, -0.1]}>
          <group name='setting-1-background'>
            { client.socketId === host.socketId && <mesh
            name='setting-1-background-outer'
            position={[3.25, 0, 0]}
            scale={[7.1, 0.01, 2.9]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='yellow'/>
            </mesh> }
            <mesh 
            name='setting-1-background-inner'
            position={[3.25, 0, 0]}
            scale={[7.05, 0.02, 2.85]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial 
              color={MeshColors.disabledGreyBackground} 
              transparent 
              opacity={1}/>
            </mesh>
            <mesh 
            name='setting-1-background-wrapper'
            position={[3.25, 0, 0]}
            scale={[7.1, 0.02, 2.9]}
            onPointerEnter={e=>handleSetting1PointerEnter(e)}
            onPointerLeave={e=>handleSetting1PointerLeave(e)}
            onPointerUp={e=>handleSetting1PointerUp(e)}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial 
              transparent 
              opacity={0}/>
            </mesh>
          </group>
          <Text3D
          name='setting-1-title'
          font="fonts/Luckiest Guy_Regular.json"
          position={[-0.1,0.02,-0.8]}
          rotation={[-Math.PI/2,0,0]}
          size={0.4}
          height={0.01}>
            TIMER
            <meshStandardMaterial color='yellow'/>
          </Text3D>
          { client.socketId === host.socketId && <group 
          name='setting-1-toggle' 
          position={[5.95, 0.02, -1]}>
            <group name='setting-1-toggle-background'>
              <mesh 
              name='setting-1-toggle-background-left-circle'
              scale={[0.25, 0.01, 0.25]}
              >
                <cylinderGeometry args={[1, 1, 1, 32]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting1ToggleBackgroundColor}
                />
              </mesh>
              <mesh
              name='setting-1-toggle-background-block'
              position={[0.2, 0, 0]}
              scale={[0.4, 0.01, 0.5]}
              >
                <boxGeometry args={[1, 1, 1]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting1ToggleBackgroundColor}
                />
              </mesh>
              <mesh 
              name='setting-1-toggle-background-right-circle'
              position={[0.4, 0, 0]}
              scale={[0.25, 0.01, 0.25]}
              >
                <cylinderGeometry args={[1, 1, 1, 32]}/>
                <AnimatedMeshDistortMaterial
                  speed={5}
                  distort={0}
                  color={setting1ToggleBackgroundColor}
                />
              </mesh>
            </group>
            <animated.mesh
            name='setting-1-toggle-switch'
            scale={[0.15, 0.02, 0.15]}
            position={setting1TogglePosition}>
              <cylinderGeometry args={[1, 1, 1, 32]}/>
              <meshStandardMaterial color={MeshColors.disabledGreyBackground} />
            </animated.mesh>
          </group> }
        </group>
        <group>
          <Text3D
          name='setting-2-title'
          font="fonts/Luckiest Guy_Regular.json"
          position={[-12,0,-5.3]}
          rotation={[-Math.PI/2,0,0]}
          size={0.6}
          height={0.01}></Text3D>
          <group name='setting-2-checkbox'></group>
          <group name='setting-2-description'></group>
        </group>
        <group>
          <Text3D
          name='setting-3-title'
          font="fonts/Luckiest Guy_Regular.json"
          position={[-12,0,-5.3]}
          rotation={[-Math.PI/2,0,0]}
          size={0.6}
          height={0.01}></Text3D>
          <group name='setting-3-checkbox'></group>
          <group name='setting-3-description'></group>
        </group>
      </group>
    }

    return <group name='third-section'>
      <InviteFriendsButton/>
      { inviteFriendsVisible && <InviteFriends/> }
      <SettingsButtonLobby/>
      { settingsVisible && <SettingsLobby/> }
    </group>
  }
  

  return (<>
      {/* <Perf/> */}
      {/* <Leva hidden /> */}
      <GameCamera position={layout[device].camera.position} lookAtOffset={[0,0,0]}/>
      { gamePhase === 'lobby' && <animated.group scale={lobbyScale}>
        <group name='title'>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-12,0,-5.3]}
            rotation={[-Math.PI/2,0,0]}
            size={0.6}
            height={0.01}
          >
            YUT NORI!
            <meshStandardMaterial color="yellow"/>
          </Text3D>
          <Text3D
            font="fonts/Luckiest Guy_Regular.json"
            position={[-7,0,-5.3]}
            rotation={[-Math.PI/2,0,0]}
            size={0.4}
            height={0.01}
          >
            {`ID: ${params.id}`}
            <meshStandardMaterial color="yellow"/>
          </Text3D>
        </group>
        <group name='players'>
          <TeamLobby
            position={[-12,0,-4]}
            scale={layout[device].game.team0.scale}
            device={device}
            team={0} 
          />
          <TeamLobby
            position={[-7.5,0,-4]}
            scale={layout[device].game.team0.scale}
            device={device}
            team={1} 
          />
          <JoinTeamModal 
            position={[-11.5, 0, -3]}
            rotation={layout[device].game.joinTeamModal.rotation}
            scale={layout[device].game.joinTeamModal.scale}
            teams={teams}
          />
          { client._id === host._id && <StartGameButton
            position={layout[device].game.letsPlayButton.position}
            rotation={layout[device].game.letsPlayButton.rotation}
          /> }
        </group>
        <group name='rulebook'>
          <group name='rulebook-label' position={[1, 0, -5.6]}>
            <mesh name='background-outer' scale={[3.0, 0.01, 0.75]} position={[0,0,0]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color='yellow'/>
            </mesh> 
            <mesh name='background-inner' scale={[2.95, 0.02, 0.7]} position={[0,0,0]}>
              <boxGeometry args={[1, 1, 1]}/>
              <meshStandardMaterial color={MeshColors.spaceDark}/>
            </mesh>
            <Text3D
              font="fonts/Luckiest Guy_Regular.json"
              size={0.4}
              height={0.01}
              rotation={[-Math.PI/2, 0, 0]}
              position={[-1.3, 0.02, 0.19]}
            >
              RULEBOOK
              <meshStandardMaterial color='yellow'/>
            </Text3D>
          </group>
          <HowToPlay 
            device={device} 
            position={[-1,0,-1]} 
            scale={0.6}
            closeButton={false}
            setShowRulebook={setShowRulebook}
          />
          <Text3D 
          name='goal'
          font="fonts/Luckiest Guy_Regular.json"
          position={[-2.5, 0, 4]}
          rotation={layout[device].game.whoGoesFirst.title.rotation}
          size={0.3}
          height={layout[device].game.whoGoesFirst.title.height}>
            {`GOAL: MOVE FOUR SHIPS AROUND\nTHE STARS FROM START TO FINISH!`}
            <meshStandardMaterial color='yellow'/>
          </Text3D>
        </group>
        <ThirdSection/>
      </animated.group> }
      { (gamePhase === 'pregame' || gamePhase === 'game') && <animated.group scale={gameScale}>
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
        {/* <JoinTeamModal 
          position={layout[device].game.joinTeamModal.position}
          rotation={layout[device].game.joinTeamModal.rotation}
          scale={layout[device].game.joinTeamModal.scale}
          teams={teams}
        /> */}
        { !disconnect && (gamePhase === 'pregame' || gamePhase === 'game') && <GameLog
          position={layout[device].game.chat.position}
          rotation={layout[device].game.chat.rotation}
          scale={layout[device].game.chat.scale}
        /> }
        { disconnect && <DisconnectModal
          position={layout[device].game.disconnectModal.position}
          rotation={layout[device].game.disconnectModal.rotation}
        /> }
        { pauseGame && <PauseGame
          position={[0, 5, 2]}
        />}
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
        { (gamePhase === 'pregame' || gamePhase === 'game') && turn.team !== -1 && <YootButtonNew
          position={layout[device].game.yootButton.position}
          rotation={layout[device].game.yootButton.rotation}
          scale={layout[device].game.yootButton.scale}
          hasThrow={teams[turn.team].throws > 0}
          device={device}
        /> }
        <SettingsButton 
          position={layout[device].game.settings.mainButton.position}
          scale={layout[device].game.settings.mainButton.scale}
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
          device={device}
          legalTiles={legalTiles}
          hasTurn={hasTurn}
        /> }
        <PiecesOnBoard/>
        { (device === 'landscapeDesktop' || (device === 'portrait' && !(29 in legalTiles && legalTiles[29].length > 1))) && <MoveList
          position={layout[device].game.moveList.position}
          rotation={layout[device].game.moveList.rotation}
          tokenScale={layout[device].game.moveList.tokenScale}
          tokenPosition={layout[device].game.moveList.tokenPosition}
          size={layout[device].game.moveList.size}
          piecePosition={layout[device].game.moveList.piecePosition}
          pieceScale={layout[device].game.moveList.pieceScale}
          gamePhase={gamePhase}
        /> }
        <DisplayHostAndSpectating/>
        { showRulebook && <group>
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
        { timer && !animationPlaying && <Timer 
          position={layout[device].game.timer.position} 
          scale={[layout[device].game.timer.scaleX, 1, 1]}
          boxArgs={layout[device].game.timer.boxArgs}
          heightMultiplier={layout[device].game.timer.heightMultiplier}
        /> }
      </animated.group> }
      { gamePhase === 'finished' && <animated.group scale={winScreenScale}>
        { winner === 0 && <RocketsWin/>}
        { winner === 1 && <UfosWin/>}
      </animated.group> }
      <MeteorsRealShader/>
    </>
  );
}