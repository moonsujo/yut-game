import React, { useRef, useState } from 'react';
import layout from './layout';
import { useAtom, useAtomValue } from 'jotai';
import { joinTeamAtom, clientAtom, teamsAtom, gamePhaseAtom, hostAtom, turnAtom } from './GlobalState';
import { Text3D } from '@react-three/drei';
import { formatName, tileType } from './helpers/helpers';
import { MeshStandardMaterial } from 'three';
import YootMesh from './meshes/YootMesh';
import { useFrame } from '@react-three/fiber';
import { useParams } from 'wouter';
import Rocket from './meshes/Rocket';
import MeshColors from './MeshColors';
import Ufo from './meshes/Ufo';

export default function TeamLobby({ position=[0,0,0], scale=1, team, device, buttonPosition=[0,0,0] }) {
  const teams = useAtomValue(teamsAtom)
  const gamePhase = useAtomValue(gamePhaseAtom);
  const host = useAtomValue(hostAtom);
  const turn = useAtomValue(turnAtom)
  const client = useAtomValue(clientAtom);
  const params = useParams();

  function JoinTeamButtonRocket({ position, scale }) {
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
      position={position}
      scale={scale}
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
        font="/fonts/Luckiest Guy_Regular.json"
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

  function JoinTeamButtonUfo({ position, scale }) {
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
      position={position}
      scale={scale}
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
        font="/fonts/Luckiest Guy_Regular.json"
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
        fleet.current.position.z = position[2] + -(0.1 + Math.sin(time * 2) * 0.05)
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

  function HomePiecesUfos({ position, scale=0.9 }) {

    return (
      <group position={position} scale={scale}>
        <Ufo position={[3.9, 0, 4.9]} scale={3.5} onBoard offset={0.3}/>
        <Ufo position={[1.1, 0, 6]} scale={1.8} onBoard offset={0.6}/>
        <Ufo position={[1.5, 0, 3.3]} rotation={[0, Math.PI/32, 0]} scale={2.5} onBoard offset={0.9}/>
        <Ufo position={[6.6, 0, 5.7]} rotation={[0, -Math.PI/64, 0]}scale={1.9} onBoard/>
      </group>
    );
  }

  const nameSpacing = 1.17
  function PlayerIds() {
    const playerIdsRef = useRef([[],[]])
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
        return (!connectedToRoom ? 'grey' : hover ? 'green' : team === 0 ? 'red' : 'turquoise')
      }
      return <group key={index} position={[0, -index * 0.8, 0]}>
        <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          size={layout[device].game[`team${team}`].names.size}
          height={layout[device].game[`team${team}`].names.height}
          ref={(ref => refElem = ref)}
        >
          {`${formatName(player.name, layout[device].game[`team${team}`].names.maxLength)}` + `${(host && player.socketId === host.socketId ? ' (h) ' : '')}`}
          <meshStandardMaterial color={getDisplayColor(player)}/>
        </Text3D>
        <group rotation={[Math.PI/2, 0, 0]}> 
          { client.socketId === host.socketId && <><mesh name='background-outer' scale={[3.7, 0.01, 0.75]} position={[1.63, -1, -0.57]}>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color={getDisplayColor(player)}/>
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
          </mesh></> }
          <mesh name='background-inner' scale={[3.65, 0.02, 0.7]} position={[1.63, -1, -0.57]}>
            <boxGeometry args={[1, 1, 1]}/>
            { client.socketId !== host.socketId && <meshStandardMaterial color={ team === 0 ? 'red' : 'turquoise' } transparent opacity={0.1}/> }
            { client.socketId === host.socketId && <meshStandardMaterial color={MeshColors.spaceDark}/> }
          </mesh>
        </group>
      </group>
    }

    return <group
      position={[0.2, 0, 4.5]}
      rotation={layout[device].game[`team${team}`].names.rotation}
    >
      {teams[team].players.map((value, index) => (
        index < 5 && <PlayerButton key={index} index={index} refElem={playerIdsRef.current[team][index]} player={value}/>
      ))}
    </group>
  }

  function PlayerList({ players, position, scale, team }) {
    // if occupied, display name
    // else, display empty slot
    // replicate logic from desktop
    function Seat({ position, index, team }) {
      const seatText = useRef()
      const seatTextContainer = useRef()
      useFrame(() => {
        if (seatText.current && seatText.current.geometry.boundingSphere) {
          const centerX = seatText.current.geometry.boundingSphere.center.x
          seatTextContainer.current.position.x = -centerX
        }
      })

      return <group position={position}>
        <mesh scale={[3.6, 0.02, 0.9]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={team === 0 ? 'red' : 'turquoise'} transparent opacity={0.2}/>
        </mesh>
        <mesh scale={[3.7, 0.01, 1]}>
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={'black'} transparent opacity={0.2}/>
        </mesh>
        <mesh 
        name='wrapper'
        scale={[4.5, 0.02, 1.1]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshStandardMaterial color={'black'} transparent opacity={0}/>
        </mesh>
        <group ref={seatTextContainer}>
          <Text3D
          font="/fonts/Luckiest Guy_Regular.json"
          position={[0, 0, 0.2]}
          rotation={[-Math.PI/2, 0, 0]}
          size={0.4}
          height={0.01}
          ref={seatText}>
            { players[index] ? formatName(players[index].name, 10) : `SEAT ${index}`}
            <meshStandardMaterial color={ team === 0 ? 'red' : 'turquoise' }/>
          </Text3D>
        </group>
      </group>
    }
    return <group position={position} scale={scale}>
      <Seat position={[0,0,0]} index={0} team={team}/>
      <Seat position={[0,0,1.1]} index={1} team={team}/>
      <Seat position={[0,0,2.2]} index={2} team={team}/>
      <Seat position={[0,0,3.3]} index={3} team={team}/>
    </group>
  }

  // client.team === -1 && show both join buttons
  // client.team === 0 && show 'ready to launch' text over team rocket, and 'switch team' button over team ufo
  // client.team === 1 && show 'prepare for contact' text over team ufo, and 'switch team' button over team rocket

  function ReadyTextRocket() {
    return <group 
    position={layout[device].lobby.readyTextRocket.position}
    scale={layout[device].lobby.readyTextRocket.scale}
    >
      <mesh
        name='background'
        scale={[0.93, 1, 0.46]}
      >
        <cylinderGeometry args={[1, 1, 0.001, 32]}/>
        <meshStandardMaterial 
        color='red' 
        transparent 
        opacity={layout[device].lobby.readyTextRocket.background.opacity}/>
      </mesh>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
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
    position={layout[device].lobby.readyTextUfo.position}
    scale={layout[device].lobby.readyTextUfo.scale}
    >
      <mesh
        name='background'
        scale={[1, 1, 0.5]}
      >
        <cylinderGeometry args={[1, 1, 0.001, 32]}/>
        <meshStandardMaterial 
        color='turquoise' 
        transparent 
        opacity={layout[device].lobby.readyTextUfo.background.opacity}/>
      </mesh>
      <Text3D
        font="/fonts/Luckiest Guy_Regular.json"
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

  function TeamSwitchButton({ position, scale }) {

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
      position={position}
      scale={scale}
      ref={button}
    >
      <mesh
        name='background-outer'
        scale={[0.8, 1, 0.4]}
      >
        <cylinderGeometry args={[1, 1, 0.01, 32]}/>
        <meshStandardMaterial color={ hover ? 'green' : team === 0 ? 'red' : 'turquoise' }/>
      </mesh>
      <mesh
        name='background-inner'
        scale={[0.8, 1, 0.37]}
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
        position={[-0.48, 0.025, 0]}
        rotation={layout[device].game[`team${team}`].join.rotation}
        size={0.2}
        height={layout[device].game[`team${team}`].join.height}
        lineHeight={0.7}
      >
        {`SWITCH\n  TEAM`}
        <meshStandardMaterial color={ hover ? 'green' : team === 0 ? 'red' : 'turquoise' }/>
      </Text3D>
    </group>
  }

  return <group
    position={position}
    scale={scale}
  >
    {/* join button */}
    <group position={buttonPosition}>
      { team === 0 && client.team === -1 && <JoinTeamButtonRocket
      position={layout[device].lobby.joinTeamButtonRocket.position}
      scale={layout[device].lobby.joinTeamButtonRocket.scale}/> }
      { team === 1 && client.team === -1 && <JoinTeamButtonUfo 
      position={layout[device].lobby.joinTeamButtonUfo.position}
      scale={layout[device].lobby.joinTeamButtonUfo.scale}/> }
      { team === 0 && client.team === 0 && <ReadyTextRocket/> }
      { team === 0 && client.team === 1 && <TeamSwitchButton
      position={layout[device].lobby.teamSwitchButtonRocket.position}
      scale={layout[device].lobby.teamSwitchButtonRocket.scale}/> }
      { team === 1 && client.team === 0 && <TeamSwitchButton
      position={layout[device].lobby.teamSwitchButtonUfo.position}
      scale={layout[device].lobby.teamSwitchButtonUfo.scale}/> }
      { team === 1 && client.team === 1 && <ReadyTextUfo/> }
    </group>
    {/* pieces */}
    { team === 0 && <HomePiecesRockets 
    position={[0.6,0,0.1]} 
    team={team} 
    scale={layout[device].game[`team${team}`].pieces.sectionScale}
    /> }
    { team === 1 && <HomePiecesUfos
    position={[-0.2,0,0.3]} 
    team={team} 
    scale={layout[device].game[`team${team}`].pieces.sectionScale}
    /> }
    {/* player ids */}
    <PlayerList players={teams[team].players} position={[1.7,0,6.7]} scale={1} team={team}/>
    {/* copy link */}
  </group>
}