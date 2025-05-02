// js
import React, { useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
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
  mainMenuOpenAtom,
  connectedToServerAtom,
  pauseGameAtom,
  timerAtom,
  backdoLaunchAtom,
  nakAtom,
  yutMoCatchAtom,
  editGuestsOpenAtom,
  editOneGuestOpenAtom,
  guestBeingEdittedAtom,
  showFinishMovesAtom,
  showBonusAtom,
  musicAtom,
} from "./GlobalState.jsx";
import MoveList from "./MoveList.jsx";
import PiecesOnBoard from "./PiecesOnBoard.jsx";
import ScoreButtons from "./ScoreButtons.jsx";
import RocketsWin from "./RocketsWin.jsx";
import UfosWin from "./UfosWin.jsx";
import { Float, Text3D, useGLTF } from "@react-three/drei";
import { Color, MeshStandardMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import GameLog from "./GameLog.jsx";
import HowToPlay from "./HowToPlay.jsx";

// react spring
import YootNew from "./YootNew.jsx";
import YootButtonNew from "./YootButtonNew.jsx";
import useResponsiveSetting from "./hooks/useResponsiveSetting.jsx";
import MeteorsRealShader from "./shader/meteorsReal/MeteorsRealShader.jsx";
import PauseGame from "./PauseGame.jsx";
import Timer from "./Timer.jsx";
import { useAnimationPlaying } from "./hooks/useAnimationPlaying.jsx";
import Settings from "./Settings.jsx";
import YutBonus from "./YutBonus.jsx";
import useMusicPlayer from "./hooks/useMusicPlayer.jsx";

// There should be no state
export default function Game() {
  
  useResponsiveSetting();
  const device = useAtomValue(deviceAtom)
  const connectedToServer = useAtomValue(connectedToServerAtom)
  const gamePhase = useAtomValue(gamePhaseAtom)
  const pauseGame = useAtomValue(pauseGameAtom)

  // Animations
  const { gameScale } = useSpring({
    gameScale: (gamePhase === 'pregame' || gamePhase === 'game') ? 1 : 0,
    config: {
      tension: 170,
      friction: 26
    },
  })

  function SettingsButton({ position, scale }) {
    const [open, setOpen] = useAtom(settingsOpenAtom)
    const setMainMenuOpen = useSetAtom(mainMenuOpenAtom)
    const setEditGuestsOpen = useSetAtom(editGuestsOpenAtom)
    const setEditOneGuestOpen = useSetAtom(editOneGuestOpenAtom)
    const setGuestBeingEditted = useSetAtom(guestBeingEdittedAtom)
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
        setMainMenuOpen(true)
        setEditGuestsOpen(false)
        setEditOneGuestOpen(false)
        setGuestBeingEditted(null)
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
        <boxGeometry args={[2.1, 0.04, 0.55]}/>
        <meshStandardMaterial transparent opacity={0}/>
      </mesh>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={layout[device].game.settings.mainButton.text.position}
        rotation={layout[device].game.settings.mainButton.text.rotation}
        size={layout[device].game.settings.mainButton.text.size}
        height={layout[device].game.settings.mainButton.text.height}
      >
        <meshStandardMaterial color={hover? 'green' : 'yellow'}/>
        Settings
      </Text3D>
      {/* { open && <SettingsHtml
        position={[-3.5,3,3.5]}
        rotation={[0,0,0]}
        scale={[1,1,1]}
      /> } */}
      { open && <Settings
        position={[-4.7, 6, 6.3]}
        scale={[1,1,1]}
      /> }
    </group>
  }

  function DisplayHostAndSpectating() {
    const host = useAtomValue(hostAtom)
    const client = useAtomValue(clientAtom)

    // case 0: spectating
    const Spectating = () => {
      return <Text3D 
        name='spectating-text'
        font="/fonts/Luckiest Guy_Regular.json"
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
          font="/fonts/Luckiest Guy_Regular.json"
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
          font="/fonts/Luckiest Guy_Regular.json"
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
        font="/fonts/Luckiest Guy_Regular.json"
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

  function GameBoard() {
    const gamePhase = useAtomValue(gamePhaseAtom)
    const tiles = useAtomValue(tilesAtom)
    const legalTiles = useAtomValue(legalTilesAtom)
    const helperTiles = useAtomValue(helperTilesAtom)
    const showFinishMoves = useAtomValue(showFinishMovesAtom)
    const showBonus = useAtomValue(showBonusAtom)
    const animationPlaying = useAnimationPlaying()

    const { boardScale, boardPosition } = useSpring({
      boardScale: layout[device].game.board[gamePhase].scale,
      boardPosition: layout[device].game.board[gamePhase].position,
    })

    return <animated.group position={boardPosition} scale={boardScale}>
      <Board 
        position={[0,0,0]}
        scale={1}
        tiles={tiles}
        legalTiles={legalTiles}
        helperTiles={helperTiles}
        interactive={true}
        showStart={true}
        device={device}
        showFinishMoves={showFinishMoves}
        showBonus={showBonus}
        animationPlaying={animationPlaying}
      />
    </animated.group>
  }
  function WhoGoesFirst() {
    return <group>
      <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      position={layout[device].game.whoGoesFirst.title.position}
      rotation={layout[device].game.whoGoesFirst.title.rotation}
      size={layout[device].game.whoGoesFirst.title.size}
      height={layout[device].game.whoGoesFirst.title.height}
      >
        {`Who goes first?`}
        <meshStandardMaterial color="limegreen"/>
      </Text3D>
      <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      position={layout[device].game.whoGoesFirst.description.position}
      rotation={layout[device].game.whoGoesFirst.description.rotation}
      size={layout[device].game.whoGoesFirst.description.size}
      height={layout[device].game.whoGoesFirst.title.height}
      lineHeight={layout[device].game.whoGoesFirst.title.lineHeight}
      >
        {`One player from each team throws\nthe yoot. The team with a higher\nnumber goes first.`}
        <meshStandardMaterial color="limegreen"/>
      </Text3D>
    </group>
  }
  function Rulebook() {
    const [showRulebook, setShowRulebook] = useState(false);

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

      async function handlePointerUp(e) {
        e.stopPropagation();
        if (showRulebook) {
          setShowRulebook(false)
          
          const response = await axios.post('https://yqpd9l2hjh.execute-api.us-west-2.amazonaws.com/dev/sendLog', {
            eventName: 'buttonClick',
            timestamp: new Date(),
            payload: {
              'button': 'howToPlayGame',
              'action': 'close'
            }
          })
          console.log('[HowToPlayButton] post log response', response)
        } else {
          setShowRulebook(true)
          
          const response = await axios.post('https://yqpd9l2hjh.execute-api.us-west-2.amazonaws.com/dev/sendLog', {
            eventName: 'buttonClick',
            timestamp: new Date(),
            payload: {
              'button': 'howToPlayGame',
              'action': 'open'
            }
          })
          console.log('[HowToPlayButton] post log response', response)
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
          onPointerUp={e => handlePointerUp(e)}
        >
          <boxGeometry args={[1.5, 0.1, 0.6]}/>
          <meshStandardMaterial transparent opacity={0}/>
        </mesh>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
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

    // Block pointer interactivity behind the book
    function handleRulebookPointerEnter(e) {
      e.stopPropagation()
    }
    function handleRulebookPointerLeave(e) {
      e.stopPropagation()
    }
    function handleRulebookPointerDown(e) {
      e.stopPropagation()
    }
    function handleRulebookPointerUp(e) {
      e.stopPropagation()
    }

    function MusicButton({ position, scale }) {
      const [playMusic, stopMusic] = useMusicPlayer()
      const [music, setMusic] = useAtom(musicAtom)
      const [hover, setHover] = useState(false)

      // handler
      function handlePointerEnter(e) {
        e.stopPropagation()
        setHover(true)
        document.body.style.cursor = "pointer";
      }
      function handlePointerLeave(e) {
        e.stopPropagation()
        setHover(false)
        document.body.style.cursor = "default";
      }
      function handlePointerUp(e) {
        e.stopPropagation()
        if (!music) {
          playMusic()
        } else {
          stopMusic()
        }
      }
      return <group position={position} scale={scale}>
        {/* background */}
        <group name='background'>
          <mesh name='background-outer' scale={[0.7, 0.01, 0.7]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color={ music ? 'yellow' : '#555500' }/>
          </mesh>
          <mesh name='background-inner' scale={[0.6, 0.02, 0.6]}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          {/* wrapper */}
          <mesh name='wrapper' scale={[0.7, 0.02, 0.7]} 
          onPointerEnter={e=>handlePointerEnter(e)}
          onPointerLeave={e=>handlePointerLeave(e)}
          onPointerUp={e=>handlePointerUp(e)}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black' transparent opacity={0}/>
          </mesh>
        </group>
        {/* letter */}
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-0.15, 0.02, 0.13]}
          rotation={[-Math.PI/2,0,0]}
          size={0.3}
          height={0.01}
        >
          M
          <meshStandardMaterial color={ music ? 'yellow' : '#555500' }/>
        </Text3D>
      </group>
    }
    return <group>
      <RulebookButton 
        position={layout[device].game.rulebookButton.position}
        scale={layout[device].game.rulebookButton.scale}
      />
      <MusicButton 
        position={layout[device].game.musicButton.position}
        scale={layout[device].game.musicButton.scale}
      />
      { showRulebook && <group 
        position={layout[device].game.rulebook.position}
        scale={layout[device].game.rulebook.scale}>
        <group 
          position={layout[device].game.rulebook.blocker.position} 
        >
          <mesh name='blocker-inner' scale={layout[device].game.rulebook.blocker.innerScale}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='black'/>
          </mesh>
          <mesh name='blocker-outer' scale={layout[device].game.rulebook.blocker.outerScale}>
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='yellow'/>
          </mesh>
          <mesh name='blocker-wrap' 
            scale={[
              layout[device].game.rulebook.blocker.outerScale[0], 
              layout[device].game.rulebook.blocker.innerScale[1], 
              layout[device].game.rulebook.blocker.outerScale[2], 
            ]}
            onPointerEnter={e=>handleRulebookPointerEnter(e)}
            onPointerLeave={e=>handleRulebookPointerLeave(e)}
            onPointerDown={e=>handleRulebookPointerDown(e)}
            onPointerUp={e=>handleRulebookPointerUp(e)}
          >
            <boxGeometry args={[1,1,1]}/>
            <meshStandardMaterial color='yellow' transparent opacity={0}/>
          </mesh>
        </group>
        <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={layout[device].game.rulebook.title.position}
        rotation={layout[device].game.rulebook.title.rotation}
        size={layout[device].game.rulebook.title.size}
        height={layout[device].game.rulebook.title.height}>
          RULEBOOK
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <HowToPlay 
          device={device}
          closeButton={true}
          setShowRulebook={setShowRulebook}
          position={layout[device].game.rulebook.content.position}
        />
      </group> }
    </group>
  }
  function WinScreen() {
    const winner = useAtomValue(winnerAtom)
    const { winScreenScale } = useSpring({ winScreenScale: gamePhase === 'finished' ? 1 : 0 })
    return <animated.group scale={winScreenScale}>
      { winner === 0 && <RocketsWin/>}
      { winner === 1 && <UfosWin/>}
    </animated.group>
  }
  const yutAnimation = useAtomValue(yootAnimationAtom)

  return (<>
      {/* <Perf/> */}
      {/* <Leva hidden /> */}
      <GameCamera position={layout[device].camera.position} lookAtOffset={[0,0,0]}/>
      { (gamePhase === 'pregame' || gamePhase === 'game') && <animated.group scale={gameScale}>
        <Team 
          position={layout[device].game.team0.position}
          scale={layout[device].game.team0.scale}
          team={0} 
        />
        <Team 
          position={layout[device].game.team1.position}
          scale={layout[device].game.team1.scale}
          team={1} 
        />
        { connectedToServer && (gamePhase === 'pregame' || gamePhase === 'game') && <GameLog
          position={layout[device].game.chat.position}
          rotation={layout[device].game.chat.rotation}
          scale={layout[device].game.chat.scale}
        /> }
        { !connectedToServer && <DisconnectModal
          position={layout[device].game.disconnectModal.position}
          rotation={layout[device].game.disconnectModal.rotation}
        /> }
        { pauseGame && <PauseGame position={[0, 5, 2]}/> }
        <GameBoard/>
        { gamePhase === "pregame" && <WhoGoesFirst/> }
        { (gamePhase === 'pregame' || gamePhase === 'game') && <YootButtonNew
          position={layout[device].game.yootButton.position}
          rotation={layout[device].game.yootButton.rotation}
          scale={layout[device].game.yootButton.scale}
        /> }
        { yutAnimation && <YootNew scale={0.22} position={[0, 2, 0]} animation={yutAnimation}/> }
        <YutBonus position={layout[device].game.yutBonus.position} scale={layout[device].game.yutBonus.scale}/>
        <SettingsButton 
          position={layout[device].game.settings.mainButton.position}
          scale={layout[device].game.settings.mainButton.scale}
        />
        <PiecesSection 
          position={layout[device].game.piecesSection.position}
          device={device}
        />
        { gamePhase === 'game' && <PiecesOnBoard boardOffset={layout[device].game.board['game'].position[2]}/> }
        <MoveList
          position={layout[device].game.moveList.position}
          rotation={layout[device].game.moveList.rotation}
          tokenScale={layout[device].game.moveList.tokenScale}
          tokenPosition={layout[device].game.moveList.tokenPosition}
          size={layout[device].game.moveList.size}
          piecePosition={layout[device].game.moveList.piecePosition}
          pieceScale={layout[device].game.moveList.pieceScale}
          gamePhase={gamePhase}
        />
        <DisplayHostAndSpectating/>
        <Rulebook/>
        <Timer 
          position={layout[device].game.timer.position} 
          scale={[layout[device].game.timer.scaleX, 1, 1]}
          boxArgs={layout[device].game.timer.boxArgs}
          heightMultiplier={layout[device].game.timer.heightMultiplier}
        />
      </animated.group> }
      { gamePhase === 'finished' && <WinScreen/> }
      <MeteorsRealShader/>
    </>
  );
}