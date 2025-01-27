import React, { useRef, useState } from 'react';
import layout from './layout';
import { useAtom, useAtomValue } from 'jotai';
import { joinTeamAtom, clientAtom, teamsAtom, gamePhaseAtom, hostAtom, turnAtom } from './GlobalState';
import { Html, MeshDistortMaterial, Text3D } from '@react-three/drei';
import Piece from './components/Piece';
import { formatName, tileType } from './helpers/helpers';
import { MeshStandardMaterial } from 'three';
import YootMesh from './meshes/YootMesh';
import { useFrame } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import { useParams } from 'wouter';
import Rocket from './meshes/Rocket';
import MeshColors from './MeshColors';
import Ufo from './meshes/Ufo';

export default function TeamLobby({ position=[0,0,0], scale=1, team, device }) {
  const teams = useAtomValue(teamsAtom)
  const gamePhase = useAtomValue(gamePhaseAtom);
  const host = useAtomValue(hostAtom);
  const turn = useAtomValue(turnAtom)
  const client = useAtomValue(clientAtom);
  const params = useParams();

  function JoinTeamButtonRocket() {
    const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom);
    const colorMaterial = new MeshStandardMaterial({ color: team === 0 ? 'red' : 'turquoise' })

    const [hover, setHover] = useState(false);

    const button = useRef();
    useFrame((state) => {
      const time = state.clock.elapsedTime;
      if (button.current) {
        if (hover) {
          // limegreen
          colorMaterial.color.r = 0;
          colorMaterial.color.g = 50 / 255;
          colorMaterial.color.b = 0 / 255;
          // colorMaterial.color.b = 0.031896033067374104;
          // colorMaterial.color.g = 0.6104955708001716;
          // colorMaterial.color.r = 0.031896033067374104;
          // button.current.scale.x = 1;
        } else {
          if (client.team === -1) {
            // colorMaterial.color.setHSL(Math.cos(time * 3) * 0.05 + 0.07, 1, 0.3);
            // button.current.scale.x = Math.cos(time * 2) * 0.3 + 0.7;
          } else {
            if (team === 0) {
              colorMaterial.color.r = 1
              colorMaterial.color.g = 0
              colorMaterial.color.b = 0
            } else if (team === 1) {
              colorMaterial.color.r = 176 / 256
              colorMaterial.color.g = 241 / 256
              colorMaterial.color.b = 235 / 256
            }
            // colorMaterial.color.setHSL(1/6, 1, 0.5); // yellow
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

    return <group
      position={[1.9,0,0]}
      scale={2}
      ref={button}
    >
      <mesh
        name='background-outer'
        scale={[0.93, 1, 0.46]}
        material={colorMaterial}
      >
        <cylinderGeometry args={[1, 1, 0.01, 32]}/>
      </mesh>
      <mesh
        name='background-inner'
        scale={[0.93, 1, 0.43]}
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
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.67, 0.025, 0.02]}
        rotation={layout[device].game[`team${team}`].join.rotation}
        size={0.2}
        height={layout[device].game[`team${team}`].join.height}
        lineHeight={0.7}
        material={colorMaterial}
      >
        {`JOIN TEAM\n    ROCKET`}
      </Text3D>
    </group>
  }

  function JoinTeamButtonUfo() {
    const [joinTeam, setJoinTeam] = useAtom(joinTeamAtom);
    const colorMaterial = new MeshStandardMaterial({ color: 'turquoise' })

    const [hover, setHover] = useState(false);

    const button = useRef();
    useFrame((state) => {
      const time = state.clock.elapsedTime;
      if (button.current) {
        if (hover) {
          // limegreen
          // colorMaterial.color.r = 0;
          // colorMaterial.color.g = 50 / 255;
          // colorMaterial.color.b = 0 / 255;
          // colorMaterial.color.b = 0.031896033067374104;
          // colorMaterial.color.g = 0.6104955708001716;
          // colorMaterial.color.r = 0.031896033067374104;
          // button.current.scale.x = 1;
        } else {
          if (client.team === -1) {
            // colorMaterial.color.setHSL(Math.cos(time * 3) * 0.05 + 0.07, 1, 0.3);
            // button.current.scale.x = Math.cos(time * 2) * 0.3 + 0.7;
          } else {
            if (team === 0) {
              colorMaterial.color.r = 1
              colorMaterial.color.g = 0
              colorMaterial.color.b = 0
            } else if (team === 1) {
              colorMaterial.color.r = 176 / 256
              colorMaterial.color.g = 241 / 256
              colorMaterial.color.b = 235 / 256
            }
            // colorMaterial.color.setHSL(1/6, 1, 0.5); // yellow
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

    return <group
      position={[1.9,0,0]}
      scale={2}
      ref={button}
    >
      <mesh
        name='background-outer'
        scale={[0.93, 1, 0.46]}
      >
        <cylinderGeometry args={[1, 1, 0.01, 32]}/>
        <meshStandardMaterial color={ hover ? 'green' : 'turquoise' }/>
      </mesh>
      <mesh
        name='background-inner'
        scale={[0.93, 1, 0.43]}
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
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.67, 0.025, 0.02]}
        rotation={layout[device].game[`team${team}`].join.rotation}
        size={0.2}
        height={layout[device].game[`team${team}`].join.height}
        lineHeight={0.7}
      >
        {`JOIN TEAM\n        UFO`}
        <meshStandardMaterial color={ hover ? 'green' : 'turquoise' }/>
      </Text3D>
    </group>
  }

  function HomePiecesRockets({position, scale=1}) {
    const fleet = useRef()
    useFrame((state, delta) => {
      const time = state.clock.elapsedTime
      if (fleet.current) {
        fleet.current.position.x = position[0] + 0.1 + Math.sin(time * 2) * 0.1
        fleet.current.position.z = position[2] + -(0.1 + Math.sin(time * 2) * 0.1)
      }
    })

    return (
      // position is controlled by useFrame
      <group scale={scale} ref={fleet}>
        <Rocket position={[0, 0, 3.9]} scale={2.3} onBoard offset={0.3}/>
        <Rocket position={[1.1, 0, 6]} scale={2.3} onBoard offset={0.6}/>
        <Rocket position={[2.8, 0, 3.3]} scale={2.5} onBoard offset={0.9}/>
        <Rocket position={[4, 0, 5]} scale={2.4} onBoard/>
      </group>
    );
  }

  function HomePiecesUfos({ position, scale=1 }) {
    useFrame((state, delta) => {
      const time = state.clock.elapsedTime
    })

    return (
      // position is controlled by useFrame
      <group scale={scale}>
        <Ufo position={[3.9, 0, 4.9]} scale={3.5} onBoard offset={0.3}/>
        <Ufo position={[1.1, 0, 6]} scale={1.8} onBoard offset={0.6}/>
        <Ufo position={[1.5, 0, 3.3]} rotation={[0, Math.PI/32, 0]} scale={2.5} onBoard offset={0.9}/>
        <Ufo position={[6.8, 0, 5.7]} rotation={[0, -Math.PI/64, 0]}scale={2.4} onBoard/>
      </group>
    );
  }

  const nameSpacing = 1.17
  function PlayerIds() {
    const playerIdsRef = useRef([[],[]])
    const yootIconRef = useRef()
    useFrame((state, delta) => {
      playerIdsRef.current.forEach(function (_value, i) {
        playerIdsRef.current[i].forEach(function (_value1, j) {
          if (turn.team === i && turn.players[turn.team] === j && playerIdsRef.current[i][j].geometry.boundingSphere && (gamePhase === 'pregame' || gamePhase === 'game')) {
            yootIconRef.current.scale.x = 1
            yootIconRef.current.scale.y = 1
            yootIconRef.current.scale.z = 1
            yootIconRef.current.position.x = playerIdsRef.current[i][j].geometry.boundingSphere.center.x + playerIdsRef.current[i][j].geometry.boundingSphere.radius + 0.2
            // yootIconRef.current.position.y = -j * nameSpacing
            yootIconRef.current.position.z = -j * nameSpacing
          }
        })
      })
    })
    // if host, add button background and wrapper

    function PlayerButton({ index, refElem, player }) {
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
        // execute action
        console.log('[PlayerButton] player', player.name, 'team', team)
      }
      function getDisplayColor(player) {
        const connectedToRoom = (player.roomId === params.id.toUpperCase() && player.connectedToRoom)
        return (!connectedToRoom ? 'gray' : hover ? 'green' : team === 0 ? 'red' : 'turquoise')
      }
      return <group key={index} position={[0, -index * 0.8, 0]}>
        <Text3D
          font="fonts/Luckiest Guy_Regular.json"
          size={layout[device].game[`team${team}`].names.size}
          height={layout[device].game[`team${team}`].names.height}
          ref={(ref => refElem = ref)}
        >
          {`${formatName(player.name, layout[device].game[`team${team}`].names.maxLength)}` + `${(host && player.socketId === host.socketId ? ' (h) ' : '')}`}
          <meshStandardMaterial color={getDisplayColor(player)}/>
        </Text3D>
        {client.socketId === host.socketId && <group rotation={[Math.PI/2, 0, 0]}> key={index}
          <mesh name='background-outer' scale={[3.7, 0.01, 0.75]} position={[1.63, -1, -0.57]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={ hover ? 'green' : team === 0 ? 'red' : 'turquoise' }/>
          </mesh>
          <mesh name='background-inner' scale={[3.65, 0.02, 0.7]} position={[1.63, -1, -0.57]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={MeshColors.spaceDark}/>
          </mesh>
          <mesh 
          name='wrapper' 
          scale={[3.7, 0.01, 0.75]} 
          position={[1.63, -1, -0.57]}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color='white' transparent opacity={0}/>
          </mesh>
        </group>}
      </group>
    }

    return <group
      position={[0.2, 0, 4.5]}
      rotation={layout[device].game[`team${team}`].names.rotation}
    >
      {teams[team].players.map((value, index) => (
        index < 5 && <PlayerButton key={index} index={index} refElem={playerIdsRef.current[team][index]} player={value}/>
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

  // client.team === -1 && show both join buttons
  // client.team === 0 && show 'ready to launch' text over team rocket, and 'switch team' button over team ufo
  // client.team === 1 && show 'prepare for contact' text over team ufo, and 'switch team' button over team rocket

  // team === 0 && client.team === -1 && show 'join team rocket' button
  // team === 1 && client.team === -1 && show 'join team ufo' button
  // team === 0 && client.team === 0 && show 'ready to launch' button
  // team === 0 && client.team === 1 && show 'switch team' button'
  // team === 1 && client.team === 0 && show 'switch team' button'
  // team === 1 && client.team === 1 && show 'prepare for contact' button'

  function ReadyTextRocket() {
    return <group 
    position={[1.9, 0, 0]}
    scale={2}
    >
      <mesh
        name='background'
        scale={[0.93, 1, 0.46]}
      >
        <cylinderGeometry args={[1, 1, 0.001, 32]}/>
        <meshStandardMaterial color='red' transparent opacity={0.1}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.6, 0.025, 0]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.2}
        height={0.01}
        lineHeight={0.7}
      >
        {`READY TO\n  LAUNCH`}
        <meshStandardMaterial color='red'/>
      </Text3D>
    </group>
  }

  function ReadyTextUfo() {
    return <group 
    position={[1.9, 0, 0]}
    scale={2}
    >
      <mesh
        name='background'
        scale={[1, 1, 0.5]}
      >
        <cylinderGeometry args={[1, 1, 0.001, 32]}/>
        <meshStandardMaterial color='turquoise' transparent opacity={0.1}/>
      </mesh>
      <Text3D
        font="fonts/Luckiest Guy_Regular.json"
        position={[-0.79, 0.025, 0]}
        rotation={[-Math.PI/2, 0, 0]}
        size={0.2}
        height={0.01}
        lineHeight={0.7}
      >
        {`PREPARE FOR\n    CONTACT`}
        <meshStandardMaterial color='turquoise'/>
      </Text3D>
    </group>
  }

  function TeamSwitchButton(team) {
    return <group>
    </group>
  }

  return <group
    position={position}
    scale={scale}
  >
    {/* join button */}
    { team === 0 && client.team === -1 && <JoinTeamButtonRocket/> }
    { team === 1 && client.team === -1 && <JoinTeamButtonUfo/> }
    { team === 0 && client.team === 0 && <ReadyTextRocket/> }
    { team === 0 && client.team === 1 && <TeamSwitchButton team={team}/> }
    { team === 1 && client.team === 0 && <TeamSwitchButton team={team}/> }
    { team === 1 && client.team === 1 && <ReadyTextUfo/> }
    {/* pieces */}
    { team === 0 && <HomePiecesRockets 
    position={[0.6,0,0.1]} 
    team={team} 
    scale={layout[device].game[`team${team}`].pieces.sectionScale}
    /> }
    { team === 1 && <HomePiecesUfos
    position={[0.6,0,0.1]} 
    team={team} 
    scale={layout[device].game[`team${team}`].pieces.sectionScale}
    /> }
    {/* player ids */}
    <PlayerIds/>
    {/* copy link */}
  </group>
}