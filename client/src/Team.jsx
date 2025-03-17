import React, { useRef, useState } from 'react';
import layout from './layout';
import { useAtom, useAtomValue } from 'jotai';
import { joinTeamAtom, clientAtom, teamsAtom, gamePhaseAtom, hostAtom, turnAtom, deviceAtom } from './GlobalState';
import { Html, MeshDistortMaterial, Text3D } from '@react-three/drei';
import Piece from './components/Piece';
import { formatName, tileType } from './helpers/helpers';
import { MeshStandardMaterial } from 'three';
import YootMesh from './meshes/YootMesh';
import { useFrame } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import { useParams } from 'wouter';
import Star from './meshes/Star';

export default function Team({ position=[0,0,0], scale=1, team }) {
  const device = useAtomValue(deviceAtom)
  const teams = useAtomValue(teamsAtom)
  const gamePhase = useAtomValue(gamePhaseAtom);
  const host = useAtomValue(hostAtom);
  const turn = useAtomValue(turnAtom)
  const client = useAtomValue(clientAtom);
  const params = useParams();

  function JoinTeamButton() {
    const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom);
    const colorMaterial = new MeshStandardMaterial()

    const [hover, setHover] = useState(false);

    const button = useRef();
    useFrame((state) => {
      const time = state.clock.elapsedTime;
      if (button.current) {
        if (hover) {
          // limegreen
          colorMaterial.color.b = 0.031896033067374104;
          colorMaterial.color.g = 0.6104955708001716;
          colorMaterial.color.r = 0.031896033067374104;
          // button.current.scale.x = 1;
        } else {
          if (client.team === -1) {
            colorMaterial.color.setHSL(Math.cos(time * 3) * 0.05 + 0.07, 1, 0.3);
            // button.current.scale.x = Math.cos(time * 2) * 0.3 + 0.7;
          } else {
            colorMaterial.color.setHSL(1/6, 1, 0.5); // yellow
            // button.current.scale.x = 1;
          }
        }
      }
    })

    function handlePointerEnter(e) {
      e.stopPropagation();
      setHover(true)
    }

    function handlePointerLeave(e) {
      e.stopPropagation();
      setHover(false)
    }

    function handlePointerDown(e) {
      // const audio = new Audio('sounds/effects/join.wav');
      // audio.volume=0.3;
      // audio.play();
      e.stopPropagation();
      setJoinTeam(team);
      setHover(false)
    }

    return client.team !== team && !(joinTeam === 0 || joinTeam === 1) && <group
      position={layout[device].game[`team${team}`].join.position}
      scale={layout[device].game[`team${team}`].join.scale}
      ref={button}
    >
      <mesh
        material={colorMaterial}
        name='background-outer'
        scale={[0.75, 1, 0.34]}
      >
        <cylinderGeometry args={[1, 1, 0.01, 32]}/>
      </mesh>
      <mesh
        name='background-inner'
        scale={[0.75, 1, 0.31]}
      >
        <cylinderGeometry args={[0.95, 0.95, 0.02, 32]}/>
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
        font="/fonts/Luckiest Guy_Regular.json"
        position={[-0.45, 0.025, 0.15]}
        rotation={layout[device].game[`team${team}`].join.rotation}
        size={layout[device].game[`team${team}`].join.size}
        height={layout[device].game[`team${team}`].join.height}
        material={colorMaterial}
      >
        JOIN
      </Text3D>
    </group>
  }

  // Need to accept "key" to use it in an map
  function EmptyPiece({ position }) {
    return <mesh position={position}>
      <sphereGeometry args={[0.2, 32, 16]} />
    </mesh>
  }

  function ScoredPiece({ position }) {
    return <mesh position={position}>
      <sphereGeometry args={[0.2]} />
      <meshStandardMaterial color={team == 0 ? "red" : "green"} />
    </mesh>
  }

  function HomePieces({position, scale=1}) {
    let space = layout[device].game[`team${team}`].pieces.space;
    let positionStartX = layout[device].game[`team${team}`].pieces.positionStartX;
    let positionStartY = layout[device].game[`team${team}`].pieces.positionStartY;
    let positionStartZ = layout[device].game[`team${team}`].pieces.positionStartZ;

    return (
      <group position={position} scale={scale}>
        {
          teams[team].pieces.map((value, index) =>
            tileType(value.tile) === "onBoard" ? <Star 
              position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              key={index}
              scale={0.3}
              color='grey'
            /> : 
            // tileType(value.tile) === "onBoard" ? <EmptyPiece 
            //   position={[
            //     positionStartX + index * space,
            //     positionStartY,
            //     positionStartZ,
            //   ]}
            //   key={index}
            // /> : 
            tileType(value.tile) === "scored" ? <ScoredPiece
              position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              key={index}
            /> : <Piece
              position={[
                positionStartX + index * space,
                positionStartY,
                positionStartZ,
              ]}
              rotation={layout[device].game[`team${team}`].pieces.rotation}
              scale={layout[device].game[`team${team}`].pieces.scale}
              tile={-1}
              team={team}
              id={value.id}
              key={index}
              animation={null}
            />
          )
        }
      </group>
    );
  }

  function RollDisplay() {
    // Handle 0 because it is coerced to 'null' as a string
    let rollText;
    if (teams[team].pregameRoll === null) {
      rollText = '';
    } else if (teams[team].pregameRoll === 0) {
      rollText = '&#10007'
    } else {
      rollText = teams[team].pregameRoll.toString()
    }

    return <group position={layout[device].game[`team${team}`].pregameRoll.position}>
      { teams[team].pregameRoll === 0 ? <group>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[-1, 0.025, 0.15]}
          rotation={[-Math.PI/2, 0, 0]}
          size={layout[device].game[`team${team}`].pregameRoll.size}
          height={layout[device].game[`team${team}`].pregameRoll.height}
        >
          {`roll:`}
          <meshStandardMaterial color='yellow'/>
        </Text3D>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[0.35, 0.025, 0.15]}
          rotation={[-Math.PI/2, 0, 0]}
          size={layout[device].game[`team${team}`].pregameRoll.size}
          height={layout[device].game[`team${team}`].pregameRoll.height}
        >
          {'X'}
          <meshStandardMaterial color='grey'/>
        </Text3D>
      </group> : <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
        position={[-1, 0.025, 0.15]}
        rotation={[-Math.PI/2, 0, 0]}
        size={layout[device].game[`team${team}`].pregameRoll.size}
        height={layout[device].game[`team${team}`].pregameRoll.height}
      >
        {`roll: ${rollText}`}
        <meshStandardMaterial color='yellow'/>
      </Text3D> }
    </group>
  }

  const nameSpacing = 1.17
  function PlayerIds() {
    const playerIdsRef = useRef([[],[]])
    const yootIconRef = useRef()
    const youIndicatorRef = useRef()
    useFrame(() => {
      playerIdsRef.current.forEach(function (_value, i) {
        playerIdsRef.current[i].forEach(function (_value1, j) {
          // You Icon
          const isYou = teams[i].players[j].name === client.name
          if (isYou && playerIdsRef.current[i][j].geometry.boundingSphere) {            
            youIndicatorRef.current.scale.x = 1
            youIndicatorRef.current.scale.y = 1
            youIndicatorRef.current.scale.z = 1
            youIndicatorRef.current.position.x = playerIdsRef.current[i][j].geometry.boundingSphere.center.x + playerIdsRef.current[i][j].geometry.boundingSphere.radius + 0.3
            youIndicatorRef.current.position.z = -j * nameSpacing + 0.35
          } else {
            youIndicatorRef.current.scale.x = 0
            youIndicatorRef.current.scale.y = 0
            youIndicatorRef.current.scale.z = 0
          }
          // Yut Icon
          if (turn.team === i && turn.players[turn.team] === j && playerIdsRef.current[i][j].geometry.boundingSphere) {
            yootIconRef.current.scale.x = 1
            yootIconRef.current.scale.y = 1
            yootIconRef.current.scale.z = 1
            yootIconRef.current.position.x = playerIdsRef.current[i][j].geometry.boundingSphere.center.x + playerIdsRef.current[i][j].geometry.boundingSphere.radius + 0.4
            if (isYou) {
              yootIconRef.current.position.x += 0.25
            }
            yootIconRef.current.position.z = -j * nameSpacing
          } else {
            yootIconRef.current.scale.x = 0
            yootIconRef.current.scale.y = 0
            yootIconRef.current.scale.z = 0
          }
        })
      })
    })

    return <group
      position={layout[device].game[`team${team}`].names.position}
      rotation={layout[device].game[`team${team}`].names.rotation}
    >
      {teams[team].players.map((value, index) => (
        index < 4 && <group key={index}>
          <Text3D
            font="/fonts/Luckiest Guy_Regular.json"
            size={layout[device].game[`team${team}`].names.size}
            height={layout[device].game[`team${team}`].names.height}
            position={[0, -index * 0.5, 0]}
            ref={(ref => playerIdsRef.current[team][index] = ref)}
          >
            {formatName(value.name, layout[device].game[`team${team}`].names.maxLength)
            + (host && value.socketId === host.socketId ? ' (h) ' : '')
            + (value.status === 'away' ? ' (away)' : '')}
            <meshStandardMaterial color={ value.roomId === params.id.toUpperCase() && value.connectedToRoom ? team === 0 ? 'red' : 'turquoise' : 'gray' }/>
          </Text3D>
          <group name='you-indicator' ref={youIndicatorRef}>
            <Star rotation={[Math.PI/2, 0, 0]} scale={0.23} color={ team === 0 ? 'red' : 'turquoise' }/>
          </group>
        </group>
      ))}
      {/* y position in case it overlaps with a name */}
      <group ref={yootIconRef} scale={0} position={[0, 0.17, 0]}>
        <YootMesh rotation={[0, Math.PI/2, 0]} scale={0.04}/>
        <YootMesh rotation={[0, Math.PI/2, 0]} scale={0.04} position={[0.1, 0, 0]}/>
        <YootMesh rotation={[0, Math.PI/2, 0]} scale={0.04} position={[0.2, 0, 0]}/>
        <YootMesh rotation={[0, Math.PI/2, 0]} scale={0.04} position={[0.3, 0, 0]}/>
      </group>
      {/* add 'copy link to share' if game hasn't started yet */}
      {/* { gamePhase === 'lobby' && client.team !== -1 && <CopyLink position={[0.1, -teams[team].players.length * 0.5-0.1, 0]}/> } */}
    </group>
  }

  return <group
    position={position}
    scale={scale}
  >
    {/* team name */}
    <Text3D
      font="/fonts/Luckiest Guy_Regular.json"
      position={layout[device].game[`team${team}`].title.position}
      rotation={layout[device].game[`team${team}`].title.rotation}
      size={layout[device].game[`team${team}`].title.size}
      height={layout[device].game[`team${team}`].title.height}
    >
      { team === 0 ? "Rockets" : "UFOs" }
      <meshStandardMaterial color={ team === 0 ? 'red': 'turquoise' }/>
    </Text3D>
    {/* join button */}
    { gamePhase === "lobby" && <JoinTeamButton/> }
    { gamePhase === "pregame" && <RollDisplay/> }
    {/* pieces */}
    <HomePieces 
    position={layout[device].game[`team${team}`].pieces.position} 
    team={team} 
    scale={layout[device].game[`team${team}`].pieces.sectionScale}
    />
    {/* player ids */}
    <PlayerIds/>
    {/* copy link */}
  </group>
}