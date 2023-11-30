import { useRef, useEffect, useState } from "react";
import { CuboidCollider, RigidBody, Physics } from "@react-three/rapier";
import Yuts from "./Yuts.jsx";
import Star from "./meshes/Star.jsx";
import Neptune2 from "./meshes/Neptune2.jsx";
import Earth from "./meshes/Earth.jsx";
import Mars from "./meshes/Mars.jsx";
import Saturn from "./meshes/Saturn.jsx";
import SunBagus from "./meshes/SunBagus.jsx";
import Controls3d from "./Controls3d";
import layout from "../../layout.js";
import React from "react";
import { Leva, useControls } from "leva";
import {
  Environment,
  Sky,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  SoftShadows,
  Stars,
  Html,
  Text3D,
  OrthographicCamera,
  OrbitControls
} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAtom, atom } from "jotai";
import {
  readyToStartAtom,
  teamsAtom,
  turnAtom,
  gamePhaseAtom,
  socket,
  legalTilesAtom,
  clientPlayerAtom,
  playersAtom,
} from "./SocketManager";
import Moon from "./meshes/Moon.jsx";
import TextButton from "./components/TextButton";
import ScoreButton from "./ScoreButton.jsx";
import { Perf } from 'r3f-perf'
import Piece from "./components/Piece.jsx";
import { isMyTurn } from "../../server/src/helpers.js";
import LandingPage from "./pages/landingPage.jsx";

let device = window.innerWidth > 1000 ? "desktop" : "mobile";

export default function Experience() {
  // window resize
  window.addEventListener("resize", () => {
    // socket.emit("window dimensions", {width: window.innerWidth, height: window.innerHeight})
    if (window.innerWidth > 1000) {
      device = "desktop";
    } else {
      device = "mobile";
    }
  });

  const [clientPlayer] = useAtom(clientPlayerAtom)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      socket.emit("visibilityChange", {flag: false, socketId: clientPlayer.socketId})
    } else {
      socket.emit("visibilityChange", {flag: true, socketId: clientPlayer.socketId})
    }
  });
  

  const [readyToStart] = useAtom(readyToStartAtom);
  const [teams] = useAtom(teamsAtom);
  const [turn] = useAtom(turnAtom);
  const [gamePhase] = useAtom(gamePhaseAtom)
  const [legalTiles] = useAtom(legalTilesAtom);
  const [players] = useAtom(playersAtom);
  

  // useEffect(() => {
  //   console.log("[yuts] clientPlayer", clientPlayer)
  //   if (clientPlayer != null) {
  //     setLoaded(true);
  //   }
  // }, [clientPlayer])

  const numTiles = 29;

  const tileRefs = [...Array(numTiles)];
  for (let i = 0; i < numTiles; i++) {
    tileRefs[i] = useRef();
  }
  const camera = useRef();
  // const orbitControls = useRef();

  useEffect(() => {
    // console.log(center.current.position)
    // console.log(camera.current.lookAt)
    camera.current.lookAt(
      layout[device].center[0] + layout[device].camera.lookAtOffset[0], 
      layout[device].center[1] + layout[device].camera.lookAtOffset[1],  
      layout[device].center[2] + layout[device].camera.lookAtOffset[2], 
    )
    // orbit controls override camera's lookAt
    // console.log(orbitControls.current.target)
    // orbitControls.current.target = center.current.position
    // console.log("[yuts, first render] clientPlayer", clientPlayer)
    // if (clientPlayer != null) {
    //   setLoaded(true);
    // }
  }, [])

  const TILE_RADIUS = layout[device].tileRadius.ring;
  const NUM_STARS = 20;

  useEffect(() => {
    console.log("[Experience] clientPlayer", clientPlayer)
  }, [clientPlayer])

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
        tiles.push(<Earth position={position} tile={i} key={i} />);
      } else if (i == 5) {
        tiles.push(
          <Mars
            position={position}
            tile={i}
            key={i}
          />
        );
      } else if (i == 10) {
        tiles.push(<Saturn position={position} tile={i} key={i} />);
      } else if (i == 15) {
        tiles.push(<Neptune2 position={position} tile={i} key={i} />);
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
      />
    );
    return tiles;
  }

  // team group
  // pieces
  // moves
  // throws
  // names
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
              <sphereGeometry args={[0.1]} />
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
              <sphereGeometry args={[0.1]} />
              <meshStandardMaterial color={team == 0 ? "red" : "turquoise"} />
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
  
  function hasMove(team) {
    let flag = false;
    for (let move in team.moves) {
      if (team.moves[move] > 0) {
        flag = true;
        break;
      }
    }
    return flag
  }

  const {
    turbidity,
    rayleigh,
    mieCoefficient,
    mieDirectionalG,
    inclination,
    azimuth,
    distance,
    exposure,
    sunPosition,
    lightPosition,
    lightIntensity,
  } = useControls("sky", {
    turbidity: {
      value: 1.5,
      min: 0,
      max: 20,
      step: 0.1,
    },
    rayleigh: {
      value: 0.07,
      min: 0.01,
      max: 4,
      step: 0.001,
    },
    mieCoefficient: {
      value: 0.1,
      min: 0,
      max: 0.1,
      step: 0.001,
    },
    mieDirectionalG: {
      value: 1.0,
      min: 0,
      max: 1,
      step: 0.001,
    },
    inclination: {
      value: 0.57,
      min: 0,
      max: 3.14,
      step: 0.01,
    },
    azimuth: {
      value: -81.1,
      min: -180,
      max: 180,
      step: 0.1,
    },
    distance: {
      value: 80.3,
      min: 0,
      max: 100,
      step: 0.01,
    },
    exposure: {
      value: 0.25,
      min: 0,
      max: 1,
      step: 0.0001,
    },
    sunPosition: {
      value: [-0.49, 0.11, 0.3],
      step: 0.01,
    },
    lightPosition: {
      value: [0.13, 0.42, 0.25],
      step: 0.01,
    },
    lightIntensity: {
      value: 5.62,
      min: 0,
      max: 10,
      step: 0.01,
    },
  });

  const { gl, scene } = useThree(({ gl, scene }) => ({ gl, scene }));

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = exposure;
  }, [gl, scene, exposure]);

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
    [0.5, 0, 0],
    [1.5, 0, 0],
    [0.5, 0, 1],
    [1.5, 0, 1]
  ]

  return (
    <>
      {/* <Perf/> */}
      {/* <OrbitControls/> */}
      <color args={ ['#030202']} attach="background" />

      <OrthographicCamera
        makeDefault
        zoom={layout[device].camera.zoom}
        top={200}
        bottom={-200}
        left={200}
        right={-200}
        near={0.1}
        far={2000}
        position={layout[device].camera.position}
        ref={camera}
        // lookAt={center.current.position}
      />
      <Leva hidden />
      <directionalLight
        position={lightPosition}
        intensity={lightIntensity}
        castShadow
      />
      <group scale={layout[device].scale}>
      {/* { clientPlayer === null ? <LandingPage device={device}/>
      : */}
      { 
        <Physics>
          {/* team 0 */}
          <group
            position={layout[device].team0.position}
            scale={layout[device].team0.scale}
          >
            {/* team name */}
            <TextButton
              text="Rockets"
              boxWidth={1.2}
              boxHeight={0.3}
              color="red"
            />
            {/* pieces */}
            <group position={layout[device].team0.pieces.position}>
              <HomePieces team={0} scale={0.5}/>
            </group>
            {/* player ids */}
            {teams[0].players.map((value, index) => (
              <TextButton
                text={value.displayName}
                position={[
                  layout[device].team0.names.position[0],
                  layout[device].team0.names.position[1], 
                  layout[device].team0.names.position[2] + 0.5 * (index)]}
                color={
                  turn.team == 0 && turn.players[turn.team] == index && gamePhase !== "lobby"
                    ? "white"
                    : "yellow"
                }
                key={index}
              />
            ))}
          </group>
          {/* team 1 */}
          <group
            position={layout[device].team1.position}
            scale={layout[device].team1.scale}
          >
            {/* team name */}
            <TextButton
              text="UFOs"
              boxWidth={1.2}
              boxHeight={0.3}
              color="turquoise"
            />
            {/* pieces */}
            <group position={layout[device].team1.pieces.position}>
              <HomePieces team={1} scale={0.5}/>
            </group>
            {teams[1].players.map((value, index) => (
              <TextButton
                text={value.displayName}
                position={[
                  layout[device].team1.names.position[0],
                  layout[device].team1.names.position[1], 
                  layout[device].team1.names.position[2] + 0.5 * (index)]}
                color={
                  turn.team == 1 && turn.players[turn.team] == index && gamePhase !== "lobby"
                    ? "white"
                    : "yellow"
                }
                key={index}
              />
            ))}
          </group>
          
          <group position={layout[device].center} scale={layout[device].tiles.scale}>
            <Tiles />
          </group>
          {/* yut section */}
          <group>
            {/* START GAME text */}
            {readyToStart && gamePhase === "lobby" && (
              <TextButton
                text="Start"
                position={layout[device].throwCount}
                boxWidth={1.2}
                boxHeight={0.3}
                handlePointerClick={() => socket.emit("startGame")}
              />
            )}
            {/* {gamePhase === "lobby" && (
              <TextButton
                text="ready"
                position={layout[device].ready}
                boxWidth={1.2}
                boxHeight={0.3}
                color={players[clientPlayer.socketId].ready ? "green" : "white"}
                handlePointerClick={() => socket.emit("ready", {socketId: clientPlayer.socketId, flag: !players[clientPlayer.socketId].ready})}
              />
            )} */}
            <Yuts device={device}/>
            {/* throw count */}
            {(gamePhase === "pregame" || gamePhase === "game") && (
              <>            
                <TextButton
                  text={`Throws: ${
                    teams[turn.team].throws
                  }`}
                  position={layout[device].throwCount.position}
                  size={layout[device].throwCount.size}
                />
              </>
            )}
            {/* turn */}
            {(gamePhase === "pregame" || gamePhase === "game") && (
              <>            
                <TextButton
                  text={`TURN: ${
                    teams[turn.team].players[turn.players[turn.team]]?.displayName
                  }`}
                  position={layout[device].turn.position}
                  size={layout[device].throwCount.size}
                />
              </>
            )}
          </group>
          {/* pieces section */}
          <group position={layout[device].piecesSection.position} scale={layout[device].piecesSection.scale}>
            { (gamePhase === "game" && 29 in legalTiles) ?
              <ScoreButton
                position={[0,0,0]}
                device={device}
              /> :
              teams[clientPlayer.team].pieces.map((value, index) =>
                value == null ? (
                  <mesh
                    position={newHomePiecePositions[index]}
                    key={index}
                  >
                    <sphereGeometry args={[0.1]} />
                  </mesh>
                ) : value === "scored" ? (
                  <mesh
                    position={newHomePiecePositions[index]}
                    key={index}
                  >
                    <sphereGeometry args={[0.1]} />
                    <meshStandardMaterial color={clientPlayer.team == 0 ? "red" : "turquoise"} />
                  </mesh>
                ) : (
                  <Piece
                    position={newHomePiecePositions[index]}
                    rotation={layout[device].homePieces[clientPlayer.team].rotation}
                    keyName={`count${index}`}
                    tile={-1}
                    team={clientPlayer.team}
                    id={value.id}
                    key={index}
                    scale={1}
                  />
                )
              )
            }
            {/* moves */}
            {(gamePhase === "pregame" || gamePhase !== "lobby") && 
              <>
                <TextButton
                  text={`Moves:`}
                  position={layout[device].moves.text}
                  // size={layout[device].moves.size}
                />
                <TextButton
                  text={`${prettifyMoves(teams[clientPlayer.team].moves)}`}
                  position={layout[device].moves.list}
                  // size={layout[device].moves.size}
                />
              </>
            }
          </group>
          {/* chat section */}
          <group position={layout[device].chat.position}>
            <Html>
              <div style={{
                'borderRadius': '5px',
                'height': `${(layout[device].chat.boxScale * layout[device].chat.height).toString()}px`,
                'width': `${(layout[device].chat.boxScale * layout[device].chat.width).toString()}px`,
                'padding': `${(layout[device].chat.padding).toString()}px`,
                'fontSize': `${(layout[device].chat.fontScale * layout[device].chat.fontSize).toString()}px`,
                'background': 'rgba(128, 128, 128, 0.1)'
              }}>
                <p style={{color: 'white', margin: 0}}><span style={{color: 'red'}}>jack:</span> hello</p>
                <p style={{color: 'white', margin: 0}}><span style={{color: 'turquoise'}}>ada:</span> you should make a tutorial</p>
              </div>
            </Html>
          </group>
          {/* menu */}
          <TextButton
            text={`Menu`}
            position={[0, 0, -6]}
          />
        </Physics> 
        }
      </group>
    </>
  );
}

