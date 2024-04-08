// js
import React, { useRef, useEffect, useState } from "react";
import { useAtom, atom } from "jotai";
import layout from "./layout.js";

// meshes
import Yoots from "./Yoots.jsx";
import Star from "./meshes/Star.jsx";
import Neptune from "./meshes/Neptune.jsx";
import Earth from "./meshes/Earth.jsx";
import Mars from "./meshes/Mars.jsx";
import Saturn from "./meshes/Saturn.jsx";
import Moon from "./meshes/Moon.jsx";

// custom components
import Chatbox from "./Chatbox.jsx";
import Rulebook2 from "./Rulebook2.jsx";
import TextButton from "./components/TextButton";
import ScoreButton from "./ScoreButton.jsx";
import Piece from "./components/Piece.jsx";

// three js
import { Physics } from "@react-three/rapier";
import { Leva, useControls } from "leva";
import {
  Environment,
  Sky,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  SoftShadows,
  Html,
  Text3D,
  OrthographicCamera,
  OrbitControls,
  Text,
  PresentationControls
} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Stars from './particles/Stars'
// import { Perf } from 'r3f-perf'


// server
import {
  readyToStartAtom,
  teamsAtom,
  turnAtom,
  gamePhaseAtom,
  socket,
  legalTilesAtom,
  clientAtom,
  disconnectAtom,
  displayDisconnectAtom,
  winnerAtom,
  hostNameAtom,
  roomIdAtom,
  particleSettingAtom,
} from "./SocketManager";
import JoinTeamModal from "./JoinTeamModal.jsx";
import { getCurrentPlayerSocketId } from "./helpers/helpers.js";
import UfosWin from "./UfosWin.jsx";
import RocketsWin from "./RocketsWin.jsx";
import Celebration from "./particles/MeteorsBackup.jsx";
import { Perf } from "r3f-perf";
import CurvedArrow from "./meshes/CurvedArrow.jsx";
import LetsPlayButton from "./LetsPlayButton.jsx";
import Meteors from "./particles/MeteorsBackup.jsx";
import DisconnectModal from "./DisconnectModal.jsx";
import TipsModal from "./TipsModal.jsx";
import HtmlElement from "./HtmlElement.jsx";
import MilkyWay from "./shader/MilkyWay.jsx";
import BoomText from "./BoomText.jsx";
import { askTipsAtom, joinTeamAtom } from "./GlobalState.jsx";
import DecideOrderTooltip from "./DecideOrderTooltip.jsx";
import Team0 from "./Team0.jsx";
import Team1 from "./Team1.jsx";

let mediaMax = 2560;
let landscapeMobileCutoff = 550;
let landscapeDesktopCutoff = 1000;

export default function Game({ device = "landscapeDesktop"}) {
  console.log('[Game]')
  // separate everything into components
  // should not put state here unless it's being used
  // one change makes everything re-render
  const [readyToStart] = useAtom(readyToStartAtom);
  const [teams] = useAtom(teamsAtom);
  const [turn] = useAtom(turnAtom);
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [legalTiles] = useAtom(legalTilesAtom);
  const [client] = useAtom(clientAtom);
  const [winner] = useAtom(winnerAtom)
  const [hostName] = useAtom(hostNameAtom);
  const [roomId] = useAtom(roomIdAtom);
  const [askTips] = useAtom(askTipsAtom)
  const [disconnect] = useAtom(disconnectAtom);
  const previousDisconnect = useRef();
  const [displayDisconnect, setDisplayDisconnect] = useAtom(displayDisconnectAtom);

  useEffect(() => {
    console.log("[Experience] disconnect", disconnect)

    if (disconnect) {
      setDisplayDisconnect(true);
      previousDisconnect.current = disconnect;
    } else if (previousDisconnect.current == true) {
      setDisplayDisconnect(true);
    }
  }, [disconnect])

  useEffect(() => {

  }, [turn])

  const numTiles = 29;

  const tileRefs = [...Array(numTiles)];
  for (let i = 0; i < numTiles; i++) {
    tileRefs[i] = useRef();
  }

  const camera = useRef();
  useFrame((state, delta) => {
    // camera.current.position.x = 0
    // camera.current.position.y = 10
    // camera.current.position.z = 3
    // camera.current.lookAt(new THREE.Vector3(0,0,0))
  })

  const TILE_RADIUS = layout[device].tileRadius.ring;
  const NUM_STARS = 20;

  function Tiles() {
    let tiles = [];

    //circle
    for (let i = 0; i < NUM_STARS; i++) {
      let position = [
        -Math.cos(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
        0,
        Math.sin(((i+5) * (Math.PI * 2)) / NUM_STARS) * TILE_RADIUS,
      ];
      if (i == 0) {
        tiles.push(<Earth position={position} tile={i} key={i} device={device}/>);
      } else if (i == 5) {
        tiles.push(
          <Mars
            position={position}
            tile={i}
            key={i}
            device={device}
          />
        );
      } else if (i == 10) {
        tiles.push(<Saturn position={position} tile={i} key={i} device={device}/>);
      } else if (i == 15) {
        tiles.push(<Neptune position={position} tile={i} key={i} device={device}/>);
      } else {
        tiles.push(
          <Star
            position={position}
            tile={i}
            key={i}
            scale={layout[device].star.scale}
            device={device}
          />
        );
      }
    }

    //shortcuts
    const radiusShortcut1 = layout[device].tileRadius.shortcut1;
    const radiusShortcut2 = layout[device].tileRadius.shortcut2;
    for (let i = 0; i < NUM_STARS; i++) {
      let indexShortcut1;
      let indexShortcut2;
      if (i == 0) {
        indexShortcut1 = 24;
        indexShortcut2 = 23;
      } else if (i == 5) {
        indexShortcut1 = 28;
        indexShortcut2 = 27;
      } else if (i == 10) {
        indexShortcut1 = 20;
        indexShortcut2 = 21;
      } else if (i == 15) {
        indexShortcut1 = 25;
        indexShortcut2 = 26;
      }
      if (i == 0 || i == 5 || i == 10 || i == 15) {
        let position1 = [
          Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
            radiusShortcut1,
          0,
          Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
            radiusShortcut1,
        ]
        tiles.push(
          <Star
            position={position1}
            tile={indexShortcut1}
            key={i + 30}
            scale={layout[device].star.scale}
            device={device}
          />
        );
        let position2 = [
          Math.sin(((i -5) * (Math.PI * 2)) / NUM_STARS) *
            radiusShortcut2,
          0,
          Math.cos(((i -5) * (Math.PI * 2)) / NUM_STARS) *
            radiusShortcut2,
        ]
        tiles.push(
          <Star
            position={position2}
            tile={indexShortcut2}
            key={i + 41}
            scale={layout[device].star.scale}
            device={device}
          />
        );
      }
    }
    // center piece
    tiles.push(
      <Moon
        position={[0,0,0]}
        intensity={3}
        // scale={0.4}
        key={100}
        tile={22}
        device={device}
      />
    );
    return tiles;
  }

  function HomePieces({team, scale=1}) {
    let space = layout[device].homePieces[team].space;
    let positionStartX = 0
    let positionStartY = 0
    let positionStartZ = 0.5

    return (
      <group scale={scale}>
        {teams[team].pieces.map((value, index) =>
          value == null ? (
            <mesh
              position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              key={index}
            >
              <sphereGeometry args={[0.2]} />
            </mesh>
          ) : value === "scored" ? (
            <mesh
              position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              key={index}
            >
              <sphereGeometry args={[0.2]} />
              <meshStandardMaterial color={team == 0 ? "red" : "green"} />
            </mesh>
          ) : (
              <Piece
                position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              rotation={layout[device].homePieces[team].rotation}
              keyName={`count${index}`}
              tile={-1}
              team={team}
              id={value.id}
              key={index}
              scale={1}
            />
          )
        )}
      </group>
    );
  }

  function prettifyMoves(moves) {
    let prettifiedMoves = ""
    for (let move in moves) {
      for (let i = 0; i < moves[move]; i++) {
        if (prettifiedMoves === "") {
          prettifiedMoves = move
        } else {
          prettifiedMoves += `, ${move}`
        }
      }
    }
    return prettifiedMoves
  }

  const newHomePiecePositions = [
    [0.5, 0, -0.5],
    [1.5, 0, -0.5],
    [0.5, 0, 0.5],
    [1.5, 0, 0.5]
  ]
  const ufoHomePositions = [
    [0.5, 0, -0.5],
    [1.5, 0, -0.5],
    [0.5, 0, 0.5],
    [1.5, 0, 0.5]
  ]
  const rocketHomePositions = [
    [0.5, 0, -0.25],
    [1.5, 0, -0.25],
    [0.5, 0, 0.75],
    [1.5, 0, 0.75]
  ]

  function handleStart() {
    socket.emit("startGame", ({ response }) => {
      console.log("[startGame] response", response)
    })
  }

  function JoinTeam0() {
    const [client] = useAtom(clientAtom);
    const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom);
    function handleJoinTeam0 () {
        setJoinTeam(0);
    }
    return client.team !== 0 && joinTeam !== 0 && <HtmlElement
        text="JOIN"
        position={layout[device].team0.join.position}
        rotation={layout[device].team0.join.rotation}
        fontSize={layout[device].team0.join.fontSize}
        handleClick={handleJoinTeam0}
    /> 
  }

  function JoinTeam1() {
    const [client] = useAtom(clientAtom);
    const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom);
    function handleJoinTeam1 () {
        setJoinTeam(1);
    }
    return client.team !== 1 && joinTeam !== 1 && <HtmlElement
        text="JOIN"
        position={layout[device].team1.join.position}
        rotation={layout[device].team1.join.rotation}
        fontSize={layout[device].team1.join.fontSize}
        handleClick={handleJoinTeam1}
    /> 
  }

  // pre-condition: 'client' from 'clientAtom'
  function PiecesSection({position, scale}) {
    if (client.team == 0 || client.team == 1) {
      return (
        <group position={position} scale={scale}>
          {
            teams[client.team].pieces.map((value, index) =>
              value == null ? (
                <mesh
                  position={newHomePiecePositions[index]}
                  key={index}
                >
                  <sphereGeometry args={[0.2]} />
                </mesh>
              ) : value === "scored" ? (
                <mesh
                  position={newHomePiecePositions[index]}
                  key={index}
                >
                  <sphereGeometry args={[0.2]} />
                  <meshStandardMaterial color={client.team == 0 ? "red" : "green"} />
                </mesh>
              ) : (
                <Piece
                  position={
                    client.team == 0 
                    ? rocketHomePositions[index]
                    : ufoHomePositions[index]
                  }
                  rotation={layout[device].homePieces[client.team].rotation}
                  keyName={`count${index}`}
                  tile={-1}
                  team={client.team}
                  id={value.id}
                  key={index}
                  scale={1}
                />
              )
            )
          }
          {/* moves */}
          {gamePhase === "pregame" && <>
            <HtmlElement
              text={`Moves:`}
              position={layout[device].moves.text.position}
              rotation={layout[device].moves.text.rotation}
              fontSize={layout[device].moves.text.fontSize}
            />
            <HtmlElement
              text={`${prettifyMoves(teams[0].moves)}`}
              position={layout[device].moves.list.position}
              rotation={layout[device].moves.list.rotation}
              fontSize={layout[device].moves.list.fontSize}
              color="red"
              // size={layout[device].moves.size}
            />
            <HtmlElement
              text={`${prettifyMoves(teams[1].moves)}`}
              position={[
                layout[device].moves.list[0] + 0.5,
                layout[device].moves.list[1],
                layout[device].moves.list[2],
              ]}
              color="green"
              // size={layout[device].moves.size}
            />
          </>}
          {gamePhase === "game" && 
            <group>
              <HtmlElement
                text='moves:'
                position={layout[device].moves.text.position}
                rotation={layout[device].moves.text.rotation}
                fontSize={layout[device].moves.text.fontSize}
                color="yellow"
                // size={layout[device].moves.size}
              />
              <HtmlElement 
                text={`${prettifyMoves(teams[turn.team].moves)}`}
                position={layout[device].moves.list.position}
                rotation={layout[device].moves.list.rotation}
                fontSize={layout[device].moves.list.fontSize}
                color='yellow'
                // size={layout[device].moves.size}
              /> 
            </group>
          }
        </group>
      )
    } else {
      return (      
        <group position={layout[device].piecesSection.position} scale={layout[device].piecesSection.scale}>
          {teams[0].pieces.map((value, index) =>
            (<mesh
              position={newHomePiecePositions[index]}
              key={index}
            >
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial color="#505050"/>
            </mesh>))}
        </group>
      )
    }
  }

  const [showRulebook, setShowRulebook] = useState(false);
  function handleShowRulebook() {
    if (showRulebook) {
      setShowRulebook(false)
    } else {
      setShowRulebook(true)
    }
  }

  function handleRestart() {
    socket.emit("restart")
    location.reload()
  }

  function handleTips() {
  }
  function handleInvite() {
  }
  function handleDiscord() {
  }
  function handleRulebook() {
  }
  function handleSettings() {
  }
  function handleLetsPlay() {
    socket.emit("startGame")
  }
  function SpectatorMessage({position}) {
    return <group position={position}>
      <HtmlElement
        text="You must join"
        position={layout[device].startTip.line0Position}
        rotation={layout[device].startTip.rotation}
        fontSize={layout[device].startTip.fontSize}
      />
      <HtmlElement
        text="a team to play"
        position={layout[device].startTip.line1Position}
        rotation={layout[device].startTip.rotation}
        fontSize={layout[device].startTip.fontSize}
      />
    </group>
  }
  function StartTip() {
    if (!readyToStart) {
      if (client.team === undefined) {
        return <SpectatorMessage position={layout[device].startTip.position}/>
      } else {
        if (teams[0].players.length > 0 && teams[1].players.length > 0) {
          return <group position={layout[device].startTip.position}>
          <HtmlElement
            text="Waiting for"
            position={layout[device].startTip.line0Position}
            rotation={layout[device].startTip.rotation}
            fontSize={layout[device].startTip.fontSize}
          />
          <HtmlElement
            text="host to start"
            position={layout[device].startTip.line1Position}
            rotation={layout[device].startTip.rotation}
            fontSize={layout[device].startTip.fontSize}
          />
          </group>
        } else {
          return <group position={layout[device].startTip.position}>
            <HtmlElement
              text="Need a player"
              position={layout[device].startTip.line0Position}
              rotation={layout[device].startTip.rotation}
              fontSize={layout[device].startTip.fontSize}
            />
            <HtmlElement
              text="on each team"
              position={layout[device].startTip.line1Position}
              rotation={layout[device].startTip.rotation}
              fontSize={layout[device].startTip.fontSize}
            />
          </group>
        }
      }
    }
  }

  return (<>
    { winner == null && <group>
      {/* <Perf/> */}
      {/* <Leva hidden /> */}
      <group scale={layout[device].scale}>
      {<group>
          {/* team 0 */}
          <group
            position={layout[device].team0.position}
            scale={layout[device].team0.scale}
          >
            {/* team name */}
            <HtmlElement
              text="Rockets"
              position={layout[device].team0.title.position}
              rotation={layout[device].team0.title.rotation}
              color="red"
            />
            {/* join button */}
            <JoinTeam0/>
            {/* pieces */}
            <group position={layout[device].team0.pieces.position}>
              <HomePieces team={0} scale={0.5}/>
            </group>
            {/* player ids */}
            <Html
              position={layout[device].team0.names.position}
              rotation={layout[device].team0.names.rotation}
              transform
            >
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                position: 'absolute',
                width: `${layout[device].team0.names.divWidth}px`
              }}>
                <Team0 device={device}/>
              </div>
            </Html>
          </group>
          {/* team 1 */}
          <group
          position={layout[device].team1.position}
          scale={layout[device].team1.scale}>
            {/* team name */}
            <HtmlElement
              text="UFOs"
              position={layout[device].team1.title.position}
              rotation={layout[device].team1.title.rotation}
              color="turquoise"
            />
            {/* join button */}
            <JoinTeam1/>
            {/* pieces */}
            <group position={layout[device].team1.pieces.position}>
              <HomePieces team={1} scale={0.5}/>
            </group>
            {/* player ids */}
            <Html
              position={layout[device].team1.names.position}
              rotation={layout[device].team1.names.rotation}
              transform
            >
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                width: '200px',
                position: 'absolute',
                width: `${layout[device].team0.names.divWidth}px`,
              }}>
                <Team1 device={device}/>
              </div>
            </Html>
          </group>
          {/* join modal */}
          <JoinTeamModal
            position={layout[device].joinTeamModal.position}
            rotation={layout[device].joinTeamModal.rotation}
            scale={layout[device].joinTeamModal.scale}
          />
          {/* board */}
          <group position={layout[device].center} scale={layout[device].tiles.scale}>
            <Tiles />
          </group>
          <HtmlElement
            text="Start"
            position={layout[device].startEarth.position}
            rotation={layout[device].startEarth.rotation}
            fontSize={layout[device].startEarth.fontSize}
            color='limegreen'
          />
          <CurvedArrow
            position={layout[device].startEarth.helperArrow.position}
            rotation={layout[device].startEarth.helperArrow.rotation}
            color={layout[device].startEarth.helperArrow.color}
            scale={layout[device].startEarth.helperArrow.scale}
          />
          {/* yoot section */}
          <group>
            {/* START GAME text */}
            { readyToStart 
            && gamePhase === "lobby" 
            && <HtmlElement 
              text={'lets play!'}
              position={layout[device].letsPlayButton.position}
              rotation={layout[device].letsPlayButton.rotation}
              fontSize={layout[device].letsPlayButton.fontSize}
              handleClick={handleLetsPlay}
            />}
            {/* { gamePhase === "lobby" && <StartTip/> } */}
            {/* <HtmlElement
              text={`Phase: ${
                gamePhase === "pregame" ? 'who first' : gamePhase
              }`}
              position={layout[device].gamePhase.position}
              rotation={layout[device].gamePhase.rotation}
              fontSize={layout[device].gamePhase.fontSize}
              handlePointerClick={() => socket.emit("startGame")}
            /> */}
            <HtmlElement
              text='Rules'
              position={layout[device].rulebookButton.position}
              rotation={layout[device].rulebookButton.rotation}
              fontSize={layout[device].rulebookButton.fontSize}
              handleClick={handleRulebook}
            />
            <HtmlElement
              text='Settings'
              position={layout[device].settings.position}
              rotation={layout[device].settings.rotation}
              fontSize={layout[device].settings.fontSize}
              handleClick={handleSettings}
            />
            <HtmlElement
              text={`ROOM: ${roomId}`}
              position={layout[device].roomId.position}
              rotation={layout[device].roomId.rotation}
              fontSize={layout[device].roomId.fontSize}
            />
            <HtmlElement
              text={`HOST: ${hostName}`}
              position={layout[device].hostName.position}
              rotation={layout[device].hostName.rotation}
              fontSize={layout[device].hostName.fontSize}
            />
            <Physics>
              <Yoots 
                device={device} 
                buttonPos={layout[device].yootButton.position}
              />
            </Physics>
            {/* throw count */}
            {(
              <HtmlElement
                text={`Throw: ${
                  teams[turn.team].throws
                }`}
                position={layout[device].throwCount.position}
                rotation={layout[device].throwCount.rotation}
                fontSize={layout[device].throwCount.fontSize}
              />
            )}
            {/* turn */}
            {(gamePhase === "pregame" || gamePhase === "game") 
            // && getCurrentPlayerSocketId(turn, teams) !== client.id
            && <HtmlElement
              text={`TURN: ${
                teams[turn.team].players[turn.players[turn.team]]?.name
              }`}
              position={layout[device].turn.position}
              rotation={layout[device].turn.rotation}
              fontSize={layout[device].turn.fontSize}
              color={turn.team == 0 ? "red" : "turquoise"}
            />}
          </group>
          {/* pieces section */}
          <PiecesSection 
            position={layout[device].piecesSection.position}
            scale={layout[device].piecesSection.scale}
          />
          {/* chat section */}
          { !displayDisconnect &&
            <Chatbox
              position={layout[device].chat.position}
              rotation={layout[device].chat.rotation}
              scale={layout[device].chat.scale}
              device={device}
            /> }
          {/* menu */}
          {/* <HtmlElement
            text={`Tips`}
            position={layout[device].tips.button.position} 
            rotation={layout[device].tips.button.rotation}
            fontSize={layout[device].tips.button.fontSize}
            handleClick={handleTips}
          /> */}
          <HtmlElement
            text={`Invite`}
            position={layout[device].invite.position} 
            rotation={layout[device].invite.rotation}
            fontSize={layout[device].invite.fontSize}
            handleClick={handleInvite}
          />
          <HtmlElement
            text={`Discord`}
            position={layout[device].discord.position} 
            rotation={layout[device].discord.rotation}
            fontSize={layout[device].discord.fontSize}
            handleClick={handleDiscord}
          />
          {/* RULEBOOK */}
          { device === "portrait" && <group>
            { showRulebook  && <Rulebook2
              position={layout[device].rulebook.position}
              handleShow={handleShowRulebook}
            />}
          </group>}
        </group>}
        { gamePhase === "pregame" && <DecideOrderTooltip
          position={layout[device].tooltip.whoFirst.position}
          rotation={[-Math.PI/2, 0, 0]}
        />}
      </group>
      {displayDisconnect && <DisconnectModal
        position={layout[device].disconnectModal.position}
        rotation={layout[device].disconnectModal.rotation}
      />}
      <Stars count={7000} size={5}/>
    </group> }
    { winner !== 1 && winner !== 2 && <MilkyWay 
      rotation={[-Math.PI/2, 0, -35.0]} 
      position={[0, -3, 0]} 
      scale={5}
      brightness={0.5}
      colorTint1={new THREE.Vector4(0, 1, 1, 1.0)}
      colorTint2={new THREE.Vector4(0, 1, 1, 1.0)}
      colorTint3={new THREE.Vector4(0, 1, 1, 1.0)}
    /> }
    {/* <BoomText rotation={[0, Math.PI/2 + Math.PI/32, 0]} position={[0, 2, 0]} scale={[2.5, 0.3, 2.5]}/> */}
    { winner == 0 && <RocketsWin handleRestart={handleRestart} device={device}/> }
    { winner == 1 && <UfosWin handleRestart={handleRestart} device={device}/> }
    {/* <Celebration/> */}
    {/* <Meteors/> */}
    </>
  );
}